import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'
import { slides } from '../data/siteData.jsx'
import { GradientBackdrop, ParticleField } from './BackgroundEffects.jsx'
import HeroVisual from './HeroVisual.jsx'

function HeroSlider({ onContactClick }) {
  const [activeSlide, setActiveSlide] = useState(0)
  const active = slides[activeSlide]
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, index) => ({
        id: index,
        left: `${(index * 37) % 100}%`,
        top: `${(index * 53) % 100}%`,
        delay: (index % 7) * 0.35,
        duration: 5 + (index % 5),
      })),
    [],
  )

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 6500)

    return () => window.clearInterval(timer)
  }, [])

  const goToSlide = (direction) => {
    setActiveSlide((current) => (current + direction + slides.length) % slides.length)
  }

  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-24">
      <GradientBackdrop />
      <ParticleField particles={particles} />

      <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-12 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.03fr_0.97fr] lg:px-8">
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div key={active.eyebrow} initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -24, filter: 'blur(8px)' }} transition={{ duration: 0.65, ease: 'easeOut' }}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-white/10 px-4 py-2 text-sm font-bold text-cyan-100 shadow-neon backdrop-blur-xl">
                <Sparkles size={16} className="text-cyan-300" />
                {active.eyebrow}
              </div>
              <h1 className="max-w-4xl text-4xl font-black leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">{active.headline}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">{active.subtitle}</p>
              <p className="mt-4 max-w-2xl leading-7 text-slate-400">{active.description}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={onContactClick} className="group inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-4 font-black text-slate-950 shadow-cyan transition hover:-translate-y-0.5 hover:bg-white">
              {active.ctas[0]}
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </button>
            <a href="/service/ai-data-collection" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-4 font-bold text-white shadow-glass backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-white/15">
              {active.ctas[1]}
            </a>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {active.metrics.map((metric) => (
              <div key={metric} className="rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-4 shadow-glass backdrop-blur-xl">
                <p className="text-sm font-black text-cyan-200">{metric}</p>
              </div>
            ))}
          </div>

          <SliderControls activeSlide={activeSlide} setActiveSlide={setActiveSlide} goToSlide={goToSlide} />
        </div>

        <HeroVisual active={active} />
      </div>
    </section>
  )
}

function SliderControls({ activeSlide, setActiveSlide, goToSlide }) {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-4">
      <div className="flex gap-2">
        <button className="nav-button" onClick={() => goToSlide(-1)} aria-label="Previous slide">
          <ArrowLeft size={18} />
        </button>
        <button className="nav-button" onClick={() => goToSlide(1)} aria-label="Next slide">
          <ArrowRight size={18} />
        </button>
      </div>
      <div className="flex items-center gap-2">
        {slides.map((slide, index) => (
          <button key={slide.eyebrow} className={`h-2.5 rounded-full transition-all ${activeSlide === index ? 'w-10 bg-cyan-300' : 'w-2.5 bg-white/25 hover:bg-white/50'}`} onClick={() => setActiveSlide(index)} aria-label={`Go to slide ${index + 1}`} />
        ))}
      </div>
    </div>
  )
}

export default HeroSlider
