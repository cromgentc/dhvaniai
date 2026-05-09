import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Facebook, Github, Instagram, Linkedin, Loader2, Mail, MapPin, MessageCircle, Phone, Send, Twitter, X, Youtube } from 'lucide-react'
import { usePublicSettings } from '../hooks/usePublicSettings.js'
import { API_ENDPOINTS } from '../lib/api.js'

const socialIcons = { Facebook, Github, Instagram, Linkedin, MessageCircle, Send, Twitter, Youtube }

const serviceOptions = [
  'AI Data Collection',
  'Data Annotation',
  'Document Collection',
  'Script Recording',
  'Audio Recording',
  'Image Collection',
  'OCR Data Collection',
  'Call Center Services',
  'Digital Marketing',
  'CRM Solutions',
  'Cloud Solutions',
  'Software Development',
  'Website Development',
  'Recruitment Services',
  'BPO Services',
]

const initialForm = {
  registrationType: 'enterprise',
  fullName: '',
  email: '',
  mobile: '',
  companyName: '',
  service: serviceOptions[0],
  budget: '',
  message: '',
  consent: false,
}

const modalCopy = {
  enterprise: {
    eyebrow: 'Enterprise Lead Request',
    title: 'Talk to Dhvani.AI experts',
    description: 'Share your AI data, technology, HR, cloud, CRM, or automation requirement. We will route it to the right team.',
    organizationLabel: 'Company Name',
    organizationPlaceholder: 'Company Pvt Ltd',
    serviceLabel: 'Service Interested In',
    budgetLabel: 'Project Budget',
    messagePlaceholder: 'Tell us about your project, data volume, language, timeline, or technology needs.',
    source: 'Website Contact Modal',
    submitLabel: 'Submit Lead',
  },
  vendor: {
    eyebrow: 'Vendor Registration',
    title: 'Register as a vendor',
    description: 'Share your company, services, capacity, location, and onboarding details. The operations team will review your registration.',
    organizationLabel: 'Company / Agency Name',
    organizationPlaceholder: 'Vendor company name',
    serviceLabel: 'Vendor Service Category',
    budgetLabel: 'Commercial Range',
    messagePlaceholder: 'Tell us your service coverage, team size, languages, monthly capacity, location, and relevant experience.',
    source: 'Vendor Registration Modal',
    submitLabel: 'Submit Vendor Registration',
  },
  freelancer: {
    eyebrow: 'Freelancer Registration',
    title: 'Register as a freelancer',
    description: 'Share your skills, availability, language expertise, and portfolio details. The operations team will review your profile.',
    organizationLabel: 'Portfolio / Profile Name',
    organizationPlaceholder: 'Portfolio, LinkedIn, or profile name',
    serviceLabel: 'Freelance Skill Area',
    budgetLabel: 'Expected Rate / Availability',
    messagePlaceholder: 'Tell us your skills, languages, tools, availability, experience, and portfolio links.',
    source: 'Freelancer Registration Modal',
    submitLabel: 'Submit Freelancer Registration',
  },
}

