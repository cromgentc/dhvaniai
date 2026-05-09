import AdminRecord from '../models/AdminRecord.js'
import Application from '../models/Application.js'
import Job from '../models/Job.js'
import Lead from '../models/Lead.js'
import User from '../models/User.js'

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function numberText(value) {
  return Number(value || 0).toLocaleString()
}

function appRole(req) {
  return req.user?.appRole || (req.user?.role === 'admin' ? 'Admin' : '')
}

function scopedRecordFilter(req) {
  const role = appRole(req)
  const id = req.user?.id
  const email = req.user?.email

  if (role === 'Admin') return {}
  if (role === 'Manager') return { $or: [{ managerId: id }, { createdBy: email }] }
  if (role === 'Vendor') return { $or: [{ vendorId: id }, { userId: id }, { createdBy: email }] }
  return { userId: id }
}

function scopedUserFilter(req) {
  const role = appRole(req)
  const id = req.user?.id

  if (role === 'Admin') return {}
  if (role === 'Manager') return { managerId: id }
  if (role === 'Vendor') return { vendorId: id }
  return { _id: id }
}

async function countRecords(req, module, extraFilter = {}) {
  return AdminRecord.countDocuments({ module, ...extraFilter, ...scopedRecordFilter(req) })
}

async function statusBreakdown(req, modules) {
  const rows = await AdminRecord.aggregate([
    { $match: { module: { $in: modules }, ...scopedRecordFilter(req) } },
    { $group: { _id: '$status', value: { $sum: 1 } } },
  ])

  const data = ['Approved', 'Pending', 'Rejected'].map((name) => ({
    name,
    value: rows.find((row) => row._id === name)?.value || 0,
  }))

  return data.some((item) => item.value > 0) ? data : []
}

async function monthlyUploads(req) {
  const currentYear = new Date().getFullYear()
  const rows = await AdminRecord.aggregate([
    {
      $match: {
        module: { $in: ['uploads', 'collection'] },
        ...scopedRecordFilter(req),
        createdAt: {
          $gte: new Date(currentYear, 0, 1),
          $lte: new Date(currentYear, 11, 31, 23, 59, 59),
        },
      },
    },
    {
      $group: {
        _id: { month: { $month: '$createdAt' }, status: '$status' },
        count: { $sum: 1 },
      },
    },
  ])

  return monthLabels.map((month, index) => {
    const monthNumber = index + 1
    return {
      month,
      uploads: rows.filter((row) => row._id.month === monthNumber).reduce((sum, row) => sum + row.count, 0),
      approved: rows.filter((row) => row._id.month === monthNumber && row._id.status === 'Approved').reduce((sum, row) => sum + row.count, 0),
    }
  }).filter((item) => item.uploads || item.approved)
}

async function languageBreakdown(req) {
  return AdminRecord.aggregate([
    { $match: { language: { $nin: ['', null] }, ...scopedRecordFilter(req) } },
    { $group: { _id: '$language', value: { $sum: 1 } } },
    { $sort: { value: -1 } },
    { $limit: 8 },
    { $project: { _id: 0, language: '$_id', value: 1 } },
  ])
}

async function vendorPerformance(req) {
  const rows = await AdminRecord.aggregate([
    { $match: { module: 'vendors', ...scopedRecordFilter(req) } },
    {
      $project: {
        name: 1,
        score: {
          $convert: {
            input: { $replaceAll: { input: '$score', find: '%', replacement: '' } },
            to: 'double',
            onError: 0,
            onNull: 0,
          },
        },
      },
    },
    { $sort: { score: -1 } },
    { $limit: 6 },
  ])

  return rows.map((row) => ({ name: row.name, score: row.score }))
}

async function dailyProductivity(req) {
  const start = new Date()
  start.setDate(start.getDate() - 6)
  start.setHours(0, 0, 0, 0)

  const rows = await AdminRecord.aggregate([
    { $match: { createdAt: { $gte: start }, ...scopedRecordFilter(req) } },
    { $group: { _id: { day: { $dayOfWeek: '$createdAt' } }, tasks: { $sum: 1 } } },
  ])

  const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return labels.map((day, index) => ({
    day,
    tasks: rows.find((row) => row._id.day === index + 1)?.tasks || 0,
  }))
}

export async function getDashboardSummary(req, res) {
  const userScope = scopedUserFilter(req)
  const isAdmin = appRole(req) === 'Admin'
  const [
    totalUsers,
    activeVendors,
    dcTeamMembers,
    totalProjects,
    activeProjects,
    totalUploads,
    approvedData,
    rejectedData,
    pendingQc,
    totalPayments,
    leads,
    openJobs,
    applications,
    uploadTrend,
    approvalData,
    languageData,
    vendors,
    productivityData,
  ] = await Promise.all([
    User.countDocuments(userScope),
    User.countDocuments({ ...userScope, role: 'Vendor', status: 'Active' }),
    User.countDocuments({ ...userScope, role: 'QC Team' }),
    countRecords(req, 'projects'),
    countRecords(req, 'projects', { status: 'Active' }),
    countRecords(req, 'uploads'),
    countRecords(req, 'quality', { status: 'Approved' }),
    countRecords(req, 'quality', { status: 'Rejected' }),
    countRecords(req, 'quality', { status: 'Pending' }),
    countRecords(req, 'payments'),
    isAdmin ? Lead.countDocuments() : 0,
    isAdmin ? Job.countDocuments({ status: 'Open' }) : 0,
    isAdmin ? Application.countDocuments() : 0,
    monthlyUploads(req),
    statusBreakdown(req, ['quality', 'uploads', 'collection']),
    languageBreakdown(req),
    vendorPerformance(req),
    dailyProductivity(req),
  ])

  const completion = totalUploads ? Math.round((approvedData / totalUploads) * 100) : 0

  return res.json({
    success: true,
    data: {
      metrics: [
        { label: 'Total Users', value: numberText(totalUsers), icon: 'Users' },
        { label: 'Active Vendors', value: numberText(activeVendors), icon: 'BriefcaseBusiness' },
        { label: 'DC Team Members', value: numberText(dcTeamMembers), icon: 'UserCog' },
        { label: 'Total Projects', value: numberText(totalProjects), icon: 'FolderKanban' },
        { label: 'Active Projects', value: numberText(activeProjects), icon: 'ShieldCheck' },
        { label: 'Total Uploads', value: numberText(totalUploads), icon: 'UploadCloud' },
        { label: 'Approved Data', value: numberText(approvedData), icon: 'CheckCircle2' },
        { label: 'Rejected Data', value: numberText(rejectedData), icon: 'ClipboardCheck' },
        { label: 'Pending QC', value: numberText(pendingQc), icon: 'Bell' },
        { label: 'Total Payments', value: numberText(totalPayments), icon: 'CreditCard' },
        { label: 'Leads', value: numberText(leads), icon: 'UserRoundPlus' },
        { label: 'Open Jobs', value: numberText(openJobs), icon: 'BriefcaseBusiness' },
        { label: 'Applications', value: numberText(applications), icon: 'ClipboardCheck' },
        { label: 'Completion %', value: `${completion}%`, icon: 'Globe2' },
      ],
      monthlyUploads: uploadTrend,
      approvalData,
      languageData,
      vendorPerformance: vendors,
      productivityData,
      completion,
    },
  })
}
