import { motion } from 'framer-motion'
import { Facebook, Github, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone, Send, Twitter, Youtube } from 'lucide-react'
import { usePublicSettings } from '../hooks/usePublicSettings.js'

const socialIcons = { Facebook, Github, Instagram, Linkedin, MessageCircle, Send, Twitter, Youtube }

function ContactPage({ onContactClick }) {
  const { contact, loading, socialLinks } = usePublicSettings()

  return (
    <main className="relative min-h-screen overflow-hidden pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,0.2),transparent_30%),radial-gradient(circle_at_82%_14%,rgba(168,85,247,0.22),transparent_34%),linear-gradient(180deg,#050816,#071024_48%,#050816)]" />
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <motion.div className="max-w-4xl" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <p className="mb-4 text-sm font-bold text-slate-400">Home / Contact Us</p>
          <h1 className="text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">Contact Us</h1>
          <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-300">Connect with Dhvani.AI for AI data, technology, vendor, career, sales, or support inquiries.</p>
        </motion.div>
      </section>

      <section className="relative mx-auto grid max-w-7xl gap-6 px-4 pb-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-glass backdrop-blur-xl">
          <h2 className="text-2xl font-black text-white">Company Contact</h2>
          {loading ? (
            <div className="mt-6 grid gap-4">{[1, 2, 3].map((item) => <div key={item} className="h-16 animate-pulse rounded-2xl bg-white/10" />)}</div>
          ) : (
            <div className="mt-6 grid gap-4">
              <ContactCard href={`mailto:${contact.email}`} icon={Mail} label="Email" value={contact.email} />
              <ContactCard href={`tel:${contact.phone}`} icon={Phone} label="Phone" value={contact.phone} />
              <ContactCard href={contact.googleMapUrl} icon={MapPin} label="Office Address" value={contact.address} />
              <ContactCard href={`mailto:${contact.supportEmail}`} icon={Mail} label="Support Email" value={contact.supportEmail} />
              <ContactCard href={`mailto:${contact.salesEmail}`} icon={Mail} label="Sales Email" value={contact.salesEmail} />
            </div>
          )}
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-glass backdrop-blur-xl">
          <h2 className="text-2xl font-black text-white">Social Links</h2>
          {socialLinks.length ? (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {socialLinks.map(({ iconName, platformName, profileUrl }) => {
                const Icon = socialIcons[iconName] || Linkedin
                return (
                  <a key={platformName} href={profileUrl} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl bg-white/[0.055] p-4 font-black text-white transition hover:bg-cyan-300 hover:text-slate-950">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-300/10"><Icon size={20} /></span>
                    {platformName}
                  </a>
                )
              })}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-white/15 p-8 text-center font-bold text-slate-400">No active social links.</div>
          )}
          <button onClick={onContactClick} className="mt-8 w-full rounded-full bg-cyan-300 px-6 py-4 font-black text-slate-950 shadow-cyan transition hover:bg-white">Send Inquiry</button>
        </div>
      </section>
    </main>
  )
}

function ContactCard({ href, icon: Icon, label, value }) {
  if (!value) return null
  return (
    <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noreferrer' : undefined} className="flex items-start gap-4 rounded-2xl bg-white/[0.055] p-4 transition hover:bg-white/[0.09]">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-200"><Icon size={20} /></span>
      <span>
        <span className="block text-xs font-black uppercase tracking-[0.18em] text-cyan-200">{label}</span>
        <span className="mt-2 block break-words font-bold text-white">{value}</span>
      </span>
    </a>
  )
}

export default ContactPage
