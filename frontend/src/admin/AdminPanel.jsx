import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  ArrowDownToLine,
  Bell,
  ChevronDown,
  Edit3,
  Eye,
  Filter,
  LogOut,
  Menu,
  MessageSquare,
  Moon,
  Plus,
  Search,
  Shield,
  Sun,
  Trash2,
  X,
} from 'lucide-react'
import {
  approvalData,
  languageData,
  metrics,
  monthlyUploads,
  pageCopy,
  productivityData,
  roles,
  sidebarItems,
  tableRows,
  vendorPerformance,
} from './adminData.jsx'
import { usePublicSettings } from '../hooks/usePublicSettings.js'

const statusStyles = {
  New: 'bg-cyan-400/15 text-cyan-200',
  Contacted: 'bg-violet-400/15 text-violet-200',
  Converted: 'bg-emerald-400/15 text-emerald-200',
  Approved: 'bg-emerald-400/15 text-emerald-200',
  Pending: 'bg-amber-400/15 text-amber-200',
  Rejected: 'bg-rose-400/15 text-rose-200',
  Completed: 'bg-cyan-400/15 text-cyan-200',
  Active: 'bg-emerald-400/15 text-emerald-200',
  Inactive: 'bg-slate-400/15 text-slate-300',
  Draft: 'bg-amber-400/15 text-amber-200',
  Published: 'bg-emerald-400/15 text-emerald-200',
  Open: 'bg-emerald-400/15 text-emerald-200',
  Closed: 'bg-slate-400/15 text-slate-300',
  'Urgent Hiring': 'bg-rose-400/15 text-rose-200',
  Shortlisted: 'bg-cyan-400/15 text-cyan-200',
  Interview: 'bg-violet-400/15 text-violet-200',
  Selected: 'bg-emerald-400/15 text-emerald-200',
}

const pieColors = ['#22d3ee', '#a78bfa', '#fb7185']
const defaultLegalForm = {
  title: '',
  slug: '',
  shortDescription: '',
  seoTitle: '',
  metaDescription: '',
  content: '',
  status: 'Draft',
}
const defaultJobForm = {
  title: '',
  slug: '',
  department: '',
  location: '',
  workMode: 'On-site',
  jobType: 'Full-time',
  experienceLevel: 'Entry Level',
  minExperience: 0,
  maxExperience: 2,
  salaryMin: 0,
  salaryMax: 0,
  openings: 1,
  skills: '',
  shortDescription: '',
  fullDescription: '',
  responsibilities: '',
  requirements: '',
  education: '',
  benefits: '',
  applicationDeadline: '',
  status: 'Draft',
}
const defaultContactForm = {
  email: 'hello@dhvani.ai',
  phone: '+91 98765 43210',
  address: 'Noida, Uttar Pradesh, India',
  googleMapUrl: '',
  supportEmail: 'hello@dhvani.ai',
  salesEmail: 'hello@dhvani.ai',
  logoUrl: '/dhvani-logo.png',
  faviconUrl: '/dhvani-logo.png',
}
const defaultSocialForm = {
  platformName: 'LinkedIn',
  profileUrl: '',
  iconName: 'Linkedin',
  status: 'Active',
  sortOrder: 1,
}
const defaultUserForm = {
  name: '',
  email: '',
  password: '',
  role: 'Manager',
  status: 'Active',
}
const socialPlatforms = ['LinkedIn', 'Facebook', 'Instagram', 'X / Twitter', 'YouTube', 'WhatsApp', 'Telegram', 'GitHub']
const socialIconOptions = ['Linkedin', 'Facebook', 'Instagram', 'Twitter', 'Youtube', 'MessageCircle', 'Send', 'Github']

