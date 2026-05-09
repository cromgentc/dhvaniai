import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Facebook, Github, Instagram, Linkedin, Mail, Menu, MessageCircle, Phone, Send, Twitter, X, Youtube } from 'lucide-react'
import { dropdownIcons, navItems, slugify } from '../data/siteData.jsx'
import { usePublicSettings } from '../hooks/usePublicSettings.js'

const socialIcons = { Facebook, Github, Instagram, Linkedin, MessageCircle, Send, Twitter, Youtube }

function Navbar({ menuOpen, onContactClick, setMenuOpen }) {
  const [activeMenu, setActiveMenu] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const activeItem = navItems.find((item) => item.label === activeMenu)
  const { contact, socialLinks } = usePublicSettings()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled ? 'border-white/10 bg-[#050816]/82 shadow-glass backdrop-blur-2xl' : 'border-white/5 bg-[#050816]/45 backdrop-blur-xl'
      }`}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="hidden border-b border-white/5 bg-white/[0.025] xl:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-xs font-bold text-slate-400 sm:px-6 lg:px-8">
          <div className="flex items-center gap-5">
            <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 hover:text-cyan-200"><Mail size={14} /> {contact.email}</a>
            <a href={`tel:${contact.phone}`} className="inline-flex items-center gap-2 hover:text-cyan-200"><Phone size={14} /> {contact.phone}</a>
          </div>
          <div className="flex items-center gap-2">
            {socialLinks.slice(0, 5).map(({ iconName, platformName, profileUrl }) => {
              const Icon = socialIcons[iconName] || Linkedin
              return <a key={platformName} href={profileUrl} target="_blank" rel="noreferrer" aria-label={platformName} className="rounded-full p-1.5 transition hover:bg-cyan-300 hover:text-slate-950"><Icon size={14} /></a>
            })}
          </div>
        </div>
      </div>
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex shrink-0 items-center gap-3" aria-label="Dhvani.AI home" onMouseEnter={() => setActiveMenu(null)}>
          <img src={contact.logoUrl || '/dhvani-logo.png'} alt="Dhvani.AI" className="h-11 w-20 rounded-xl bg-white/95 object-contain px-2 py-1.5 shadow-glass" />
        </a>

        <div className="hidden items-center justify-center gap-1 xl:flex">
          {navItems.map((item) => (
            <DesktopNavItem key={item.label} activeMenu={activeMenu} item={item} setActiveMenu={setActiveMenu} />
          ))}
        </div>

        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <button type="button" onClick={onContactClick} className="rounded-full border border-cyan-300/20 bg-white/[0.04] px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:border-cyan-300/55 hover:bg-cyan-300/10 hover:shadow-neon">
            Get Quote
          </button>
          <button type="button" onClick={onContactClick} className="group rounded-full bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950 shadow-cyan transition hover:-translate-y-0.5 hover:bg-white">
            <span className="inline-flex items-center gap-2">
              Contact Sales
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </span>
          </button>
        </div>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-glass xl:hidden"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {activeItem?.columns && (
          <div
            className={`absolute left-1/2 top-full hidden -translate-x-1/2 px-2 pb-4 pt-3 xl:block ${
              activeItem.featured ? 'w-[min(calc(100vw-2rem),1040px)]' : 'w-[min(calc(100vw-2rem),960px)]'
            }`}
            onMouseEnter={() => setActiveMenu(activeItem.label)}
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.985 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <MegaDropdown item={activeItem} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>{menuOpen && <MobileDrawer contact={contact} onContactClick={onContactClick} setMenuOpen={setMenuOpen} socialLinks={socialLinks} />}</AnimatePresence>
    </header>
  )
}

function DesktopNavItem({ activeMenu, item, setActiveMenu }) {
  const hasDropdown = Boolean(item.columns)
  const isActive = activeMenu === item.label

  if (!hasDropdown) {
    return (
      <a href={item.href} className="nav-link group" onMouseEnter={() => setActiveMenu(null)}>
        <span>{item.label}</span>
        <span className="nav-underline" />
      </a>
    )
  }

  return (
    <div className="relative" onMouseEnter={() => setActiveMenu(item.label)}>
      <a href={item.href} className={`nav-link group ${isActive ? 'bg-white/10 text-cyan-200' : ''}`}>
        <span>{item.label}</span>
        <ChevronDown size={15} className={`transition ${isActive ? 'rotate-180 text-cyan-200' : 'text-slate-500 group-hover:text-cyan-200'}`} />
        <span className={`nav-underline ${isActive ? 'w-[calc(100%-2rem)] opacity-100' : ''}`} />
      </a>
    </div>
  )
}

function MegaDropdown({ item }) {
  const isServices = item.featured
  const allItems = item.columns.flatMap((column) => column.items)

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] bg-[#071024] p-4 shadow-glass">
      {!isServices && <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/90 to-purple-400/80" />}
      <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-purple-500/14 blur-3xl" />
      <div className="absolute -bottom-24 left-20 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />

      {isServices ? (
        <div className="relative mx-auto max-w-5xl">
          <ServicesMegaGrid items={allItems} />
        </div>
      ) : (
        <div className="relative grid gap-4 lg:grid-cols-[1fr_300px]">
          <div className="grid min-w-0 gap-4 md:grid-cols-2 lg:grid-cols-1">
            {item.columns.map((column, columnIndex) => (
              <div key={column.title} className="min-w-0 rounded-2xl border border-white/10 bg-[#0b1730] p-4">
                <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-cyan-200">{column.title}</p>
                <div className={`grid gap-2 ${allItems.length > 7 ? 'md:grid-cols-2' : ''}`}>
                  {column.items.map((entry, index) => {
                    const Icon = dropdownIcons[(index + columnIndex * 8) % dropdownIcons.length]
                    return <DropdownItem key={entry.label} entry={entry} icon={Icon} compact />
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-[#0f2d47] via-[#141848] to-[#0a1023] p-5">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">{item.label}</p>
            <h3 className="mt-3 text-2xl font-black leading-tight text-white">Enterprise-ready navigation for modern teams.</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">Discover the right capability, project, team, or solution for your enterprise transformation roadmap.</p>
            <button type="button" className="mt-5 inline-flex items-center gap-2 rounded-full bg-cyan-300 px-4 py-3 text-sm font-black text-slate-950 shadow-cyan transition hover:bg-white">
              Get expert help
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function ServicesMegaGrid({ items }) {
  const columns = [items.filter((_, index) => index % 3 === 0), items.filter((_, index) => index % 3 === 1), items.filter((_, index) => index % 3 === 2)]

  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-[#0b1730] p-4">
      <div className="grid gap-3 md:grid-cols-3">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="grid content-start gap-2 rounded-2xl bg-[#071024] p-3">
            {column.map((entry, index) => {
              const Icon = dropdownIcons[(index * 3 + columnIndex) % dropdownIcons.length]
              return <DropdownItem key={entry.label} entry={entry} icon={Icon} />
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

function DropdownItem({ compact, entry, icon: Icon }) {
  return (
    <a href={`/service/${slugify(entry.label)}`} className="group/item flex min-w-0 gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-cyan-300/10 hover:shadow-neon">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-cyan-200 transition group-hover/item:bg-cyan-300 group-hover/item:text-slate-950">
        <Icon size={17} />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-black leading-5 text-slate-100 transition group-hover/item:text-white">{entry.label}</span>
        {!compact && <span className="mt-1 block text-xs font-semibold leading-5 text-slate-500 transition group-hover/item:text-slate-300">{entry.description}</span>}
      </span>
    </a>
  )
}

function MobileDrawer({ contact, onContactClick, setMenuOpen, socialLinks }) {
  const [openItem, setOpenItem] = useState('Artificial Intelligences')

  return (
    <motion.div
      className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-white/10 bg-[#071024]/98 px-4 py-4 shadow-glass backdrop-blur-2xl xl:hidden"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      <div className="mx-auto grid max-w-7xl gap-3">
        {navItems.map((item) => (
          <MobileAccordion key={item.label} item={item} openItem={openItem} setMenuOpen={setMenuOpen} setOpenItem={setOpenItem} />
        ))}

        <div className="grid gap-3 pt-3 sm:grid-cols-2">
          <button type="button" className="inline-flex items-center justify-center rounded-full border border-cyan-300/20 bg-white/[0.04] px-5 py-3 font-black text-white" onClick={() => { setMenuOpen(false); onContactClick?.() }}>
            Get Quote
          </button>
          <button type="button" className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-5 py-3 font-black text-slate-950 shadow-cyan" onClick={() => { setMenuOpen(false); onContactClick?.() }}>
            Contact Sales
            <ArrowRight size={16} />
          </button>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="grid gap-3 text-sm font-bold text-slate-300">
            <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2"><Mail size={16} className="text-cyan-200" /> {contact.email}</a>
            <a href={`tel:${contact.phone}`} className="inline-flex items-center gap-2"><Phone size={16} className="text-cyan-200" /> {contact.phone}</a>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {socialLinks.map(({ iconName, platformName, profileUrl }) => {
              const Icon = socialIcons[iconName] || Linkedin
              return <a key={platformName} href={profileUrl} target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-300"><Icon size={16} /></a>
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function MobileAccordion({ item, openItem, setMenuOpen, setOpenItem }) {
  const isOpen = openItem === item.label

  if (!item.columns) {
    return (
      <a href={item.href} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 font-black text-slate-100" onClick={() => setMenuOpen(false)}>
        {item.label}
      </a>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
      <button className="flex w-full items-center justify-between px-4 py-4 text-left font-black text-slate-100" onClick={() => setOpenItem(isOpen ? null : item.label)}>
        {item.label}
        <ChevronDown size={18} className={`text-cyan-200 transition ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
            <div className="grid gap-2 px-3 pb-4">
              {item.columns.flatMap((column) => column.items).map((entry, index) => {
                const Icon = dropdownIcons[index % dropdownIcons.length]
                return (
                  <a key={entry.label} href={`/service/${slugify(entry.label)}`} className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-3 py-3 text-sm font-semibold text-slate-300 hover:bg-cyan-300/10 hover:text-white" onClick={() => setMenuOpen(false)}>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-300/10 text-cyan-200">
                      <Icon size={16} />
                    </span>
                    <span>
                      <span className="block font-black text-slate-100">{entry.label}</span>
                      <span className="mt-0.5 block text-xs text-slate-500">{entry.description}</span>
                    </span>
                  </a>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Navbar
