import { motion } from 'framer-motion'
import { ArrowRight, BriefcaseBusiness, CheckCircle2, Sparkles, UserRoundPlus, UsersRound } from 'lucide-react'

function CareerPage({ onRegisterClick, page }) {
  return (
    <main className="relative min-h-screen overflow-hidden pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(34,211,238,0.2),transparent_30%),radial-gradient(circle_at_84%_18%,rgba(168,85,247,0.2),transparent_34%),linear-gradient(180deg,#050816,#071024_48%,#050816)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] opacity-60" />

      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <motion.div className="max-w-4xl" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-black text-cyan-100">
            <Sparkles size={16} className="text-cyan-300" />
            {page.eyebrow}
          </div>
          <p className="mb-4 text-sm font-bold text-slate-400">Home / Careers / {page.title}</p>
          <h1 className="text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">{page.title}</h1>
          <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-300">{page.subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="mailto:hello@dhvani.ai" className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-4 font-black text-slate-950 shadow-cyan transition hover:bg-white">
              Apply Now
              <ArrowRight size={18} />
            </a>
            <a href="/careers/current-openings" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-4 font-black text-white transition hover:bg-white/15">
              View Openings
            </a>
          </div>
        </motion.div>
      </section>

      <section className="relative mx-auto grid max-w-7xl gap-8 px-4 pb-20 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
        <motion.aside className="rounded-[1.75rem] bg-[#071024] p-6 shadow-glass lg:sticky lg:top-28 lg:self-start" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-300 text-slate-950 shadow-cyan">
            <BriefcaseBusiness size={26} />
          </div>
          <h2 className="mt-6 text-2xl font-black text-white">Key Highlights</h2>
          <div className="mt-5 grid gap-3">
            {page.highlights.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/[0.055] px-4 py-3 text-sm font-bold text-slate-200">
                <CheckCircle2 size={17} className="text-cyan-300" />
                {item}
              </div>
            ))}
          </div>
        </motion.aside>

        <div className="grid gap-5">
          {page.sections.map(([title, text], index) => (
            <motion.article key={title} className="rounded-[1.5rem] bg-white/[0.055] p-6 shadow-glass backdrop-blur-xl" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.04 }}>
              <h2 className="text-2xl font-black text-white">{title}</h2>
              <p className="mt-3 leading-8 text-slate-400">{text}</p>
            </motion.article>
          ))}

          <div className="rounded-[2rem] bg-gradient-to-br from-cyan-300/15 via-purple-500/15 to-white/[0.04] p-7 shadow-glass">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="text-3xl font-black text-white">Ready to connect with Dhvani.AI?</h2>
                <p className="mt-3 leading-7 text-slate-300">Send your profile, vendor details, or internship interest. Our team will review and respond.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={() => onRegisterClick('vendor')} className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-4 font-black text-slate-950 shadow-cyan transition hover:bg-white">
                  <UsersRound size={18} />
                  Vendor Register
                </button>
                <button type="button" onClick={() => onRegisterClick('freelancer')} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-4 font-black text-white transition hover:bg-white/15">
                  <UserRoundPlus size={18} />
                  Freelancer Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default CareerPage