function ContactModal({ initialType = 'enterprise', isOpen, onClose }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })
  const { contact, socialLinks } = usePublicSettings()

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKeyDown)
      const nextType = modalCopy[initialType] ? initialType : 'enterprise'
      setForm((current) => ({
        ...initialForm,
        registrationType: nextType,
        service: nextType === 'enterprise' ? serviceOptions[0] : nextType === 'vendor' ? 'Vendor Registration' : 'Freelancer Registration',
      }))
      setErrors({})
      setStatus({ type: '', message: '' })
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [initialType, isOpen, onClose])

  const copy = modalCopy[form.registrationType] || modalCopy.enterprise

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  const validate = () => {
    const nextErrors = {}

    if (form.fullName.trim().length < 2) nextErrors.fullName = 'Full name is required.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Valid email is required.'
    if (!/^[0-9+\-\s()]{7,20}$/.test(form.mobile)) nextErrors.mobile = 'Valid mobile number is required.'
    if (!form.companyName.trim()) nextErrors.companyName = `${copy.organizationLabel} is required.`
    if (!form.budget.trim()) nextErrors.budget = `${copy.budgetLabel} is required.`
    if (form.message.trim().length < 10) nextErrors.message = 'Please add at least 10 characters.'
    if (!form.consent) nextErrors.consent = 'Consent is required.'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const submitLead = async (event) => {
    event.preventDefault()
    setStatus({ type: '', message: '' })

    if (!validate()) return

    setLoading(true)

    try {
      const response = await fetch(API_ENDPOINTS.leads.create, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: copy.source }),
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Unable to submit lead.')
      }

      setStatus({ type: 'success', message: 'Thank you. Our team will contact you shortly.' })
      setForm({
        ...initialForm,
        registrationType: form.registrationType,
        service: form.registrationType === 'enterprise' ? serviceOptions[0] : form.registrationType === 'vendor' ? 'Vendor Registration' : 'Freelancer Registration',
      })
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Submission failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-black/70 px-4 py-6 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
          <motion.div
            className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] bg-[#071024] p-5 shadow-glass sm:p-7"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-purple-400" />
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
            <div className="absolute -bottom-24 left-8 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />

            <button className="absolute right-5 top-5 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-cyan-300 hover:text-slate-950" onClick={onClose} aria-label="Close contact modal">
              <X size={20} />
            </button>

            <div className="relative">
              <div className="mb-6 max-w-2xl">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">{copy.eyebrow}</p>
                <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">{copy.title}</h2>
                <p className="mt-3 leading-7 text-slate-400">{copy.description}</p>
                <div className="mt-5 grid gap-2 text-sm font-bold text-slate-300 sm:grid-cols-3">
                  <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 hover:text-cyan-200"><Mail size={15} className="text-cyan-200" /> {contact.email}</a>
                  <a href={`tel:${contact.phone}`} className="inline-flex items-center gap-2 hover:text-cyan-200"><Phone size={15} className="text-cyan-200" /> {contact.phone}</a>
                  <a href={contact.googleMapUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-cyan-200"><MapPin size={15} className="text-cyan-200" /> {contact.address}</a>
                </div>
                {socialLinks.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {socialLinks.map(({ iconName, platformName, profileUrl }) => {
                      const Icon = socialIcons[iconName] || Linkedin
                      return <a key={platformName} href={profileUrl} target="_blank" rel="noreferrer" aria-label={platformName} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-300 transition hover:bg-cyan-300 hover:text-slate-950"><Icon size={16} /></a>
                    })}
                  </div>
                )}
              </div>

              <form className="grid gap-4 sm:grid-cols-2" onSubmit={submitLead}>
                {form.registrationType !== 'enterprise' && (
                  <div className="sm:col-span-2 grid gap-2 rounded-2xl bg-white/[0.045] p-2 sm:grid-cols-2">
                    {['vendor', 'freelancer'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() =>
                          setForm((current) => ({
                            ...current,
                            registrationType: type,
                            service: type === 'vendor' ? 'Vendor Registration' : 'Freelancer Registration',
                          }))
                        }
                        className={`rounded-xl px-4 py-3 text-sm font-black capitalize transition ${form.registrationType === type ? 'bg-cyan-300 text-slate-950' : 'text-slate-300 hover:bg-white/10'}`}
                      >
                        {type} Register
                      </button>
                    ))}
                  </div>
                )}
                <Field error={errors.fullName} label="Full Name">
                  <input className="admin-input" value={form.fullName} onChange={(event) => updateForm('fullName', event.target.value)} placeholder="Your full name" />
                </Field>
                <Field error={errors.email} label="Email Address">
                  <input className="admin-input" value={form.email} onChange={(event) => updateForm('email', event.target.value)} placeholder="you@company.com" />
                </Field>
                <Field error={errors.mobile} label="Mobile Number">
                  <input className="admin-input" value={form.mobile} onChange={(event) => updateForm('mobile', event.target.value)} placeholder="+91 98765 43210" />
                </Field>
                <Field error={errors.companyName} label={copy.organizationLabel}>
                  <input className="admin-input" value={form.companyName} onChange={(event) => updateForm('companyName', event.target.value)} placeholder={copy.organizationPlaceholder} />
                </Field>
                <Field label={copy.serviceLabel}>
                  <select className="admin-input" value={form.service} onChange={(event) => updateForm('service', event.target.value)}>
                    {form.registrationType === 'enterprise' ? (
                      serviceOptions.map((option) => (
                        <option key={option} className="bg-[#071024] text-white">{option}</option>
                      ))
                    ) : (
                      <>
                        <option className="bg-[#071024] text-white">{form.registrationType === 'vendor' ? 'Vendor Registration' : 'Freelancer Registration'}</option>
                        <option className="bg-[#071024] text-white">Data Collection</option>
                        <option className="bg-[#071024] text-white">Data Annotation</option>
                        <option className="bg-[#071024] text-white">Voice / Audio Recording</option>
                        <option className="bg-[#071024] text-white">Translation / Transcription</option>
                        <option className="bg-[#071024] text-white">Recruitment Support</option>
                        <option className="bg-[#071024] text-white">BPO / Call Center Support</option>
                      </>
                    )}
                  </select>
                </Field>
                <Field error={errors.budget} label={copy.budgetLabel}>
                  <input className="admin-input" value={form.budget} onChange={(event) => updateForm('budget', event.target.value)} placeholder={form.registrationType === 'enterprise' ? '$5K - $25K' : 'Rate range, capacity, or availability'} />
                </Field>
                <Field error={errors.message} label="Message" className="sm:col-span-2">
                  <textarea className="admin-input min-h-28 resize-none" value={form.message} onChange={(event) => updateForm('message', event.target.value)} placeholder={copy.messagePlaceholder} />
                </Field>
                <label className="sm:col-span-2 flex items-start gap-3 rounded-2xl bg-white/[0.045] p-4 text-sm font-semibold text-slate-300">
                  <input type="checkbox" checked={form.consent} onChange={(event) => updateForm('consent', event.target.checked)} className="mt-1 accent-cyan-300" />
                  <span>I agree to be contacted by Dhvani.AI about my inquiry and accept the privacy policy.</span>
                </label>
                {errors.consent && <p className="sm:col-span-2 text-sm font-bold text-rose-300">{errors.consent}</p>}
                {status.message && (
                  <div className={`sm:col-span-2 flex items-center gap-3 rounded-2xl p-4 text-sm font-black ${status.type === 'success' ? 'bg-emerald-400/15 text-emerald-200' : 'bg-rose-400/15 text-rose-200'}`}>
                    <CheckCircle2 size={18} />
                    {status.message}
                  </div>
                )}
                <button disabled={loading} className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-4 font-black text-slate-950 shadow-cyan transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70">
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  {loading ? 'Submitting...' : copy.submitLabel}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Field({ children, className = '', error, label }) {
  return (
    <label className={`grid gap-2 ${className}`}>
      <span className="text-sm font-black text-slate-200">{label}</span>
      {children}
      {error && <span className="text-xs font-bold text-rose-300">{error}</span>}
    </label>
  )
}

export default ContactModal
