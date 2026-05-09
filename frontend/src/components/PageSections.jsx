import { motion } from 'framer-motion'
import { ArrowRight, Facebook, Github, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone, Send, Twitter, Youtube } from 'lucide-react'
import { serviceCards, stats, trustedLogos } from '../data/siteData.jsx'
import { usePublicSettings } from '../hooks/usePublicSettings.js'

const footerColumns = [
  {
    title: 'Services',
    links: ['AI Data Collection', 'Voice AI Agents', 'Multilingual Training', 'Cloud Services'],
  },
  {
    title: 'Industries',
    links: ['Healthcare', 'Finance', 'Education', 'Ecommerce'],
  },
  {
    title: 'Solutions',
    links: ['Digital Transformation', 'AI Automation', 'CRM Integration', 'Data Engineering'],
  },
  {
    title: 'About Us',
    links: [
      { label: 'Company Overview', href: '/company-overview' },
      { label: 'Our Story', href: '/our-story' },
      { label: 'Leadership', href: '/leadership' },
      { label: 'Mission & Vision', href: '/mission-and-vision' },
      { label: 'Why Choose Us', href: '/why-choose-us' },
      { label: 'Partner With Us', href: '/partner-with-us' },
    ],
  },
  {
    title: 'Resources',
    links: ['Insights', 'Case Studies', 'Documentation', 'Security'],
  },
  {
    title: 'Careers',
    links: [
      { label: 'Current Openings', href: '/careers/current-openings' },
      'DC Team Hiring',
      { label: 'Vendor Onboarding', href: '/vendor-onboarding' },
      { label: 'Freelance Opportunities', href: '/freelance-opportunities' },
      { label: 'Internship Program', href: '/internship-program' },
      { label: 'Apply Now', href: '/careers/current-openings' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms-and-conditions' },
      { label: 'Security', href: '/security' },
      { label: 'Cookies Policy', href: '/cookies-policy' },
    ],
  },
]

const socialIcons = { Facebook, Github, Instagram, Linkedin, MessageCircle, Send, Twitter, Youtube }
const footerHrefMap = {
  Security: '/security',
  'Cloud Services': '/service/cloud-services',
  Ecommerce: '/service/ecommerce',
}

const footerParticles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${(index * 41) % 100}%`,
  top: `${(index * 29) % 100}%`,
  delay: (index % 6) * 0.4,
}))

export function StatsSection() {
  return (
    <section id="platform" className="relative border-y border-white/10 bg-[#071024] py-14">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map(([value, label]) => (
          <motion.div key={label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-glass backdrop-blur-xl" whileHover={{ y: -6 }}>
            <p className="text-4xl font-black text-white">{value}</p>
            <p className="mt-2 font-semibold text-slate-400">{label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function TrustedSection() {
  return (
    <section id="clients" className="bg-[#050816] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-bold uppercase tracking-[0.28em] text-slate-500">Trusted by innovation teams and enterprise operators</p>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {trustedLogos.map((logo) => (
            <div key={logo} className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-5 text-center text-lg font-black tracking-[0.18em] text-slate-300 shadow-glass transition hover:border-cyan-300/30 hover:text-cyan-100">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ServicesSection() {
  return (
    <section id="services" className="relative bg-[#071024] py-20">
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="section-kicker">Enterprise Services</p>
          <h2 className="text-4xl font-black leading-tight text-white sm:text-5xl">AI, cloud, CRM, and automation delivered as one technology engine.</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {serviceCards.map(({ icon: Icon, title, text }) => (
            <motion.article key={title} className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-glass backdrop-blur-xl" whileHover={{ y: -8, scale: 1.01 }}>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300 text-slate-950 shadow-cyan">
                <Icon size={22} />
              </div>
              <h3 className="text-xl font-black text-white">{title}</h3>
              <p className="mt-3 leading-7 text-slate-400">{text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EnterpriseFooter({ onContactClick }) {
  const { contact, socialLinks } = usePublicSettings()

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-white/10 bg-[#02050d]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="absolute bottom-20 right-0 h-96 w-96 rounded-full bg-purple-500/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.12),transparent_34%),linear-gradient(180deg,#02050d,#071024_48%,#02050d)]" />
        {footerParticles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute h-1 w-1 rounded-full bg-cyan-200/60 shadow-[0_0_18px_rgba(103,232,249,0.9)]"
            style={{ left: particle.left, top: particle.top }}
            animate={{ y: [-8, 14, -8], opacity: [0.15, 0.85, 0.15], scale: [0.8, 1.35, 0.8] }}
            transition={{ duration: 5.5, repeat: Infinity, delay: particle.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <motion.div
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-glass backdrop-blur-2xl sm:p-10 lg:p-12"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-cyan-300/15 blur-3xl" />
          <div className="absolute -bottom-28 left-10 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="section-kicker">Enterprise AI Partnership</p>
              <h2 className="max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">Let's Build The Future With AI</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                Transform data, cloud, CRM, automation, and multilingual AI into a secure enterprise technology advantage.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <button type="button" onClick={onContactClick} className="group inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-4 font-black text-slate-950 shadow-cyan transition hover:-translate-y-0.5 hover:bg-white">
                Contact Us
                <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </button>
              <button type="button" onClick={onContactClick} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-4 font-bold text-white shadow-glass backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-cyan-300/45 hover:bg-white/15">
                Get Started
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-10 py-16 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <motion.div
            className="rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-6 shadow-glass backdrop-blur-xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
          >
            <img src={contact.logoUrl || '/dhvani-logo.png'} alt="Dhvani.AI" className="h-12 w-32 rounded-lg bg-white object-contain px-2 py-1" />
            <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-slate-200">
              Dhvani.AI is an enterprise AI, data collection, automation, and technology services company building intelligent systems for modern organizations.
            </p>
            <p className="mt-4 text-sm font-bold uppercase tracking-[0.24em] text-cyan-200">AI/Data Collection/Technology Company</p>

            <div className="mt-7 flex flex-wrap gap-3">
              {socialLinks.map(({ iconName, platformName, profileUrl }) => {
                const Icon = socialIcons[iconName] || Linkedin
                return (
                <a key={platformName} href={profileUrl} target="_blank" rel="noreferrer" aria-label={platformName} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-300 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-cyan-300 hover:text-slate-950 hover:shadow-cyan">
                  <Icon size={18} />
                </a>
                )
              })}
            </div>

            <div className="mt-8 grid gap-4 text-sm font-semibold text-slate-300">
              <ContactLine href={`mailto:${contact.email}`} icon={Mail} text={contact.email} />
              <ContactLine href={`tel:${contact.phone}`} icon={Phone} text={contact.phone} />
              <ContactLine href={contact.googleMapUrl} icon={MapPin} text={contact.address} />
            </div>
          </motion.div>

          <motion.div
            className="rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-6 shadow-glass backdrop-blur-xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {footerColumns.map((column) => (
                <div key={column.title}>
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">{column.title}</h3>
                  <div className="mt-4 grid gap-3">
                    {column.links.map((link) => {
                      const label = typeof link === 'string' ? link : link.label
                      const href = typeof link === 'string' ? footerHref(link) : link.href
                      return (
                      <a key={label} href={href} className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-cyan-200">
                        <span className="h-px w-0 bg-cyan-300 transition-all group-hover:w-5" />
                        {label}
                      </a>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-transparent bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.65),rgba(168,85,247,0.65),transparent)] bg-[length:100%_1px] bg-top bg-no-repeat py-7">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm font-semibold text-slate-500 lg:flex-row">
            <p>Copyright 2026 Dhvani.AI. All rights reserved.</p>
            <p className="text-slate-400">Powered by Cromgen Technology</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="/privacy-policy" className="transition hover:text-cyan-200">Privacy Policy</a>
              <a href="/terms-and-conditions" className="transition hover:text-cyan-200">Terms & Conditions</a>
              <a href="/security" className="transition hover:text-cyan-200">Security</a>
              <a href="/cookies-policy" className="transition hover:text-cyan-200">Cookies Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function footerHref(label) {
  if (footerHrefMap[label]) return footerHrefMap[label]
  return `/service/${label.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`
}

function ContactLine({ href, icon: Icon, text }) {
  const content = (
    <>
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
        <Icon size={17} />
      </span>
      <span className="leading-7">{text}</span>
    </>
  )

  if (href) {
    return <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} className="flex items-start gap-3 transition hover:text-cyan-200">{content}</a>
  }

  return (
    <div className="flex items-start gap-3">
      {conte