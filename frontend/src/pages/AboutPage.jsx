import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Linkedin, Network, Sparkles, Users } from 'lucide-react'

function AboutPage({ page }) {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <main className="relative min-h-screen overflow-hidden pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_84%_16%,rgba(168,85,247,0.22),transparent_34%),linear-gradient(180deg,#050816,#071024_48%,#050816)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] opacity-60" />

      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <motion.div className="max-w-4xl" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-black text-cyan-100">
            <Sparkles size={16} className="text-cyan-300" />
            {page.eyebrow}
          </div>
          <p className="mb-4 text-sm font-bold text-slate-400">Home / About Us / {page.title}</p>
          <h1 className="text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">{page.title}</h1>
          <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-300">{page.subtitle}</p>
        </motion.div>
      </section>

      <section className="relative mx-auto grid max-w-7xl gap-8 px-4 pb-20 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[1.5rem] bg-[#071024] p-4 shadow-glass">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-cyan-200">Page Sections</p>
            <nav className="grid gap-1">
              {(page.sections || []).map(([title]) => (
                <button key={title} type="button" onClick={() => document.getElementById(id(title))?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="rounded-xl px-3 py-2 text-left text-sm font-bold text-slate-400 transition hover:bg-cyan-300/10 hover:text-cyan-200">
                  {title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <div className="grid gap-5">
          {page.stats && (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {page.stats.map((stat) => (
                <motion.div key={stat} className="rounded-[1.5rem] bg-white/[0.055] p-5 shadow-glass" whileHover={{ y: -6 }}>
                  <p className="text-2xl font-black text-cyan-200">{stat.split(' ')[0]}</p>
                  <p className="mt-2 font-bold text-slate-300">{stat.split(' ').slice(1).join(' ')}</p>
                </motion.div>
              ))}
            </div>
          )}

          {page.timeline && (
            <div className="rounded-[1.5rem] bg-[#071024] p-6 shadow-glass">
              <h2 className="text-3xl font-black text-white">Milestones Timeline</h2>
              <div className="mt-6 grid gap-4">
                {page.timeline.map(([year, text]) => (
                  <div key={year} className="grid gap-3 rounded-2xl bg-white/[0.055] p-4 sm:grid-cols-[100px_1fr]">
                    <p className="text-2xl font-black text-cyan-200">{year}</p>
                    <p className="leading-7 text-slate-300">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {page.leaders && (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {page.leaders.map(([name, role, text]) => (
                <motion.article key={name} className="rounded-[1.5rem] bg-white/[0.055] p-6 shadow-glass" whileHover={{ y: -8 }}>
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-200 to-purple-400 text-slate-950">
                    <Users size={34} />
                  </div>
                  <h2 className="mt-5 text-xl font-black text-white">{name}</h2>
                  <p className="mt-1 font-bold text-cyan-200">{role}</p>
                  <p className="mt-3 leading-7 text-slate-400">{text}</p>
                  <Linkedin className="mt-5 text-slate-500 transition hover:text-cyan-200" size={20} />
                </motion.article>
              ))}
            </div>
          )}

          {(page.sections || []).map(([title, text], index) => (
            <motion.article key={title} id={id(title)} className="scroll-mt-28 rounded-[1.5rem] bg-white/[0.055] p-6 shadow-glass backdrop-blur-xl" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.035 }}>
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-200">
                  <Network size={20} />
                </span>
                <div>
                  <h2 className="text-2xl font-black text-white">{title}</h2>
                  <p className="mt-3 leading-8 text-slate-400">{text}</p>
                </div>
              </div>
            </motion.article>
          ))}

          {page.cards && (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {page.cards.map((card) => (
                <motion.div key={card} className="rounded-2xl bg-[#071024] p-5 shadow-glass" whileHover={{ y: -5 }}>
                  <p className="text-lg font-black text-white">{card}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">Premium enterprise capability for scalable AI and technology delivery.</p>
                </motion.div>
              ))}
            </div>
          )}

          {page.title === 'Partner With Us' && (
            <div className="rounded-[1.5rem] bg-[#071024] p-6 shadow-glass">
              <h2 className="text-3xl font-black text-white">Partnership FAQ</h2>
              {['How do I become a partner?', 'What documents are needed?', 'How are projects assigned?'].map((question, index) => (
                <button key={question} className="mt-3 w-full rounded-2xl bg-white/[0.055] p-4 text-left" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                  <span className="flex items-center justify-between font-black text-white">{question}<ChevronDown className={`text-cyan-200 transition ${openFaq === index ? 'rotate-180' : ''}`} size={18} /></span>
                  {openFaq === index && <span className="mt-3 block leading-7 text-slate-400">Submit your capability details, complete verification, and our operations team will map suitable project opportunities.</span>}
                </button>
              ))}
            </div>
          )}

          <div className="rounded-[2rem] bg-gradient-to-br from-cyan-300/15 via-purple-500/15 to-white/[0.04] p-7 shadow-glass">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="text-3xl font-black text-white">Ready to work with Dhvani.AI?</h2>
                <p className="mt-3 leading-7 text-slate-300">Connect with our team for AI data, technology, partnerships, recruitment, cloud, CRM, and BPO requirements.</p>
              </div>
              <a href="mailto:hello@dhvani.ai" className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-4 font-black text-slate-950 shadow-cyan transition hover:bg-white">
                Contact Us
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function id(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

export default AboutPage
