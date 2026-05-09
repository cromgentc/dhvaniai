import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, BriefcaseBusiness, CalendarDays, CheckCircle2, Clock, DollarSign, FileText, Loader2, MapPin, Search, Send, Sparkles, Users, X } from 'lucide-react'
import { API_BASE_URL } from '../lib/api.js'

const initialFilters = { q: '', department: '', jobType: '', location: '', experienceLevel: '', workMode: '', status: '' }
const initialApplication = {
  fullName: '',
  email: '',
  mobile: '',
  currentLocation: '',
  totalExperience: '',
  relevantExperience: '',
  currentCompany: '',
  currentCTC: '',
  expectedCTC: '',
  noticePeriod: '',
  resumeUrl: '',
  linkedinUrl: '',
  portfolioUrl: '',
  coverLetter: '',
  consent: false,
}

function CurrentOpeningsPage() {
  const [jobs, setJobs] = useState([])
  const [filters, setFilters] = useState(initialFilters)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState('')
  const [selectedJob, setSelectedJob] = useState(null)
  const [applyJob, setApplyJob] = useState(null)

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams(Object.entries(filters).filter(([, value]) => value))
      const response = await fetch(`${API_BASE_URL}/api/jobs/open?${params.toString()}`)
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Unable to fetch jobs')
      setJobs(result.data || [])
    } catch (error) {
      setToast(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const options = useMemo(() => ({
    department: unique(jobs.map((job) => job.department)),
    jobType: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
    location: unique(jobs.map((job) => job.location)),
    experienceLevel: unique(jobs.map((job) => job.experienceLevel)),
    workMode: ['Remote', 'On-site', 'Hybrid'],
    status: ['Open', 'Urgent Hiring'],
  }), [jobs])

  const updateFilter = (field, value) => setFilters((current) => ({ ...current, [field]: value }))
  const notify = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] pt-24 text-white">
      <Hero onViewRoles={() => document.getElementById('open-roles')?.scrollIntoView({ behavior: 'smooth' })} />

      <section id="open-roles" className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="admin-card">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_repeat(3,0.8fr)]">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3">
              <Search size={18} className="text-slate-500" />
              <input value={filters.q} onChange={(event) => updateFilter('q', event.target.value)} onKeyDown={(event) => event.key === 'Enter' && fetchJobs()} className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-500" placeholder="Search by title, skill, location..." />
            </div>
            <FilterSelect label="Department" options={options.department} value={filters.department} onChange={(value) => updateFilter('department', value)} />
            <FilterSelect label="Job Type" options={options.jobType} value={filters.jobType} onChange={(value) => updateFilter('jobType', value)} />
            <FilterSelect label="Location" options={options.location} value={filters.location} onChange={(value) => updateFilter('location', value)} />
            <FilterSelect label="Experience" options={options.experienceLevel} value={filters.experienceLevel} onChange={(value) => updateFilter('experienceLevel', value)} />
            <FilterSelect label="Work Mode" options={options.workMode} value={filters.workMode} onChange={(value) => updateFilter('workMode', value)} />
            <FilterSelect label="Status" options={options.status} value={filters.status} onChange={(value) => updateFilter('status', value)} />
            <div className="flex gap-2">
              <button onClick={fetchJobs} className="admin-primary-btn flex-1 justify-center">Search</button>
              <button onClick={() => { setFilters(initialFilters); window.setTimeout(fetchJobs, 0) }} className="admin-secondary-btn justify-center">Clear</button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5">
          {loading ? (
            [1, 2, 3].map((item) => <div key={item} className="h-72 animate-pulse rounded-[1.5rem] bg-white/[0.06]" />)
          ) : jobs.length ? (
            jobs.map((job, index) => <JobCard key={job._id} job={job} index={index} onApply={setApplyJob} onView={setSelectedJob} />)
          ) : (
            <div className="rounded-[2rem] border border-dashed border-white/15 bg-white/[0.04] p-10 text-center shadow-glass">
              <BriefcaseBusiness className="mx-auto text-cyan-200" size={42} />
              <h2 className="mt-4 text-2xl font-black">No open roles found</h2>
              <p className="mt-2 text-slate-400">Try clearing filters or check back soon for new opportunities.</p>
            </div>
          )}
        </div>
      </section>

      <JobDetailModal job={selectedJob} onApply={setApplyJob} onClose={() => setSelectedJob(null)} />
      <ApplicationModal job={applyJob} notify={notify} onClose={() => setApplyJob(null)} />
      <Toast message={toast} />
    </main>
  )
}

