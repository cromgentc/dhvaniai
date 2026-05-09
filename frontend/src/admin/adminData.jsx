import {
  BarChart3,
  Bell,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  Database,
  FileBarChart,
  FileText,
  FolderKanban,
  Globe2,
  Languages,
  LogOut,
  Settings,
  ShieldCheck,
  UploadCloud,
  Users,
  UserCog,
  UserRoundPlus,
} from 'lucide-react'

export const roles = ['Admin', 'Manager', 'Vendor', 'QC Team']

export const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'leads', label: 'Leads Management', icon: UserRoundPlus },
  { id: 'legal-pages', label: 'Legal Pages', icon: FileText },
  { id: 'jobs', label: 'Job Management', icon: BriefcaseBusiness },
  { id: 'applications', label: 'Applications', icon: ClipboardCheck },
  { id: 'users', label: 'User Management', icon: Users },
  { id: 'vendors', label: 'Vendor Management', icon: BriefcaseBusiness },
  { id: 'dc-team', label: 'DC Team Management', icon: UserCog },
  { id: 'projects', label: 'Project Management', icon: FolderKanban },
  { id: 'languages', label: 'Language Management', icon: Languages },
  { id: 'collection', label: 'Data Collection', icon: Database },
  { id: 'uploads', label: 'Upload Management', icon: UploadCloud },
  { id: 'quality', label: 'Quality Check', icon: ClipboardCheck },
  { id: 'payments', label: 'Payment Management', icon: CreditCard },
  { id: 'reports', label: 'Reports', icon: FileBarChart },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'logout', label: 'Logout', icon: LogOut },
]

export const metrics = [
  ['Total Users', '12,480', '+18%', Users],
  ['Active Vendors', '342', '+24%', BriefcaseBusiness],
  ['DC Team Members', '1,204', '+12%', UserCog],
  ['Total Projects', '86', '+9%', FolderKanban],
  ['Active Projects', '29', '+7%', ShieldCheck],
  ['Total Uploads', '4.8M', '+31%', UploadCloud],
  ['Approved Data', '3.9M', '+28%', CheckCircle2],
  ['Rejected Data', '184K', '-4%', ClipboardCheck],
  ['Pending QC', '64K', '+6%', Bell],
  ['Total Payments', '$428K', '+19%', CreditCard],
  ['Monthly Revenue', '$96K', '+22%', BarChart3],
  ['Completion %', '78%', '+11%', Globe2],
]

export const monthlyUploads = [
  { month: 'Jan', uploads: 42000, approved: 36000 },
  { month: 'Feb', uploads: 52000, approved: 45500 },
  { month: 'Mar', uploads: 61000, approved: 52000 },
  { month: 'Apr', uploads: 74000, approved: 65100 },
  { month: 'May', uploads: 88000, approved: 78600 },
  { month: 'Jun', uploads: 112000, approved: 98400 },
]

export const languageData = [
  { language: 'Hindi', value: 32 },
  { language: 'English', value: 28 },
  { language: 'Tamil', value: 14 },
  { language: 'Telugu', value: 12 },
  { language: 'Marathi', value: 8 },
  { language: 'Bengali', value: 6 },
]

export const approvalData = [
  { name: 'Approved', value: 72 },
  { name: 'Pending', value: 18 },
  { name: 'Rejected', value: 10 },
]

export const vendorPerformance = [
  { name: 'Astra Data', score: 94 },
  { name: 'Nova Voice', score: 88 },
  { name: 'Pixel Ops', score: 82 },
  { name: 'ScriptHub', score: 78 },
  { name: 'CloudServe', score: 73 },
]

export const productivityData = [
  { day: 'Mon', tasks: 320 },
  { day: 'Tue', tasks: 410 },
  { day: 'Wed', tasks: 365 },
  { day: 'Thu', tasks: 520 },
  { day: 'Fri', tasks: 610 },
  { day: 'Sat', tasks: 450 },
  { day: 'Sun', tasks: 290 },
]

export const tableRows = [
  { name: 'Aarav Sharma', role: 'Admin', project: 'Hindi OCR', language: 'Hindi', status: 'Active', score: '98%' },
  { name: 'Priya Mehta', role: 'Manager', project: 'Speech Data', language: 'English', status: 'Completed', score: '91%' },
  { name: 'Nova Vendor', role: 'Vendor', project: 'Image Collection', language: 'Tamil', status: 'Pending', score: '84%' },
  { name: 'QC Team North', role: 'QC Team', project: 'Document Review', language: 'Marathi', status: 'Approved', score: '96%' },
  { name: 'Rohan Verma', role: 'Vendor', project: 'Script Recording', language: 'Telugu', status: 'Rejected', score: '62%' },
  { name: 'DataField Ops', role: 'Vendor', project: 'Multilingual Data', language: 'Bengali', status: 'Inactive', score: '71%' },
]

export const pageCopy = {
  leads: ['Search submitted leads', 'Filter by status', 'Update lead status', 'Delete lead', 'Export leads', 'Lead detail modal'],
  'legal-pages': ['Create legal pages', 'SEO fields', 'Publish controls', 'Preview content', 'Draft workflow', 'Delete confirmation'],
  jobs: ['Post jobs', 'Edit openings', 'Publish or close', 'Duplicate jobs', 'Preview public role', 'Search and filter'],
  applications: ['Candidate table', 'Filter by status', 'View profile', 'Download resume', 'Update status', 'Export CSV'],
  users: ['Add user', 'Assign role', 'Search users', 'Filter by role/status', 'User table with pagination'],
  vendors: ['Add vendor', 'Supported languages', 'Assigned projects', 'Capacity tracking', 'Payment status', 'Performance score'],
  'dc-team': ['Add DC team member', 'Assign language', 'Assign project', 'Daily target', 'Attendance tracking', 'Team leader mapping'],
  projects: ['Create new project', 'Language selection', 'Target volume', 'Assign vendors', 'Progress tracking', 'Deadline status'],
  languages: ['Add languages', 'Edit language', 'Active/inactive status', 'Target per language', 'Completed data per language'],
  collection: ['Data intake', 'Language category', 'Vendor assignment', 'Target tracking', 'Collection quality'],
  uploads: ['Submitted files', 'Filter uploads', 'Preview files', 'Download files', 'Bulk approval/rejection'],
  quality: ['Approve data', 'Reject data', 'Rejection reason', 'Duplicate check', 'QC remarks', 'Client approval'],
  payments: ['Vendor summary', 'Approved data calculation', 'Advance payment', 'Final settlement', 'Invoice upload/download'],
  reports: ['Daily report', 'Weekly report', 'Monthly report', 'Vendor-wise report', 'Export CSV, Excel, PDF'],
  settings: ['Logo and favicon', 'Contact settings', 'Social links', 'Company information', 'Notifications', 'Security settings'],
}
