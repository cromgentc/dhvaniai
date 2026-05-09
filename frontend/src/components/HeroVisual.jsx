import { motion } from 'framer-motion'
import { CheckCircle2, Zap } from 'lucide-react'

function HeroVisual({ active }) {
  const Icon = active.icon

  return (
    <div className="relative z-10 mx-auto w-full max-w-md lg:max-w-lg">
      <motion.div className="absolute -right-8 -top-10 h-44 w-44 rounded-full bg-cyan-300/20 blur-3xl" animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.8, 0.45] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="relative rounded-[1.5rem] border border-white/15 bg-white/[0.08] p-3 shadow-glass backdrop-blur-2xl" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
        <div className="relative overflow-hidden rounded-[1.2rem] border border-white/10 bg-[#071225]/90 p-5">
          <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${active.accent}`} />
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-purple-500/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-200">AI Command Center</p>
              <h2 className="mt-2 text-xl font-black text-white">Dhvani Intelligence Cloud</h2>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300 text-slate-950 shadow-cyan">
              <Icon size={24} />
            </div>
          </div>

          <motion.div className="relative mx-auto mt-7 flex aspect-square max-w-[19rem] items-center justify-center rounded-full border border-cyan-200/20 bg-gradient-to-br from-white/10 to-white/[0.02]" animate={{ rotate: 360 }} transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}>
            <div className="absolute inset-7 rounded-full border border-dashed border-cyan-200/25" />
            <div className="absolute inset-16 rounded-full border border-purple-300/25" />
            <motion.div className="flex h-28 w-28 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-cyan-200 to-violet-400 text-slate-950 shadow-cyan" animate={{ rotate: -360 }} transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}>
              <Icon size={42} />
            </motion.div>
          </motion.div>

          <div className="relative mt-6 grid gap-3 sm:grid-cols-2">
            <FloatingCard title="Model Quality" value="99.9%" />
            <FloatingCard title="Automation Lift" value="3.8x" />
          </div>
        </div>
      </motion.div>

      <motion.div className="absolute -left-3 bottom-24 hidden rounded-2xl border border-white/15 bg-white/10 px-4 py-3 shadow-glass backdrop-blur-xl sm:block" animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-400/20 text-purple-100">
            <Zap size={19} />
          </span>
          <div>
            {['API-first', 'Secure cloud', 'Managed delivery'].map((item) => (
              <p key={item} className="flex items-center gap-2 py-0.5 text-sm font-black text-white">
                <CheckCircle2 size={14} className="text-cyan-300" />
                {item}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function FloatingCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-3 backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{title}</p>
      <p className="mt-2 text-2xl font-black text-cyan-200">{value}</p>
    </div>
  )
}

export default HeroVisual