function Hero({ onViewRoles }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(34,211,238,0.22),transparent_30%),radial-gradient(circle_at_78%_12%,rgba(168,85,247,0.26),transparent_34%),linear-gradient(135deg,#050816,#10143f_50%,#050816)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:78px_78px] opacity-60" />
      {[12, 26, 44, 63, 81].map((left, index) => (
        <motion.span key={left} className="absolute h-2 w-2 rounded-full bg-cyan-200/70 shadow-cyan" style={{ left: `${left}%`, top: `${18 + index * 13}%` }} animate={{ y: [0, -18, 0], opacity: [0.35, 1, 0.35] }} transition={{ duration: 3 + index, repeat: Infinity }} />
      ))}
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <motion.div className="max-w-4xl" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-black text-cyan-100">
            <Sparkles size={16} /> Careers
          </div>
          <p className="mb-4 text-sm font-bold text-slate-400">Home / Careers / Current Openings</p>
          <h1 className="text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">Current Openings</h1>
          <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-300">Explore career opportunities and grow with Cromgen Technology</p>
          <button onClick={onViewRoles} className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-4 font-black text-slate-950 shadow-cyan transition hover:bg-white">
            View Open Roles <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

function FilterSelect({ label, onChange, options, value }) {
  return (
    <select value={value} onChange={(event) => onChange(event.target.value)} className="admin-input">
      <option value="" className="bg-[#071024] text-white">{label}</option>
      {options.map((option) => <option key={option} className="bg-[#071024] text-white">{option}</option>)}
    </select>
  )
}

function JobCard({ index, job, onApply, onView }) {
  return (
    <motion.article className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5 shadow-glass backdrop-blur-xl" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }}>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-black ${job.status === 'Urgent Hiring' ? 'bg-rose-400/15 text-rose-200' : 'bg-emerald-400/15 text-emerald-200'}`}>{job.status}</span>
            <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-black text-cyan-200">{job.department}</span>
          </div>
          <h2 className="mt-4 text-2xl font-black text-white">{job.title}</h2>
          <p className="mt-3 leading-7 text-slate-400">{job.shortDescription}</p>
          <div className="mt-5 grid gap-3 text-sm font-bold text-slate-300 sm:grid-cols-2 lg:grid-cols-4">
            <Meta icon={MapPin} text={job.location} />
            <Meta icon={BriefcaseBusiness} text={job.workMode} />
            <Meta icon={Clock} text={`${job.minExperience}-${job.maxExperience} yrs`} />
            <Meta icon={Users} text={`${job.openings} openings`} />
            <Meta icon={FileText} text={job.jobType} />
            <Meta icon={DollarSign} text={salary(job)} />
            <Meta icon={CalendarDays} text={`Deadline ${date(job.applicationDeadline)}`} />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {(job.skills || []).map((skill) => <span key={skill} className="rounded-full bg-white/[0.07] px-3 py-1 text-xs font-black text-slate-300">{skill}</span>)}
          </div>
          <p className="mt-4 text-xs font-bold text-slate-500">Posted {date(job.createdAt)}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
          <button onClick={() => onView(job)} className="admin-secondary-btn justify-center">View Details</button>
          <button onClick={() => onApply(job)} className="admin-primary-btn justify-center">Apply Now</button>
        </div>
      </div>
    </motion.article>
  )
}

function JobDetailModal({ job, onApply, onClose }) {
  return (
    <AnimatePresence>
      {job && (
        <motion.div className="fixed inset-0 z-[90] grid place-items-center overflow-y-auto bg-black/70 px-4 py-6 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="w-full max-w-4xl rounded-[2rem] border border-white/10 bg-[#071024] p-6 shadow-glass" initial={{ scale: 0.96, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 20 }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">{job.department} / {job.workMode}</p>
                <h2 className="mt-2 text-3xl font-black">{job.title}</h2>
                <p className="mt-2 text-slate-400">{job.location} • {job.jobType} • {salary(job)}</p>
              </div>
              <button onClick={onClose} className="text-slate-400"><X /></button>
            </div>
            <div className="mt-6 grid gap-4">
              <Detail title="Full Job Description" value={job.fullDescription} />
              <Detail title="Responsibilities" value={job.responsibilities} />
              <Detail title="Requirements" value={job.requirements} />
              <Detail title="Skills Required" value={(job.skills || []).join(', ')} />
              <Detail title="Education Qualification" value={job.education} />
              <Detail title="Benefits" value={job.benefits} />
              <Detail title="Application Deadline" value={date(job.applicationDeadline)} />
            </div>
            <button onClick={() => { onClose(); onApply(job) }} className="admin-primary-btn mt-6 w-full justify-center">Apply Now</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ApplicationModal({ job, notify, onClose }) {
  const [form, setForm] = useState(initialApplication)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (job) {
      setForm(initialApplication)
      setErrors({})
    }
  }, [job])

  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  const submit = async (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (form.fullName.trim().length < 2) nextErrors.fullName = 'Full name is required.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Valid email is required.'
    if (!/^[0-9+\-\s()]{7,20}$/.test(form.mobile)) nextErrors.mobile = 'Valid mobile number is required.'
    if (!form.currentLocation.trim()) nextErrors.currentLocation = 'Current location is required.'
    if (!form.totalExperience.trim()) nextErrors.totalExperience = 'Total experience is required.'
    if (!form.resumeUrl) nextErrors.resumeUrl = 'Resume upload is required.'
    if (!form.consent) nextErrors.consent = 'Consent is required.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, jobId: job._id }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Unable to submit application')
      notify('Application submitted successfully')
      onClose()
    } catch (error) {
      notify(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {job && (
        <motion.div className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-black/75 px-4 py-6 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.form onSubmit={submit} className="w-full max-w-4xl rounded-[2rem] border border-white/10 bg-[#071024] p-6 shadow-glass" initial={{ scale: 0.96, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 20 }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">Apply for</p>
                <h2 className="mt-2 text-3xl font-black">{job.title}</h2>
              </div>
              <button type="button" onClick={onClose} className="text-slate-400"><X /></button>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ['fullName', 'Full Name'], ['email', 'Email Address'], ['mobile', 'Mobile Number'], ['currentLocation', 'Current Location'],
                ['totalExperience', 'Total Experience'], ['relevantExperience', 'Relevant Experience'], ['currentCompany', 'Current Company'],
                ['currentCTC', 'Current CTC'], ['expectedCTC', 'Expected CTC'], ['noticePeriod', 'Notice Period'],
                ['linkedinUrl', 'LinkedIn Profile URL'], ['portfolioUrl', 'Portfolio / GitHub URL'],
              ].map(([field, label]) => <InputField key={field} error={errors[field]} label={label} value={form[field]} onChange={(value) => update(field, value)} />)}
              <label className="grid gap-2">
                <span className="text-sm font-black text-slate-200">Resume Upload</span>
                <input type="file" accept=".pdf,.doc,.docx" className="admin-input" onChange={(event) => fileToDataUrl(event.target.files?.[0], (value) => update('resumeUrl', value), notify)} />
                {errors.resumeUrl && <span className="text-xs font-bold text-rose-300">{errors.resumeUrl}</span>}
              </label>
              <label className="grid gap-2 sm:col-span-2">
                <span className="text-sm font-black text-slate-200">Message / Cover Letter</span>
                <textarea className="admin-input min-h-28 resize-none" value={form.coverLetter} onChange={(event) => update('coverLetter', event.target.value)} />
              </label>
              <label className="sm:col-span-2 flex items-start gap-3 rounded-2xl bg-white/[0.045] p-4 text-sm font-semibold text-slate-300">
                <input type="checkbox" checked={form.consent} onChange={(event) => update('consent', event.target.checked)} className="mt-1 accent-cyan-300" />
                <span>I agree to be contacted about this application and confirm the information shared is accurate.</span>
              </label>
              {errors.consent && <p className="sm:col-span-2 text-sm font-bold text-rose-300">{errors.consent}</p>}
              <button disabled={loading} className="admin-primary-btn sm:col-span-2 justify-center">
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function InputField({ error, label, onChange, value }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black text-slate-200">{label}</span>
      <input className="admin-input" value={value} onChange={(event) => onChange(event.target.value)} />
      {error && <span className="text-xs font-bold text-rose-300">{error}</span>}
    </label>
  )
}

function Detail({ title, value }) {
  if (!value) return null
  return <div className="rounded-2xl bg-white/[0.05] p-4"><h3 className="font-black text-cyan-100">{title}</h3><p className="mt-2 whitespace-pre-line leading-7 text-slate-300">{value}</p></div>
}

function Meta({ icon: Icon, text }) {
  return <span className="flex items-center gap-2"><Icon size={16} className="text-cyan-200" /> {text}</span>
}

function Toast({ message }) {
  return <AnimatePresence>{message && <motion.div className="fixed bottom-5 right-5 z-[120] rounded-2xl bg-cyan-300 px-5 py-4 font-black text-slate-950 shadow-cyan" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}>{message}</motion.div>}</AnimatePresence>
}

function unique(values) {
  return [...new Set(values.filter(Boolean))]
}

function salary(job) {
  if (!job.salaryMin && !job.salaryMax) return 'Not disclosed'
  return `${Number(job.salaryMin || 0).toLocaleString()} - ${Number(job.salaryMax || 0).toLocaleString()}`
}

function date(value) {
  if (!value) return '-'
  return new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

function fileToDataUrl(file, onDone, notify) {
  if (!file) return
  if (file.size > 6 * 1024 * 1024) {
    notify('Resume must be under 6MB')
    return
  }
  const reader = new FileReader()
  reader.onload = () => onDone(reader.result)
  reader.onerror = () => notify('Unable to read resume file')
  reader.readAsDataURL(file)
}

export default CurrentOpeningsPage
