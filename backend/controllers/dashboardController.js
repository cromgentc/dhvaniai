import AdminRecord from '../models/AdminRecord.js'
import Application from '../models/Application.js'
import Job from '../models/Job.js'
import Lead from '../models/Lead.js'
import User from '../models/User.js'

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function numberText(value) {
  return Number(value || 0).toLocaleString()
}

async function countRecords(module, extraFilter = {}) {
  return AdminRecord.countDocuments({ module, ...extraFilter })
}

async function statusBreakdown(modules) {
  const rows = await AdminRecord.aggregate([
    { $match: { module: { $in: modules } } },
    { $group: { _id: '$status', value: { $sum: 1 } } },
  ])

  const data = ['Approved', 'Pending', 'Rejected'].map((name) => ({
    name,
    value: rows.find((row) => row._id === name)?.value || 0,
  }))

  return data.some((item) => item.value > 0) ? data : []
}

async function monthlyUploads() {
  const currentYear = new Date().getFullYear()
  const rows = await AdminRecord.aggregate([
    {
      $match: {
        module: { $in: ['uploads', 'collection'] },
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

async function languageBreakdown() {
  return AdminRecord.aggregate([
    { $match: { language: { $nin: ['', null] } } },
    { $group: { _id: '$language', value: { $sum: 1 } } },
    { $sort: { value: -1 } },
    { $limit: 8 },
    { $project: { _id: 0, language: '$_id', value: 1 } },
  ])
}

async function vendorPerformance() {
  const rows = await AdminRecord.aggregate([
    { $match: { module: 'vendors' } },
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

async function dailyProductivity() {
  const start = new Date()
  start.setDate(start.getDate() - 6)
  start.setHours(0, 0, 0, 0)

  const rows = await AdminRecord.aggregate([
    { $match: { createdAt: { $gte: start } } },
    { $group: { _id: { day: { $dayOfWeek: '$createdAt' } }, tasks: { $sum: 1 } } },
  ])

  const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return labels.map((day, index) => ({
    day,
    tasks: rows.find((row) => row._id.day === index + 1)?.tasks || 0,
  }))
}

export async function getDashboardSummary(req, res) {
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
    User.countDocuments(),
    User.countDocuments({ role: 'Vendor', status: 'Active' }),
    User.countDocuments({ role: 'QC Team' }),
    countRecords('projects'),
    countRecords('projects', { status: 'Active' }),
    countRecords('uploads'),
    countRecords('quality', { status: 'Approved' }),
    countRecords('quality', { status: 'Rejected' }),
    countRecords('quality', { status: 'Pending' }),
    countRecords('payments'),
    Lead.countDocuments(),
    Job.countDocuments({ status: 'Open' }),
    Application.countDocuments(),
    monthlyUploads(),
    statusBreakdown(['quality', 'uploads', 'collection']),
    languageBreakdown(),
    vendorPerformance(),
    dailyProductivity(),
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
