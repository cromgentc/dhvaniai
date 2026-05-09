import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, FileText, LockKeyhole, Mail, ShieldCheck } from 'lucide-react'
import { legalFaqs } from '../data/legalPages.js'
import { API_BASE_URL } from '../lib/api.js'

function LegalPage({ page: staticPage, slug }) {
  const [openFaq, setOpenFaq] = useState(0)
  const [page, setPage] = useState(staticPage || null)
  const [loading, setLoading] = useState(Boolean(slug))
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return

    const fetchPage = async () => {
      setLoading(true)
      setNotFound(false)

      try {
        const response = await fetch(`${API_BASE_URL}/api/legal/${slug}`)
        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.message || 'Legal page not found')
        }

        setPage(toViewPage(result.data))
      } catch {
        setPage(null)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    fetchPage()
  }, [slug])

  const sections = useMemo(() => page?.sections || [], [page])

  if (loading) {
    return (
      <main className="relative min-h-screen overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(34,211,238,0.18),transparent_30%),linear-gradient(180deg,#050816,#071024_46%,#050816)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="h-8 w-52 animate-pulse rounded-full bg-white/10" />
          <div className="mt-8 h-16 max-w-3xl animate-pulse rounded-2xl bg-white/10" />
          <div className="mt-6 h-28 max-w-4xl animate-pulse rounded-2xl bg-white/10" />
          <div className="mt-10 grid gap-5">
            {[1, 2, 3].map((item) => <div key={item} className="h-40 animate-pulse rounded-[1.5rem] bg-white/[0.06]" />)}
          </div>
        </div>
      </main>
    )
  }

  if (notFound || !page) {
    return (
      <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#050816] px-4 pt-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(34,211,238,0.18),transparent_32%),linear-gradient(180deg,#050816,#071024)]" />
        <div className="relative max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-glass">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200">404</p>
          <h1 className="mt-3 text-4xl font-black text-white">Legal page not available</h1>
          <p className="mt-3 leading-7 text-slate-400">This page is not published yet or does not exist.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen overflow-hidden pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_84%_14%,rgba(168,85,247,0.22),transparent_34%),linear-gradient(180deg,#050816,#071024_46%,#050816)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] opacity-60" />

      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <motion.div className="max-w-4xl" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-black text-cyan-100">
            <FileText size={16} className="text-cyan-300" />
            {page.eyebrow}
          </div>
          <p className="mb-4 text-sm font-bold text-slate-400">Home / Legal / {page.title}</p>
          <h1 className="text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">{page.title}</h1>
          <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-300">{page.subtitle}</p>
          <p className="mt-5 inline-flex rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-black text-slate-300">Last updated: {page.updated}</p>
        </motion.div>
      </section>

      <section className="relative mx-auto grid max-w-7xl gap-8 px-4 pb-20 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[1.5rem] bg-[#071024] p-4 shadow-glass">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-cyan-200">Sections</p>
            <nav className="grid max-h-[70vh] gap-1 overflow-y-auto pr-1">
              {sections.map(([title]) => (
                <button key={title} type="button" onClick={() => document.getElementById(sectionId(title))?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="rounded-xl px-3 py-2 text-left text-sm font-bold text-slate-400 transition hover:bg-cyan-300/10 hover:text-cyan-200">
                  {title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <div className="grid gap-5">
          {sections.map(([title, content], index) => (
            <motion.article
              key={title}
              id={sectionId(title)}
              className="scroll-mt-28 rounded-[1.5rem] bg-white/[0.055] p-6 shadow-glass backdrop-blur-xl"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.025, 0.18) }}
            >
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-200">
                  <ShieldCheck size={20} />
                </span>
                <div>
                  <h2 className="text-2xl font-black text-white">{title}</h2>
                  <div className="mt-3 leading-8 text-slate-400" dangerouslySetInnerHTML={{ __html: formatContent(content) }} />
                </div>
              </div>
            </motion.article>
          ))}

          <div className="rounded-[1.5rem] bg-[#071024] p-6 shadow-glass">
            <h2 className="text-3xl font-black text-white">Legal FAQ</h2>
            <div className="mt-5 grid gap-3">
              {legalFaqs.map(([question, answer], index) => (
                <button key={question} className="rounded-2xl bg-white/[0.055] p-4 text-left" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                  <span className="flex items-center justify-between gap-4 font-black text-white">
                    {question}
                    <ChevronDown size={18} className={`shrink-0 text-cyan-200 transition ${openFaq === index ? 'rotate-180' : ''}`} />
                  </span>
                  {openFaq === index && <span className="mt-3 block leading-7 text-slate-400">{answer}</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-cyan-300/15 via-purple-500/15 to-white/[0.04] p-7 shadow-glass">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-300/20 blur-3xl" />
            <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300 text-slate-950">
                  <LockKeyhole size={22} />
                </div>
                <h2 className="text-3xl font-black text-white">Need legal or compliance support?</h2>
                <p className="mt-3 max-w-2xl leading-7 text-slate-300">Our team can help with privacy, security, compliance, vendor, and enterprise project documentation.</p>
              </div>
              <div className="flex flex-col gap-3">
                {page.ctas.map((cta) => (
                  <a key={cta} href="mailto:hello@dhvani.ai" className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-4 font-black text-slate-950 shadow-cyan transition hover:bg-white">
                    {cta}
                    <ArrowRight size={18} />
                  </a>
                ))}
                <a href="mailto:hello@dhvani.ai" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-4 font-black text-white transition hover:bg-white/15">
                  <Mail size={18} />
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function sectionId(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

function toViewPage(page) {
  return {
    title: page.title,
    eyebrow: 'Legal CMS',
    updated: page.updatedAt ? new Date(page.updatedAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recently',
    subtitle: page.shortDescription || page.metaDescription || '',
    ctas: ['Contact Support', 'Request Information'],
    sections: splitContent(page.content),
  }
}

function splitContent(content = '') {
  const lines = String(content).split('\n')
  const sections = []
  let currentTitle = 'Overview'
  let currentBody = []

  lines.forEach((line) => {
    if (line.trim().startsWith('## ')) {
      if (currentBody.join('').trim()) sections.push([currentTitle, currentBody.join('\n')])
      currentTitle = line.replace(/^##\s+/, '').trim()
      currentBody = []
      return
    }
    currentBody.push(line)
  })

  if (currentBody.join('').trim()) sections.push([currentTitle, currentBody.join('\n')])
  return sections.length ? sections : [['Overview', content]]
}

function formatContent(content = '') {
  const hasHtml = /<\/?[a-z][\s\S]*>/i.test(content)
  if (hasHtml) return content

  return String(content)
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, '<br />')}</p>`)
    .join('')
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export default LegalPage
