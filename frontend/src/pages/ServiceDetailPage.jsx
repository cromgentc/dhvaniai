import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import { slugify } from '../data/siteData.jsx'

const highlights = ['Enterprise-ready delivery', 'Dedicated project workflow', 'Quality validation included', 'Scalable team support']

function ServiceDetailPage({ service, services }) {
  const Icon = service.icon || Sparkles
  const relatedServices = services.filter((item) => item.category === service.category && item.slug !== service.slug).slice(0, 6)

  return (
    <main className="relative min-h-screen overflow-hidden pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_84%_18%,rgba(168,85,247,0.2),transparent_34%),linear-gradient(180deg,#050816,#071024_48%,#050816)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] opacity-70" />

      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <a href="/" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-black text-cyan-200 transition hover:bg-cyan-300 hover:text-slate-950">
          <ArrowLeft size={16} />
          Back to home
        </a>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.78fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-black text-cyan-100">
              <Sparkles size={16} className="text-cyan-300" />
              {service.category} / {service.group}
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-tight text-white sm:text-6xl">{service.label}</h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-300">{service.description}</p>
            <p className="mt-4 max-w-2xl leading-8 text-slate-500">
              Dhvani.AI delivers {service.label.toLowerCase()} with enterprise process design, trained operators, quality review, reporting, and technology support for production-ready outcomes.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="mailto:hello@dhvani.ai" className="group inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-4 font-black text-slate-950 shadow-cyan transition hover:-translate-y-0.5 hover:bg-white">
                Get Quote
                <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </a>
              <a href="/service/ai-data-collection" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-4 font-black text-white transition hover:border-cyan-300/45 hover:bg-white/15">
                Explore Services
              </a>
            </div>
          </motion.div>

          <motion.div className="relative rounded-[2rem] bg-[#071024] p-6 shadow-glass" initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-cyan-200 to-purple-400 text-slate-950 shadow-cyan">
              <Icon size={42} />
            </div>
            <h2 className="relative mt-8 text-3xl font-black text-white">What you get</h2>
            <div className="relative mt-6 grid gap-4">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/[0.055] px-4 py-4 text-slate-200">
                  <CheckCircle2 size={19} className="text-cyan-300" />
                  <span className="font-bold">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white/[0.045] p-6 shadow-glass">
          <h2 className="text-3xl font-black text-white">Related {service.category}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((item) => {
              const RelatedIcon = item.icon || Sparkles
              return (
                <a key={item.slug} href={`/service/${slugify(item.label)}`} className="group rounded-2xl bg-[#071024] p-5 transition hover:-translate-y-1 hover:bg-cyan-300/10 hover:shadow-neon">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-cyan-200 transition group-hover:bg-cyan-300 group-hover:text-slate-950">
                      <RelatedIcon size={18} />
                    </span>
                    <span className="font-black text-white">{item.label}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-500">{item.description}</p>
                </a>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

export default ServiceDetailPage
