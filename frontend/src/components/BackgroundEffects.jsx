import { motion } from 'framer-motion'

export function GradientBackdrop() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.22),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(168,85,247,0.24),transparent_34%),radial-gradient(circle_at_50%_80%,rgba(37,99,235,0.24),transparent_32%),linear-gradient(145deg,#050816_0%,#081226_42%,#11103a_70%,#050816_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
      <div className="absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-300/10 blur-3xl" />
    </>
  )
}

export function ParticleField({ particles }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute h-1 w-1 rounded-full bg-cyan-200/70 shadow-[0_0_18px_rgba(103,232,249,0.95)]"
          style={{ left: particle.left, top: particle.top }}
          animate={{ y: [-10, 18, -10], opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.4, 0.8] }}
          transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