function getAdminToken() {
  return window.localStorage.getItem('dhvaniAdminToken') || ''
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAdminToken()}`,
  }
}

function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(() => Boolean(getAdminToken()))
  const [activePage, setActivePage] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [query, setQuery] = useState('')

  const activeItem = sidebarItems.find((item) => item.id === activePage) || sidebarItems[0]
  const filteredRows = useMemo(
    () => tableRows.filter((row) => Object.values(row).join(' ').toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  const notify = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2400)
  }

  const logout = () => {
    window.localStorage.removeItem('dhvaniAdminToken')
    setLoggedIn(false)
    setActivePage('dashboard')
    setQuery('')
  }

  if (!loggedIn) {
    return <LoginPage onLogin={() => setLoggedIn(true)} />
  }

  return (
    <div className={`${darkMode ? 'dark bg-[#050816] text-white' : 'bg-slate-100 text-slate-950'} min-h-screen`}>
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(168,85,247,0.18),transparent_30%),linear-gradient(135deg,#050816,#071024_48%,#030610)] dark:block hidden" />
      <Sidebar activePage={activePage} onLogout={logout} setActivePage={setActivePage} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      <div className="lg:pl-72">
        <TopHeader
          activeItem={activeItem}
          darkMode={darkMode}
          onCreate={() => setModalOpen(true)}
          onLogout={logout}
          query={query}
          setDarkMode={setDarkMode}
          setQuery={setQuery}
          setSidebarOpen={setSidebarOpen}
        />
        <main className="px-4 pb-10 pt-24 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div key={activePage} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }}>
              {activePage === 'dashboard' ? (
                <DashboardPage />
              ) : activePage === 'leads' ? (
                <LeadsPage notify={notify} />
              ) : activePage === 'legal-pages' ? (
                <LegalPagesPage notify={notify} />
              ) : activePage === 'jobs' ? (
                <JobsPage notify={notify} />
              ) : activePage === 'applications' ? (
                <ApplicationsPage notify={notify} />
              ) : activePage === 'users' ? (
                <UsersPage notify={notify} />
              ) : activePage === 'settings' ? (
                <SettingsPage notify={notify} />
              ) : (
                <ManagementPage activeItem={activeItem} filteredRows={filteredRows} notify={notify} query={query} setDeleteOpen={setDeleteOpen} setModalOpen={setModalOpen} setQuery={setQuery} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <ModalForm activeItem={activeItem} isOpen={modalOpen} notify={notify} onClose={() => setModalOpen(false)} />
      <ConfirmDialog isOpen={deleteOpen} notify={notify} onClose={() => setDeleteOpen(false)} />
      <Toast message={toast} />
    </div>
  )
}

function LeadsPage({ notify }) {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const [type, setType] = useState('')
  const [selectedLead, setSelectedLead] = useState(null)

  const fetchLeads = async () => {
    setLoading(true)
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      const params = new URLSearchParams()
      if (query) params.set('q', query)
      if (status) params.set('status', status)
      if (type) params.set('type', type)
      const response = await fetch(`${apiUrl}/api/leads/all?${params.toString()}`)
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Unable to fetch leads')
      setLeads(result.data || [])
    } catch (error) {
      notify(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [status, type])

  const updateStatus = async (id, nextStatus) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      const response = await fetch(`${apiUrl}/api/leads/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Unable to update lead')
      notify('Lead status updated')
      fetchLeads()
    } catch (error) {
      notify(error.message)
    }
  }

  const deleteLead = async (id) => {
    if (!window.confirm('Delete this lead?')) return
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      const response = await fetch(`${apiUrl}/api/leads/${id}`, { method: 'DELETE' })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Unable to delete lead')
      notify('Lead deleted')
      fetchLeads()
    } catch (error) {
      notify(error.message)
    }
  }

  const exportCsv = () => {
    const header = ['Type', 'Full Name', 'Email', 'Mobile', 'Company/Profile', 'Service', 'Budget/Rate', 'Status', 'Source', 'Created At']
    const rows = leads.map((lead) => [lead.registrationType || 'enterprise', lead.fullName, lead.email, lead.mobile, lead.companyName, lead.service, lead.budget, lead.status, lead.source, lead.createdAt])
    const csv = [header, ...rows].map((row) => row.map((value) => `"${String(value || '').replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'dhvani-leads.csv'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="grid gap-6">
      <div className="admin-card">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200">Website Leads</p>
            <h2 className="mt-2 text-3xl font-black text-white">Leads Management</h2>
            <p className="mt-2 text-slate-400">View, search, filter, export, update, and delete submitted contact, vendor, and freelancer registrations.</p>
          </div>
          <button onClick={exportCsv} className="admin-secondary-btn"><ArrowDownToLine size={16} /> Export CSV</button>
        </div>
      </div>

      <div className="admin-card">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-4 py-3 md:w-96">
            <Search size={17} className="text-slate-500" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && fetchLeads()} className="w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-slate-500" placeholder="Search name, email, mobile, type, service..." />
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              ['', 'All Types'],
              ['enterprise', 'Enterprise'],
              ['vendor', 'Vendor'],
              ['freelancer', 'Freelancer'],
            ].map(([value, label]) => (
              <button key={label} onClick={() => setType(value)} className={`rounded-full px-4 py-2 text-sm font-black ${type === value ? 'bg-cyan-300 text-slate-950' : 'bg-white/[0.06] text-slate-300'}`}>
                {label}
              </button>
            ))}
            {['', 'New', 'Contacted', 'Converted', 'Rejected'].map((item) => (
              <button key={item || 'All'} onClick={() => setStatus(item)} className={`rounded-full px-4 py-2 text-sm font-black ${status === item ? 'bg-cyan-300 text-slate-950' : 'bg-white/[0.06] text-slate-300'}`}>
                {item || 'All'}
              </button>
            ))}
            <button onClick={fetchLeads} className="admin-primary-btn">Search</button>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          {loading ? (
            <div className="grid gap-3">
              {[1, 2, 3, 4].map((item) => <div key={item} className="h-14 animate-pulse rounded-2xl bg-white/[0.06]" />)}
            </div>
          ) : leads.length ? (
            <table className="w-full min-w-[900px] text-left">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-[0.18em] text-slate-500">
                  {['Type', 'Name', 'Email', 'Mobile', 'Service', 'Budget/Rate', 'Status', 'Actions'].map((head) => <th key={head} className="px-4 py-4">{head}</th>)}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead._id} className="border-b border-white/5 text-sm font-semibold text-slate-300 hover:bg-white/[0.035]">
                    <td className="px-4 py-4 capitalize">{lead.registrationType || 'enterprise'}</td>
                    <td className="px-4 py-4 font-black text-white">{lead.fullName}</td>
                    <td className="px-4 py-4">{lead.email}</td>
                    <td className="px-4 py-4">{lead.mobile}</td>
                    <td className="px-4 py-4">{lead.service}</td>
                    <td className="px-4 py-4">{lead.budget}</td>
                    <td className="px-4 py-4">
                      <select className={`rounded-full px-3 py-1 text-xs font-black outline-none ${statusStyles[lead.status] || statusStyles.Pending}`} value={lead.status} onChange={(event) => updateStatus(lead._id, event.target.value)}>
                        {['New', 'Contacted', 'Converted', 'Rejected'].map((item) => <option key={item} className="bg-[#071024] text-white">{item}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button className="table-icon" onClick={() => setSelectedLead(lead)}><Eye size={15} /></button>
                        <button className="table-icon text-rose-300" onClick={() => deleteLead(lead._id)}><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/15 p-10 text-center font-bold text-slate-400">No leads found yet.</div>
          )}
        </div>
      </div>
      <LeadDetailModal lead={selectedLead} onClose={() => setSelectedLead(null)} />
    </div>
  )
}

function LegalPagesPage({ notify }) {
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [previewPage, setPreviewPage] = useState(null)
  const [editingPage, setEditingPage] = useState(null)

  const fetchPages = async () => {
    setLoading(true)
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      const params = new URLSearchParams()
      if (query) params.set('q', query)
      if (status) params.set('status', status)
      const response = await fetch(`${apiUrl}/api/legal/all?${params.toString()}`, { headers: authHeaders() })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Unable to fetch legal pages')
      setPages(result.data || [])
    } catch (error) {
      notify(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPages()
  }, [status])

  const openCreate = () => {
    setEditingPage(null)
    setFormOpen(true)
  }

  const openEdit = (page) => {
    setEditingPage(page)
    setFormOpen(true)
  }

  const deletePage = async (page) => {
    if (!window.confirm(`Delete "${page.title}"?`)) return
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      const response = await fetch(`${apiUrl}/api/legal/delete/${page._id}`, { method: 'DELETE', headers: authHeaders() })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Unable to delete legal page')
      notify('Legal page deleted')
      fetchPages()
    } catch (error) {
      notify(error.message)
    }
  }

  const updateStatus = async (page, nextStatus) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      const response = await fetch(`${apiUrl}/api/legal/status/${page._id}`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({ status: nextStatus }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Unable to update status')
      notify(`Legal page ${nextStatus.toLowerCase()}`)
      fetchPages()
    } catch (error) {
      notify(error.message)
    }
  }

  return (
    <div className="grid gap-6">
      <div className="admin-card">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200">CMS</p>
            <h2 className="mt-2 text-3xl font-black text-white">Legal Pages Management</h2>
            <p className="mt-2 text-slate-400">Create, edit, preview, publish, unpublish, and manage legal content dynamically.</p>
          </div>
          <button onClick={openCreate} className="admin-primary-btn"><Plus size={16} /> Add Legal Page</button>
        </div>
      </div>

      <div className="admin-card">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-4 py-3 md:w-96">
            <Search size={17} className="text-slate-500" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && fetchPages()} className="w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-slate-500" placeholder="Search title, slug, SEO..." />
          </div>
          <div className="flex flex-wrap gap-2">
            {['', 'Draft', 'Published'].map((item) => (
              <button key={item || 'All'} onClick={() => setStatus(item)} className={`rounded-full px-4 py-2 text-sm font-black ${status === item ? 'bg-cyan-300 text-slate-950' : 'bg-white/[0.06] text-slate-300'}`}>
                {item || 'All'}
              </button>
            ))}
            <button onClick={fetchPages} className="admin-primary-btn">Search</button>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          {loading ? (
            <div className="grid gap-3">
              {[1, 2, 3, 4].map((item) => <div key={item} className="h-16 animate-pulse rounded-2xl bg-white/[0.06]" />)}
            </div>
          ) : pages.length ? (
            <table className="w-full min-w-[1100px] text-left">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-[0.18em] text-slate-500">
                  {['Title', 'Slug', 'SEO Title', 'Status', 'Last Updated', 'Actions'].map((head) => <th key={head} className="px-4 py-4">{head}</th>)}
                </tr>
              </thead>
              <tbody>
                {pages.map((page) => (
                  <tr key={page._id} className="border-b border-white/5 text-sm font-semibold text-slate-300 hover:bg-white/[0.035]">
                    <td className="px-4 py-4">
                      <p className="font-black text-white">{page.title}</p>
                      <p className="mt-1 line-clamp-1 max-w-xs text-xs text-slate-500">{page.shortDescription}</p>
                    </td>
                    <td className="px-4 py-4">/{page.slug}</td>
                    <td className="px-4 py-4">{page.seoTitle || '-'}</td>
                    <td className="px-4 py-4"><span className={`rounded-full px-3 py-1 text-xs font-black ${statusStyles[page.status]}`}>{page.status}</span></td>
                    <td className="px-4 py-4">{formatDate(page.updatedAt)}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button className="table-icon" onClick={() => setPreviewPage(page)} title="Preview"><Eye size={15} /></button>
                        <button className="table-icon" onClick={() => openEdit(page)} title="Edit"><Edit3 size={15} /></button>
                        <button className="table-icon" onClick={() => updateStatus(page, page.status === 'Published' ? 'Draft' : 'Published')} title="Publish or unpublish">
                          <Shield size={15} />
                        </button>
                        <button className="table-icon text-rose-300" onClick={() => deletePage(page)} title="Delete"><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/15 p-10 text-center">
              <p className="font-black text-white">No legal pages found.</p>
              <p className="mt-2 text-sm font-semibold text-slate-400">Create Privacy Policy, Terms, Security, Cookies Policy, or Disclaimer pages.</p>
              <button onClick={openCreate} className="admin-primary-btn mt-5">Create First Page</button>
            </div>
          )}
        </div>
      </div>

      <LegalPageFormModal editingPage={editingPage} isOpen={formOpen} notify={notify} onClose={() => setFormOpen(false)} onSaved={fetchPages} />
      <LegalPreviewModal page={previewPage} onClose={() => setPreviewPage(null)} />
    </div>
  )
}

function LegalPageFormModal({ editingPage, isOpen, notify, onClose, onSaved }) {
  const [form, setForm] = useState(defaultLegalForm)
  const [saving, setSaving] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    setForm(editingPage ? {
      title: editingPage.title || '',
      slug: editingPage.slug || '',
      shortDescription: editingPage.shortDescription || '',
      seoTitle: editingPage.seoTitle || '',
      metaDescription: editingPage.metaDescription || '',
      content: editingPage.content || '',
      status: editingPage.status || 'Draft',
    } : defaultLegalForm)
  }, [editingPage, isOpen])

  const updateForm = (field, value) => {
    setForm((current) => {
      const next = { ...current, [field]: value }
      if (field === 'title' && !editingPage && !current.slug) {
        next.slug = slugifyClient(value)
      }
      if (field === 'slug') next.slug = slugifyClient(value)
      return next
    })
  }

  const savePage = async (nextStatus = form.status) => {
    if (!form.title.trim() || !form.content.trim()) {
      notify('Title and content are required')
      return
    }

    setSaving(true)
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      const endpoint = editingPage ? `${apiUrl}/api/legal/update/${editingPage._id}` : `${apiUrl}/api/legal/create`
      const response = await fetch(endpoint, {
        method: editingPage ? 'PUT' : 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ ...form, status: nextStatus }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Unable to save legal page')
      notify(nextStatus === 'Published' ? 'Legal page published' : 'Legal page saved as draft')
      onSaved()
      onClose()
    } catch (error) {
      notify(error.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-[85] grid place-items-center overflow-y-auto bg-black/65 px-4 py-6 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="w-full max-w-5xl rounded-[2rem] border border-white/10 bg-[#071024] p-6 shadow-glass" initial={{ scale: 0.96, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 20 }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">Legal CMS Editor</p>
                <h2 className="mt-2 text-2xl font-black text-white">{editingPage ? 'Edit Legal Page' : 'Add New Legal Page'}</h2>
              </div>
              <button onClick={onClose} className="text-slate-400"><X /></button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <FieldBlock label="Page Title">
                <input className="admin-input" value={form.title} onChange={(event) => updateForm('title', event.target.value)} placeholder="Privacy Policy" />
              </FieldBlock>
              <FieldBlock label="Slug">
                <input className="admin-input" value={form.slug} onChange={(event) => updateForm('slug', event.target.value)} placeholder="privacy-policy" />
              </FieldBlock>
              <FieldBlock label="Short Description" className="sm:col-span-2">
                <textarea className="admin-input min-h-20 resize-none" value={form.shortDescription} onChange={(event) => updateForm('shortDescription', event.target.value)} placeholder="Short public page description" />
              </FieldBlock>
              <FieldBlock label="SEO Title">
                <input className="admin-input" value={form.seoTitle} onChange={(event) => updateForm('seoTitle', event.target.value)} placeholder="Privacy Policy | Dhvani.AI" />
              </FieldBlock>
              <FieldBlock label="Meta Description">
                <input className="admin-input" value={form.metaDescription} onChange={(event) => updateForm('metaDescription', event.target.value)} placeholder="Search engine meta description" />
              </FieldBlock>
              <FieldBlock label="Status">
                <select className="admin-input" value={form.status} onChange={(event) => updateForm('status', event.target.value)}>
                  <option className="bg-[#071024] text-white">Draft</option>
                  <option className="bg-[#071024] text-white">Published</option>
                </select>
              </FieldBlock>
              <FieldBlock label="Last Updated Date">
                <input className="admin-input" value={editingPage?.updatedAt ? formatDate(editingPage.updatedAt) : 'Will be set on save'} disabled />
              </FieldBlock>
              <FieldBlock label="Page Content" className="sm:col-span-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                  <div className="mb-3 flex flex-wrap gap-2 border-b border-white/10 pb-3 text-xs font-black text-slate-400">
                    <span className="rounded-full bg-white/10 px-3 py-1">H2: ## Heading</span>
                    <span className="rounded-full bg-white/10 px-3 py-1">HTML allowed</span>
                    <span className="rounded-full bg-white/10 px-3 py-1">Sanitized on save</span>
                  </div>
                  <textarea className="min-h-72 w-full resize-y bg-transparent px-2 py-1 font-semibold leading-7 text-white outline-none placeholder:text-slate-500" value={form.content} onChange={(event) => updateForm('content', event.target.value)} placeholder={'## Introduction\nWrite page content here.\n\n## Information We Collect\nAdd detailed legal copy.'} />
                </div>
              </FieldBlock>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button onClick={() => setPreviewOpen(true)} className="admin-secondary-btn justify-center"><Eye size={16} /> Preview</button>
              <button disabled={saving} onClick={() => savePage('Draft')} className="admin-secondary-btn justify-center">Save as Draft</button>
              <button disabled={saving} onClick={() => savePage('Published')} className="admin-primary-btn justify-center">{saving ? 'Saving...' : 'Publish'}</button>
            </div>
            <LegalPreviewModal page={{ ...form, updatedAt: new Date().toISOString() }} onClose={() => setPreviewOpen(false)} open={previewOpen} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function LegalPreviewModal({ onClose, open, page }) {
  const isOpen = open ?? Boolean(page)
  if (!isOpen || !page) return null

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[95] grid place-items-center overflow-y-auto bg-black/70 px-4 py-6 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className="w-full max-w-3xl rounded-[2rem] border border-white/10 bg-[#071024] p-6 shadow-glass" initial={{ scale: 0.96, y: 18 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 18 }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">Preview / {page.status || 'Draft'}</p>
              <h2 className="mt-2 text-3xl font-black text-white">{page.title}</h2>
              <p className="mt-2 leading-7 text-slate-400">{page.shortDescription}</p>
              <p className="mt-3 text-sm font-bold text-slate-500">Last updated: {formatDate(page.updatedAt)}</p>
            </div>
            <button onClick={onClose} className="text-slate-400"><X /></button>
          </div>
          <div className="prose prose-invert prose-cyan mt-6 max-w-none rounded-2xl bg-white/[0.05] p-5 leading-8 text-slate-300" dangerouslySetInnerHTML={{ __html: previewHtml(page.content) }} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function FieldBlock({ children, className = '', label }) {
  return (
    <label className={`grid gap-2 ${className}`}>
      <span className="text-sm font-black text-slate-200">{label}</span>
      {children}
    </label>
  )
}

function formatDate(value) {
  if (!value) return '-'
  return new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

function slugifyClient(value = '') {
  return String(value).toLowerCase().trim().replace(/['"]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

function isAssetUrl(value = '') {
  return /^https?:\/\/.+/i.test(value) || value.startsWith('/') || value.startsWith('data:image/')
}

function assetFileToDataUrl(file, onDone, notify) {
  if (!file) return
  if (!file.type.startsWith('image/')) {
    notify('Please upload an image file')
    return
  }
  if (file.size > 1024 * 1024) {
    notify('Image must be under 1MB')
    return
  }
  const reader = new FileReader()
  reader.onload = () => onDone(reader.result)
  reader.onerror = () => notify('Unable to read image file')
  reader.readAsDataURL(file)
}

function previewHtml(content = '') {
  const withoutHeadings = String(content).replace(/^##\s+(.+)$/gm, '<h2>$1</h2>')
  if (/<\/?[a-z][\s\S]*>/i.test(withoutHeadings)) return withoutHeadings
  return withoutHeadings.split(/\n{2,}/).map((item) => `<p>${item.replace(/\n/g, '<br />')}</p>`).join('')
}

function JobsPage({ notify }) {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editingJob, setEditingJob] = useState(null)

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      const params = new URLSearchParams()
      if (query) params.set('q', query)
      if (status) params.set('status', status)
      const response = await fetch(`${apiUrl}/api/jobs/all?${params.toString()}`, { headers: authHeaders() })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Unable to fetch jobs')
      setJobs(result.data || [])
    } catch (error) {
      notify(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [status])

  const openForm = (job = null) => {
    setEditingJob(job)
    setFormOpen(true)
  }

  const updateStatus = async (job, nextStatus) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      const response = await fetch(`${apiUrl}/api/jobs/status/${job._id}`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({ status: nextStatus }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Unable to update status')
      notify('Job status updated')
      fetchJobs()
    } catch (error) {
      notify(error.message)
    }
  }

  const deleteJob = async (job) => {
    if (!window.confirm(`Delete "${job.title}"?`)) return
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      const response = await fetch(`${apiUrl}/api/jobs/delete/${job._id}`, { method: 'DELETE', headers: authHeaders() })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Unable to delete job')
      notify('Job deleted')
      fetchJobs()
    } catch (error) {
      notify(error.message)
    }
  }

  const duplicateJob = (job) => openForm({ ...job, _id: '', title: `${job.title} Copy`, slug: `${job.slug}-copy`, status: 'Draft' })

  return (
    <div className="grid gap-6">
      <div className="admin-card">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200">Careers CMS</p>
            <h2 className="mt-2 text-3xl font-black text-white">Job Management</h2>
            <p className="mt-2 text-slate-400">Create, edit, duplicate, publish, close, and preview current openings.</p>
          </div>
          <button onClick={() => openForm()} className="admin-primary-btn"><Plus size={16} /> Add New Job</button>
        </div>
      </div>
      <div className="admin-card">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-4 py-3 md:w-96">
            <Search size={17} className="text-slate-500" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && fetchJobs()} className="w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-slate-500" placeholder="Search jobs..." />
          </div>
          <div className="flex flex-wrap gap-2">
            {['', 'Open', 'Urgent Hiring', 'Draft', 'Closed'].map((item) => <button key={item || 'All'} onClick={() => setStatus(item)} className={`rounded-full px-4 py-2 text-sm font-black ${status === item ? 'bg-cyan-300 text-slate-950' : 'bg-white/[0.06] text-slate-300'}`}>{item || 'All'}</button>)}
            <button onClick={fetchJobs} className="admin-primary-btn">Search</button>
          </div>
        </div>
        <div className="mt-6 overflow-x-auto">
          {loading ? <SkeletonRows /> : jobs.length ? (
            <table className="w-full min-w-[1120px] text-left">
              <thead><tr className="border-b border-white/10 text-xs uppercase tracking-[0.18em] text-slate-500">{['Title', 'Department', 'Location', 'Type', 'Openings', 'Status', 'Updated', 'Actions'].map((head) => <th key={head} className="px-4 py-4">{head}</th>)}</tr></thead>
              <tbody>{jobs.map((job) => (
                <tr key={job._id || job.slug} className="border-b border-white/5 text-sm font-semibold text-slate-300 hover:bg-white/[0.035]">
                  <td className="px-4 py-4"><p className="font-black text-white">{job.title}</p><p className="text-xs text-slate-500">/{job.slug}</p></td>
                  <td className="px-4 py-4">{job.department}</td>
                  <td className="px-4 py-4">{job.location} / {job.workMode}</td>
                  <td className="px-4 py-4">{job.jobType}</td>
                  <td className="px-4 py-4">{job.openings}</td>
                  <td className="px-4 py-4"><select value={job.status} onChange={(event) => updateStatus(job, event.target.value)} className={`rounded-full px-3 py-1 text-xs font-black outline-none ${statusStyles[job.status] || statusStyles.Pending}`}>{['Open', 'Urgent Hiring', 'Draft', 'Closed'].map((item) => <option key={item} className="bg-[#071024] text-white">{item}</option>)}</select></td>
                  <td className="px-4 py-4">{formatDate(job.updatedAt)}</td>
                  <td className="px-4 py-4"><div className="flex gap-2">
                    <a className="table-icon" href="/careers/current-openings" title="Preview"><Eye size={15} /></a>
                    <button className="table-icon" onClick={() => openForm(job)}><Edit3 size={15} /></button>
                    <button className="table-icon" onClick={() => duplicateJob(job)}><Plus size={15} /></button>
                    <button className="table-icon text-rose-300" onClick={() => deleteJob(job)}><Trash2 size={15} /></button>
                  </div></td>
                </tr>
              ))}</tbody>
            </table>
          ) : <EmptyState title="No jobs found" action="Add New Job" onAction={() => openForm()} />}
        </div>
      </div>
      <JobFormModal editingJob={editingJob} isOpen={formOpen} notify={notify} onClose={() => setFormOpen(false)} onSaved={fetchJobs} />
    </div>
  )
}

function JobFormModal({ editingJob, isOpen, notify, onClose, onSaved }) {
  const [form, setForm] = useState(defaultJobForm)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    setForm(editingJob ? {
      ...defaultJobForm,
      ...editingJob,
      skills: Array.isArray(editingJob.skills) ? editingJob.skills.join(', ') : editingJob.skills || '',
      applicationDeadline: editingJob.applicationDeadline ? editingJob.applicationDeadline.slice(0, 10) : '',
    } : defaultJobForm)
  }, [editingJob, isOpen])

  const update = (field, value) => setForm((current) => {
    const next = { ...current, [field]: value }
    if (field === 'title' && !editingJob && !current.slug) next.slug = slugifyClient(value)
    if (field === 'slug') next.slug = slugifyClient(value)
    return next
  })

  const save = async (nextStatus = form.status) => {
    setSaving(true)
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      const isUpdate = Boolean(editingJob?._id)
      const response = await fetch(isUpdate ? `${apiUrl}/api/jobs/update/${editingJob._id}` : `${apiUrl}/api/jobs/create`, {
        method: isUpdate ? 'PUT' : 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ ...form, status: nextStatus }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Unable to save job')
      notify(nextStatus === 'Draft' ? 'Job saved as draft' : 'Job published')
      onSaved()
      onClose()
    } catch (error) {
      notify(error.message)
    } finally {
      setSaving(false)
    }
  }

  return <AnimatePresence>{isOpen && (
    <motion.div className="fixed inset-0 z-[85] grid place-items-center overflow-y-auto bg-black/65 px-4 py-6 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="w-full max-w-6xl rounded-[2rem] border border-white/10 bg-[#071024] p-6 shadow-glass" initial={{ scale: 0.96, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 20 }}>
        <div className="flex items-start justify-between"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">Job Editor</p><h2 className="mt-2 text-2xl font-black text-white">{editingJob?._id ? 'Edit Job' : 'Add New Job'}</h2></div><button onClick={onClose} className="text-slate-400"><X /></button></div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ['title', 'Job Title'], ['slug', 'Slug'], ['department', 'Department'], ['location', 'Location'], ['experienceLevel', 'Experience Level'], ['minExperience', 'Min Experience'], ['maxExperience', 'Max Experience'], ['salaryMin', 'Salary Min'], ['salaryMax', 'Salary Max'], ['openings', 'Number of Openings'], ['skills', 'Skills Tags'],
          ].map(([field, label]) => <FieldBlock key={field} label={label}><input className="admin-input" value={form[field]} onChange={(event) => update(field, event.target.value)} /></FieldBlock>)}
          <FieldBlock label="Work Mode"><select className="admin-input" value={form.workMode} onChange={(event) => update('workMode', event.target.value)}>{['Remote', 'On-site', 'Hybrid'].map((item) => <option key={item} className="bg-[#071024]">{item}</option>)}</select></FieldBlock>
          <FieldBlock label="Job Type"><select className="admin-input" value={form.jobType} onChange={(event) => update('jobType', event.target.value)}>{['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'].map((item) => <option key={item} className="bg-[#071024]">{item}</option>)}</select></FieldBlock>
          <FieldBlock label="Application Deadline"><input type="date" className="admin-input" value={form.applicationDeadline} onChange={(event) => update('applicationDeadline', event.target.value)} /></FieldBlock>
          <FieldBlock label="Status"><select className="admin-input" value={form.status} onChange={(event) => update('status', event.target.value)}>{['Draft', 'Open', 'Urgent Hiring', 'Closed'].map((item) => <option key={item} className="bg-[#071024]">{item}</option>)}</select></FieldBlock>
          {[
            ['shortDescription', 'Short Description'], ['fullDescription', 'Full Description'], ['responsibilities', 'Responsibilities'], ['requirements', 'Requirements'], ['education', 'Education'], ['benefits', 'Benefits'],
          ].map(([field, label]) => <FieldBlock key={field} label={label} className="sm:col-span-2 lg:col-span-3"><textarea className="admin-input min-h-24 resize-y" value={form[field]} onChange={(event) => update(field, event.target.value)} /></FieldBlock>)}
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end"><button onClick={() => save('Draft')} disabled={saving} className="admin-secondary-btn justify-center">Save as Draft</button><button onClick={() => save('Open')} disabled={saving} className="admin-primary-btn justify-center">{saving ? 'Saving...' : 'Publish Job'}</button></div>
      </motion.div>
    </motion.div>
  )}</AnimatePresence>
}

function ApplicationsPage({ notify }) {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [selected, setSelected] = useState(null)

  const fetchApplications = async () => {
    setLoading(true)
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      const params = new URLSearchParams()
      if (query) params.set('q', query)
      if (status) params.set('status', status)
      if (jobTitle) params.set('jobTitle', jobTitle)
      const response = await fetch(`${apiUrl}/api/applications/all?${params.toString()}`, { headers: authHeaders() })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Unable to fetch applications')
      setApplications(result.data || [])
    } catch (error) {
      notify(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchApplications() }, [status])

  const updateStatus = async (application, nextStatus) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      const response = await fetch(`${apiUrl}/api/applications/status/${application._id}`, { method: 'PATCH', headers: authHeaders(), body: JSON.stringify({ status: nextStatus }) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Unable to update application')
      notify('Application status updated')
      fetchApplications()
    } catch (error) { notify(error.message) }
  }

  const deleteApplication = async (application) => {
    if (!window.confirm(`Delete application from ${application.fullName}?`)) return
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      const response = await fetch(`${apiUrl}/api/applications/delete/${application._id}`, { method: 'DELETE', headers: authHeaders() })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Unable to delete application')
      notify('Application deleted')
      fetchApplications()
    } catch (error) { notify(error.message) }
  }

  const exportCsv = () => {
    const header = ['Job', 'Name', 'Email', 'Mobile', 'Location', 'Experience', 'Status', 'Applied At']
    const rows = applications.map((item) => [item.jobTitle, item.fullName, item.email, item.mobile, item.currentLocation, item.totalExperience, item.status, item.appliedAt])
    downloadCsv('applications.csv', header, rows)
  }

  return (
    <div className="grid gap-6">
      <div className="admin-card"><div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between"><div><p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200">Hiring Pipeline</p><h2 className="mt-2 text-3xl font-black text-white">Applications</h2><p className="mt-2 text-slate-400">Review candidate details, download resumes, update status, and export applications.</p></div><button onClick={exportCsv} className="admin-secondary-btn"><ArrowDownToLine size={16} /> Export CSV</button></div></div>
      <div className="admin-card">
        <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto_auto]"><input className="admin-input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, email, mobile" /><input className="admin-input" value={jobTitle} onChange={(event) => setJobTitle(event.target.value)} placeholder="Filter by job title" /><select className="admin-input" value={status} onChange={(event) => setStatus(event.target.value)}><option value="" className="bg-[#071024]">All Status</option>{['New', 'Shortlisted', 'Interview', 'Selected', 'Rejected'].map((item) => <option key={item} className="bg-[#071024]">{item}</option>)}</select><button onClick={fetchApplications} className="admin-primary-btn justify-center">Search</button></div>
        <div className="mt-6 overflow-x-auto">{loading ? <SkeletonRows /> : applications.length ? (
          <table className="w-full min-w-[1050px] text-left"><thead><tr className="border-b border-white/10 text-xs uppercase tracking-[0.18em] text-slate-500">{['Candidate', 'Job', 'Mobile', 'Experience', 'Status', 'Applied', 'Actions'].map((head) => <th key={head} className="px-4 py-4">{head}</th>)}</tr></thead><tbody>{applications.map((item) => (
            <tr key={item._id} className="border-b border-white/5 text-sm font-semibold text-slate-300 hover:bg-white/[0.035]"><td className="px-4 py-4"><p className="font-black text-white">{item.fullName}</p><p className="text-xs text-slate-500">{item.email}</p></td><td className="px-4 py-4">{item.jobTitle}</td><td className="px-4 py-4">{item.mobile}</td><td className="px-4 py-4">{item.totalExperience}</td><td className="px-4 py-4"><select value={item.status} onChange={(event) => updateStatus(item, event.target.value)} className={`rounded-full px-3 py-1 text-xs font-black outline-none ${statusStyles[item.status] || statusStyles.Pending}`}>{['New', 'Shortlisted', 'Interview', 'Selected', 'Rejected'].map((statusItem) => <option key={statusItem} className="bg-[#071024] text-white">{statusItem}</option>)}</select></td><td className="px-4 py-4">{formatDate(item.appliedAt)}</td><td className="px-4 py-4"><div className="flex gap-2"><button className="table-icon" onClick={() => setSelected(item)}><Eye size={15} /></button><a className="table-icon" href={item.resumeUrl} download={`${item.fullName}-resume`}><ArrowDownToLine size={15} /></a><button className="table-icon text-rose-300" onClick={() => deleteApplication(item)}><Trash2 size={15} /></button></div></td></tr>
          ))}</tbody></table>
        ) : <EmptyState title="No applications found" />}</div>
      </div>
      <ApplicationDetailModal application={selected} onClose={() => setSelected(null)} />
    </div>
  )
}

function ApplicationDetailModal({ application, onClose }) {
  return <AnimatePresence>{application && <motion.div className="fixed inset-0 z-[90] grid place-items-center overflow-y-auto bg-black/60 px-4 py-6 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div className="w-full max-w-3xl rounded-[2rem] bg-[#071024] p-6 shadow-glass" initial={{ scale: 0.96 }} animate={{ scale: 1 }} exit={{ scale: 0.96 }}><div className="flex items-start justify-between"><div><h2 className="text-2xl font-black text-white">{application.fullName}</h2><p className="mt-1 text-slate-400">{application.jobTitle}</p></div><button onClick={onClose} className="text-slate-400"><X /></button></div><div className="mt-6 grid gap-4 sm:grid-cols-2">{[['Email', application.email], ['Mobile', application.mobile], ['Location', application.currentLocation], ['Total Experience', application.totalExperience], ['Relevant Experience', application.relevantExperience], ['Current Company', application.currentCompany], ['Current CTC', application.currentCTC], ['Expected CTC', application.expectedCTC], ['Notice Period', application.noticePeriod], ['LinkedIn', application.linkedinUrl], ['Portfolio', application.portfolioUrl], ['Status', application.status]].map(([label, value]) => <div key={label} className="rounded-2xl bg-white/[0.05] p-4"><p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">{label}</p><p className="mt-2 break-words font-bold text-white">{value || '-'}</p></div>)}<div className="rounded-2xl bg-white/[0.05] p-4 sm:col-span-2"><p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">Cover Letter</p><p className="mt-2 whitespace-pre-line leading-7 text-slate-300">{application.coverLetter || '-'}</p></div></div></motion.div></motion.div>}</AnimatePresence>
}

function SkeletonRows() {
  return <div className="grid gap-3">{[1, 2, 3, 4].map((item) => <div key={item} className="h-16 animate-pulse rounded-2xl bg-white/[0.06]" />)}</div>
}

function EmptyState({ action, onAction, title }) {
  return <div className="rounded-2xl border border-dashed border-white/15 p-10 text-center"><p className="font-black text-white">{title}</p>{action && <button onClick={onAction} className="admin-primary-btn mt-5">{action}</button>}</div>
}

function downloadCsv(filename, header, rows) {
  const csv = [header, ...rows].map((row) => row.map((value) => `"${String(value || '').replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

function SettingsPage({ notify }) {
  const [activeTab, setActiveTab] = useState('contact')

  return (
    <div className="grid gap-6">
      <div className="admin-card">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200">Admin Settings</p>
        <h2 className="mt-2 text-3xl font-black text-white">Settings</h2>
        <p className="mt-2 text-slate-400">Manage website branding, contact information, and social media links from one place.</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            ['branding', 'Logo & Favicon'],
            ['contact', 'Contact Settings'],
            ['social', 'Social Links'],
          ].map(([id, label]) => (
            <button key={id} onClick={() => setActiveTab(id)} className={`rounded-full px-5 py-3 text-sm font-black transition ${activeTab === id ? 'bg-cyan-300 text-slate-950 shadow-cyan' : 'bg-white/[0.06] text-slate-300 hover:bg-white/10'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>
      {activeTab === 'branding' ? (
        <BrandingSettingsPage notify={notify} />
      ) : activeTab === 'contact' ? (
        <ContactSettingsPage notify={notify} embedded />
      ) : (
        <SocialLinksPage notify={notify} embedded />
      )}
    </div>
  )
}

function BrandingSettingsPage({ notify }) {
  const [form, setForm] = useState(defaultContactForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const fetchBranding = async () => {
    setLoading(true)
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      const response = await fetch(`${apiUrl}/api/settings/contact`)
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Unable to load branding settings')
      setForm({ ...defaultContactForm, ...(result.data || {}) })
    } catch (error) {
      notify(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBranding()
  }, [])

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))

  const save = async () => {
    if (form.logoUrl && !isAssetUrl(form.logoUrl)) return notify('Valid logo URL or image upload is required')
    if (form.faviconUrl && !isAssetUrl(form.faviconUrl)) return notify('Valid favicon URL or image upload is required')

    setSaving(true)
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      const response = await fetch(`${apiUrl}/api/admin/settings/contact`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(form),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Unable to save branding settings')
      setForm({ ...defaultContactForm, ...(result.data || {}) })
      notify('Logo and favicon updated')
    } catch (error) {
      notify(error.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="admin-card">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Logo & Favicon</h2>
          <p className="mt-2 max-w-2xl text-slate-400">Upload image files or paste image URLs. Public header, footer, admin logo, and browser favicon update from backend settings.</p>
        </div>
        <button disabled={saving || loading} onClick={save} className="admin-primary-btn justify-center">{saving ? 'Saving...' : 'Save Branding'}</button>
      </div>

      {loading ? (
        <div className="mt-6"><SkeletonRows /></div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <BrandingField
            label="Website Logo"
            onFile={(file) => assetFileToDataUrl(file, (value) => update('logoUrl', value), notify)}
            onUrl={(value) => update('logoUrl', value)}
            previewClassName="h-20 w-44"
            value={form.logoUrl || ''}
          />
          <BrandingField
            label="Favicon"
            onFile={(file) => assetFileToDataUrl(file, (value) => update('faviconUrl', value), notify)}
            onUrl={(value) => update('faviconUrl', value)}
            previewClassName="h-20 w-20"
            value={form.faviconUrl || ''}
          />
        </div>
      )}
    </div>
  )
}

function BrandingField({ label, onFile, onUrl, previewClassName, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
      <p className="text-sm font-black text-slate-200">{label}</p>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className={`${previewClassName} flex shrink-0 items-center justify-center rounded-2xl bg-white p-3`}>
          {value ? <img src={value} alt={label} className="h-full w-full object-contain" /> : <span className="text-xs font-black text-slate-500">No image</span>}
        </div>
        <div className="grid flex-1 gap-3">
          <input className="admin-input" value={value} onChange={(event) => onUrl(event.target.value)} placeholder="https://... or /dhvani-logo.png" />
          <input type="file" accept="image/png,image/jpeg,image/svg+xml,image/x-icon,image/webp" className="admin-input" onChange={(event) => onFile(event.target.files?.[0])} />
        </div>
      </div>
    </div>
  )
}

function ContactSettingsPage({ embedded = false, notify }) {
  const [form, setForm] = useState(defaultContactForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const fetchContact = async () => {
    setLoading(true)
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      const response = await fetch(`${apiUrl}/api/settings/contact`)
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Unable to load contact settings')
      setForm({ ...defaultContactForm, ...(result.data || {}) })
    } catch (error) {
      notify(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContact()
  }, [])

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))

  const save = async () => {
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return notify('Valid company email is required')
    if (!/^[0-9+\-\s()]{7,20}$/.test(form.phone)) return notify('Valid phone number is required')
    if (!form.address.trim()) return notify('Office address is required')
    if (form.googleMapUrl && !/^https?:\/\/.+/i.test(form.googleMapUrl)) return notify('Valid Google Maps URL is required')

    setSaving(true)
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      const response = await fetch(`${apiUrl}/api/admin/settings/contact`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(form),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Unable to save contact settings')
      setForm({ ...defaultContactForm, ...(result.data || {}) })
      notify('Contact settings saved')
    } catch (error) {
      notify(error.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="grid gap-6">
      {!embedded && (
        <div className="admin-card">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200">Website Settings</p>
          <h2 className="mt-2 text-3xl font-black text-white">Contact Settings</h2>
          <p className="mt-2 text-slate-400">Manage company email, phone, address, map URL, sales, and support contact details.</p>
        </div>
      )}
      <div className="admin-card">
        {loading ? <SkeletonRows /> : (
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ['email', 'Company Email'], ['phone', 'Phone Number'], ['supportEmail', 'Support Email'], ['salesEmail', 'Sales Email'], ['googleMapUrl', 'Google Maps Link'],
            ].map(([field, label]) => <FieldBlock key={field} label={label}><input className="admin-input" value={form[field] || ''} onChange={(event) => update(field, event.target.value)} /></FieldBlock>)}
            <FieldBlock label="Office Address" className="sm:col-span-2"><textarea className="admin-input min-h-28 resize-none" value={form.address || ''} onChange={(event) => update('address', event.target.value)} /></FieldBlock>
            <button disabled={saving} onClick={save} className="admin-primary-btn justify-center sm:col-span-2">{saving ? 'Saving...' : 'Save / Update Contact Settings'}</button>
          </div>
        )}
      </div>
    </div>
  )
}

function SocialLinksPage({ embedded = false, notify }) {
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingLink, setEditingLink] = useState(null)

  const fetchLinks = async () => {
    setLoading(true)
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      const response = await fetch(`${apiUrl}/api/admin/settings/social-links`, { headers: authHeaders() })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Unable to load social links')
      setLinks(result.data || [])
    } catch (error) {
      notify(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLinks()
  }, [])

  const openModal = (link = null) => {
    setEditingLink(link)
    setModalOpen(true)
  }

  const updateStatus = async (link, status) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      const response = await fetch(`${apiUrl}/api/admin/settings/social-links/${link._id}/status`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({ status }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Unable to update social link')
      notify('Social link status updated')
      fetchLinks()
    } catch (error) {
      notify(error.message)
    }
  }

  const deleteLink = async (link) => {
    if (!window.confirm(`Delete ${link.platformName}?`)) return
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      const response = await fetch(`${apiUrl}/api/admin/settings/social-links/${link._id}`, { method: 'DELETE', headers: authHeaders() })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Unable to delete social link')
      notify('Social link deleted')
      fetchLinks()
    } catch (error) {
      notify(error.message)
    }
  }

  return (
    <div className="grid gap-6">
      <div className="admin-card">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            {!embedded && <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200">Website Settings</p>}
            <h2 className={`${embedded ? 'text-2xl' : 'mt-2 text-3xl'} font-black text-white`}>Social Links</h2>
            <p className="mt-2 text-slate-400">Add, edit, sort, enable, disable, and delete public website social media links.</p>
          </div>
          <button onClick={() => openModal()} className="admin-primary-btn"><Plus size={16} /> Add Social Link</button>
        </div>
      </div>
      <div className="admin-card overflow-x-auto">
        {loading ? <SkeletonRows /> : links.length ? (
          <table className="w-full min-w-[850px] text-left">
            <thead><tr className="border-b border-white/10 text-xs uppercase tracking-[0.18em] text-slate-500">{['Order', 'Platform', 'Icon', 'URL', 'Status', 'Updated', 'Actions'].map((head) => <th key={head} className="px-4 py-4">{head}</th>)}</tr></thead>
            <tbody>{links.map((link) => (
              <tr key={link._id} className="border-b border-white/5 text-sm font-semibold text-slate-300 hover:bg-white/[0.035]">
                <td className="px-4 py-4">{link.sortOrder}</td>
                <td className="px-4 py-4 font-black text-white">{link.platformName}</td>
                <td className="px-4 py-4">{link.iconName}</td>
                <td className="max-w-xs truncate px-4 py-4">{link.profileUrl}</td>
                <td className="px-4 py-4"><select value={link.status} onChange={(event) => updateStatus(link, event.target.value)} className={`rounded-full px-3 py-1 text-xs font-black outline-none ${statusStyles[link.status] || statusStyles.Pending}`}>{['Active', 'Inactive'].map((item) => <option key={item} className="bg-[#071024] text-white">{item}</option>)}</select></td>
                <td className="px-4 py-4">{formatDate(link.updatedAt)}</td>
                <td className="px-4 py-4"><div className="flex gap-2"><button className="table-icon" onClick={() => openModal(link)}><Edit3 size={15} /></button><button className="table-icon text-rose-300" onClick={() => deleteLink(link)}><Trash2 size={15} /></button></div></td>
              </tr>
            ))}</tbody>
          </table>
        ) : <EmptyState title="No social links found" action="Add Social Link" onAction={() => openModal()} />}
      </div>
      <SocialLinkModal editingLink={editingLink} isOpen={modalOpen} notify={notify} onClose={() => setModalOpen(false)} onSaved={fetchLinks} />
    </div>
  )
}

function SocialLinkModal({ editingLink, isOpen, notify, onClose, onSaved }) {
  const [form, setForm] = useState(defaultSocialForm)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isOpen) setForm(editingLink ? { ...defaultSocialForm, ...editingLink } : defaultSocialForm)
  }, [editingLink, isOpen])

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))

  const save = async () => {
    if (!form.platformName.trim()) return notify('Platform name is required')
    if (!/^https?:\/\/.+/i.test(form.profileUrl)) return notify('Valid profile URL is required')
    setSaving(true)
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      const isUpdate = Boolean(editingLink?._id)
      const response = await fetch(isUpdate ? `${apiUrl}/api/admin/settings/social-links/${editingLink._id}` : `${apiUrl}/api/admin/settings/social-links`, {
        method: isUpdate ? 'PUT' : 'POST',
        headers: authHeaders(),
        body: JSON.stringify(form),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Unable to save social link')
      notify('Social link saved')
      onSaved()
      onClose()
    } catch (error) {
      notify(error.message)
    } finally {
      setSaving(false)
    }
  }

  return <AnimatePresence>{isOpen && (
    <motion.div className="fixed inset-0 z-[85] grid place-items-center bg-black/65 px-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-[#071024] p-6 shadow-glass" initial={{ scale: 0.96, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 20 }}>
        <div className="flex items-center justify-between"><h2 className="text-2xl font-black text-white">{editingLink ? 'Edit Social Link' : 'Add Social Link'}</h2><button onClick={onClose} className="text-slate-400"><X /></button></div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <FieldBlock label="Platform Name"><select className="admin-input" value={form.platformName} onChange={(event) => update('platformName', event.target.value)}>{socialPlatforms.map((item) => <option key={item} className="bg-[#071024]">{item}</option>)}</select></FieldBlock>
          <FieldBlock label="Icon Name"><select className="admin-input" value={form.iconName} onChange={(event) => update('iconName', event.target.value)}>{socialIconOptions.map((item) => <option key={item} className="bg-[#071024]">{item}</option>)}</select></FieldBlock>
          <FieldBlock label="Profile URL" className="sm:col-span-2"><input className="admin-input" value={form.profileUrl} onChange={(event) => update('profileUrl', event.target.value)} placeholder="https://..." /></FieldBlock>
          <FieldBlock label="Status"><select className="admin-input" value={form.status} onChange={(event) => update('status', event.target.value)}>{['Active', 'Inactive'].map((item) => <option key={item} className="bg-[#071024]">{item}</option>)}</select></FieldBlock>
          <FieldBlock label="Sort Order"><input type="number" className="admin-input" value={form.sortOrder} onChange={(event) => update('sortOrder', Number(event.target.value))} /></FieldBlock>
        </div>
        <button disabled={saving} onClick={save} className="admin-primary-btn mt-6 w-full justify-center">{saving ? 'Saving...' : 'Save Social Link'}</button>
      </motion.div>
    </motion.div>
  )}</AnimatePresence>
}

function LeadDetailModal({ lead, onClose }) {
  return (
    <AnimatePresence>
      {lead && (
        <motion.div className="fixed inset-0 z-[90] grid place-items-center bg-black/60 px-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="w-full max-w-2xl rounded-[2rem] bg-[#071024] p-6 shadow-glass" initial={{ scale: 0.95, y: 18 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 18 }}>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-white">Lead Details</h2>
              <button onClick={onClose} className="text-slate-400"><X /></button>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ['Full Name', lead.fullName],
                ['Registration Type', lead.registrationType || 'enterprise'],
                ['Email', lead.email],
                ['Mobile', lead.mobile],
                ['Company / Profile', lead.companyName],
                ['Service', lead.service],
                ['Budget / Rate', lead.budget],
                ['Status', lead.status],
                ['Source', lead.source],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-white/[0.05] p-4">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">{label}</p>
                  <p className="mt-2 font-bold text-white">{value}</p>
                </div>
              ))}
              <div className="rounded-2xl bg-white/[0.05] p-4 sm:col-span-2">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">Message</p>
                <p className="mt-2 leading-7 text-slate-300">{lead.message}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function UsersPage({ notify }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [role, setRole] = useState('')
  const [status, setStatus] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      const params = new URLSearchParams()
      if (query) params.set('q', query)
      if (role) params.set('role', role)
      if (status) params.set('status', status)
      const response = await fetch(`${apiUrl}/api/users/all?${params.toString()}`, { headers: authHeaders() })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Unable to fetch users')
      setUsers(result.data || [])
    } catch (error) {
      notify(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [role, status])

  const openModal = (user = null) => {
    setEditingUser(user)
    setModalOpen(true)
  }

  const updateStatus = async (user, nextStatus) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      const response = await fetch(`${apiUrl}/api/users/status/${user._id}`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({ status: nextStatus }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Unable to update user')
      notify('User status updated')
      fetchUsers()
    } catch (error) {
      notify(error.message)
    }
  }

  const deleteUser = async (user) => {
    if (!window.confirm(`Delete ${user.name}?`)) return
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      const response = await fetch(`${apiUrl}/api/users/delete/${user._id}`, { method: 'DELETE', headers: authHeaders() })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Unable to delete user')
      notify('User deleted')
      fetchUsers()
    } catch (error) {
      notify(error.message)
    }
  }

  return (
    <div className="grid gap-6">
      <div className="admin-card">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200">Access Control</p>
            <h2 className="mt-2 text-3xl font-black text-white">User Management</h2>
            <p className="mt-2 text-slate-400">Create and manage Admin, Manager, Vendor, and QC Team users from backend API.</p>
          </div>
          <button onClick={() => openModal()} className="admin-primary-btn"><Plus size={16} /> Add User</button>
        </div>
      </div>

      <div className="admin-card">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-4 py-3">
            <Search size={17} className="text-slate-500" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && fetchUsers()} className="w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-slate-500" placeholder="Search name, email, role..." />
          </div>
          <select value={role} onChange={(event) => setRole(event.target.value)} className="admin-input">
            <option value="" className="bg-[#071024]">All Roles</option>
            {['Admin', 'Manager', 'Vendor', 'QC Team'].map((item) => <option key={item} className="bg-[#071024]">{item}</option>)}
          </select>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="admin-input">
            <option value="" className="bg-[#071024]">All Status</option>
            {['Active', 'Inactive'].map((item) => <option key={item} className="bg-[#071024]">{item}</option>)}
          </select>
          <button onClick={fetchUsers} className="admin-primary-btn justify-center">Search</button>
        </div>

        <div className="mt-6 overflow-x-auto">
          {loading ? <SkeletonRows /> : users.length ? (
            <table className="w-full min-w-[850px] text-left">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-[0.18em] text-slate-500">
                  {['Name', 'Email', 'Role', 'Status', 'Updated', 'Actions'].map((head) => <th key={head} className="px-4 py-4">{head}</th>)}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b border-white/5 text-sm font-semibold text-slate-300 hover:bg-white/[0.035]">
                    <td className="px-4 py-4 font-black text-white">{user.name}</td>
                    <td className="px-4 py-4">{user.email}</td>
                    <td className="px-4 py-4">{user.role}</td>
                    <td className="px-4 py-4">
                      <select value={user.status} onChange={(event) => updateStatus(user, event.target.value)} className={`rounded-full px-3 py-1 text-xs font-black outline-none ${statusStyles[user.status] || statusStyles.Pending}`}>
                        {['Active', 'Inactive'].map((item) => <option key={item} className="bg-[#071024] text-white">{item}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-4">{formatDate(user.updatedAt)}</td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button className="table-icon" onClick={() => openModal(user)}><Edit3 size={15} /></button>
                        <button className="table-icon text-rose-300" onClick={() => deleteUser(user)}><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <EmptyState title="No users found" action="Add User" onAction={() => openModal()} />}
        </div>
      </div>
      <UserFormModal editingUser={editingUser} isOpen={modalOpen} notify={notify} onClose={() => setModalOpen(false)} onSaved={fetchUsers} />
    </div>
  )
}

function UserFormModal({ editingUser, isOpen, notify, onClose, onSaved }) {
  const [form, setForm] = useState(defaultUserForm)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    setForm(editingUser ? { ...defaultUserForm, ...editingUser, password: '' } : defaultUserForm)
  }, [editingUser, isOpen])

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))

  const save = async () => {
    if (!form.name.trim()) return notify('Name is required')
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return notify('Valid email is required')
    if (!editingUser && !form.password.trim()) return notify('Password is required')

    setSaving(true)
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      const isUpdate = Boolean(editingUser?._id)
      const payload = { ...form }
      if (isUpdate && !payload.password) delete payload.password
      const response = await fetch(isUpdate ? `${apiUrl}/api/users/update/${editingUser._id}` : `${apiUrl}/api/users/create`, {
        method: isUpdate ? 'PUT' : 'POST',
        headers: authHeaders(),
        body: JSON.stringify(payload),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Unable to save user')
      notify(isUpdate ? 'User updated' : 'User created')
      onSaved()
      onClose()
    } catch (error) {
      notify(error.message)
    } finally {
      setSaving(false)
    }
  }

  return <AnimatePresence>{isOpen && (
    <motion.div className="fixed inset-0 z-[85] grid place-items-center bg-black/65 px-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-[#071024] p-6 shadow-glass" initial={{ scale: 0.96, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 20 }}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-white">{editingUser ? 'Edit User' : 'Add User'}</h2>
          <button onClick={onClose} className="text-slate-400"><X /></button>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <FieldBlock label="Name"><input className="admin-input" value={form.name} onChange={(event) => update('name', event.target.value)} /></FieldBlock>
          <FieldBlock label="Email"><input className="admin-input" value={form.email} onChange={(event) => update('email', event.target.value)} /></FieldBlock>
          <FieldBlock label={editingUser ? 'New Password (optional)' : 'Password'}><input type="password" className="admin-input" value={form.password} onChange={(event) => update('password', event.target.value)} /></FieldBlock>
          <FieldBlock label="Role"><select className="admin-input" value={form.role} onChange={(event) => update('role', event.target.value)}>{['Admin', 'Manager', 'Vendor', 'QC Team'].map((item) => <option key={item} className="bg-[#071024]">{item}</option>)}</select></FieldBlock>
          <FieldBlock label="Status"><select className="admin-input" value={form.status} onChange={(event) => update('status', event.target.value)}>{['Active', 'Inactive'].map((item) => <option key={item} className="bg-[#071024]">{item}</option>)}</select></FieldBlock>
        </div>
        <button disabled={saving} onClick={save} className="admin-primary-btn mt-6 w-full justify-center">{saving ? 'Saving...' : 'Save User'}</button>
      </motion.div>
    </motion.div>
  )}</AnimatePresence>
}

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('admin@dhvani.ai')
  const [password, setPassword] = useState('password')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { contact } = usePublicSettings()

  const submitLogin = async () => {
    setLoading(true)
    setError('')

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Login failed')

      window.localStorage.setItem('dhvaniAdminToken', result.data.token)
      onLogin()
    } catch (loginError) {
      setError(loginError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-[#050816] px-4 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.2),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.22),transparent_32%),linear-gradient(145deg,#050816,#11103a_58%,#030610)]" />
      <motion.div className="relative w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.08] p-7 shadow-glass backdrop-blur-2xl" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <img src={contact.logoUrl || '/dhvani-logo.png'} alt="Dhvani.AI" className="mx-auto h-14 w-32 rounded-xl bg-white object-contain px-3 py-2" />
        <h1 className="mt-8 text-center text-3xl font-black">Admin Control Center</h1>
        <p className="mt-2 text-center text-sm font-semibold text-slate-400">AI data collection, vendor, QC, and project operations.</p>
        <div className="mt-8 grid gap-4">
          <input className="admin-input" placeholder="Email address" value={email} onChange={(event) => setEmail(event.target.value)} />
          <input className="admin-input" placeholder="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && submitLogin()} />
        </div>
        {error && <div className="mt-4 rounded-2xl bg-rose-400/15 p-3 text-sm font-bold text-rose-200">{error}</div>}
        <div className="mt-4 flex items-center justify-between text-sm font-semibold text-slate-400">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="accent-cyan-300" />
            Remember me
          </label>
          <a href="/admin" className="text-cyan-200">Forgot password?</a>
        </div>
        <button disabled={loading} onClick={submitLogin} className="mt-7 w-full rounded-full bg-cyan-300 px-6 py-4 font-black text-slate-950 shadow-cyan transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70">
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </motion.div>
    </div>
  )
}

function Sidebar({ activePage, onLogout, setActivePage, setSidebarOpen, sidebarOpen }) {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-white/10 bg-[#071024]/90 p-4 shadow-glass backdrop-blur-2xl lg:block">
        <SidebarContent activePage={activePage} onLogout={onLogout} setActivePage={setActivePage} />
      </aside>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside className="fixed inset-y-0 left-0 z-50 w-80 max-w-[86vw] border-r border-white/10 bg-[#071024] p-4 shadow-glass lg:hidden" initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}>
            <button className="absolute right-4 top-4 text-white" onClick={() => setSidebarOpen(false)}>
              <X />
            </button>
            <SidebarContent activePage={activePage} onLogout={onLogout} setActivePage={setActivePage} setSidebarOpen={setSidebarOpen} />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

function SidebarContent({ activePage, onLogout, setActivePage, setSidebarOpen }) {
  const { contact } = usePublicSettings()

  return (
    <div className="flex h-full flex-col">
      <img src={contact.logoUrl || '/dhvani-logo.png'} alt="Dhvani.AI" className="h-12 w-28 rounded-xl bg-