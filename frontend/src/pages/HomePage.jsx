import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import HeroSlider from '../components/HeroSlider.jsx'
import { EnterpriseFooter, ServicesSection, StatsSection, TrustedSection } from '../components/PageSections.jsx'
import { servicePages } from '../data/siteData.jsx'
import ServiceDetailPage from './ServiceDetailPage.jsx'
import AdminPanel from '../admin/AdminPanel.jsx'
import LegalPage from './LegalPage.jsx'
import ContactModal from '../components/ContactModal.jsx'
import CareerPage from './CareerPage.jsx'
import { careerPages } from '../data/careerPages.js'
import CurrentOpeningsPage from './CurrentOpeningsPage.jsx'
import ContactPage from './ContactPage.jsx'
import AboutPage from './AboutPage.jsx'
import { aboutPages } from '../data/aboutPages.js'

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [contactType, setContactType] = useState('enterprise')
  const [pathname, setPathname] = useState(() => window.location.pathname)

  const openContactModal = (type = 'enterprise') => {
    setContactType(type)
    setContactOpen(true)
  }

  useEffect(() => {
    const onRouteChange = () => {
      setPathname(window.location.pathname)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    window.addEventListener('popstate', onRouteChange)
    return () => window.removeEventListener('popstate', onRouteChange)
  }, [])

  const serviceSlug = pathname.startsWith('/service/') ? pathname.replace('/service/', '') : ''
  const activeService = servicePages.find((service) => service.slug === serviceSlug)
  const legalSlugs = ['privacy-policy', 'terms-and-conditions', 'security', 'cookies-policy', 'disclaimer']
  const legalSlug = pathname.startsWith('/') ? pathname.slice(1) : pathname
  const isLegalPage = legalSlugs.includes(legalSlug)
  const careerPage = careerPages[pathname]
  const aboutPage = aboutPages[pathname]

  if (pathname.startsWith('/admin')) {
    return <AdminPanel />
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#050816] text-white">
      <Navbar menuOpen={menuOpen} onContactClick={() => openContactModal('enterprise')} setMenuOpen={setMenuOpen} />
      {aboutPage ? (
        <AboutPage page={aboutPage} />
      ) : pathname === '/contact-us' ? (
        <ContactPage onContactClick={() => openContactModal('enterprise')} />
      ) : pathname === '/careers/current-openings' ? (
        <CurrentOpeningsPage />
      ) : careerPage ? (
        <CareerPage onRegisterClick={openContactModal} page={careerPage} />
      ) : isLegalPage ? (
        <LegalPage slug={legalSlug} />
      ) : activeService ? (
        <ServiceDetailPage service={activeService} services={servicePages} />
      ) : (
        <main>
          <HeroSlider onContactClick={() => openContactModal('enterprise')} />
          <StatsSection />
          <TrustedSection />
          <ServicesSection />
        </main>
      )}
      <EnterpriseFooter onContactClick={() => openContactModal('enterprise')} />
      <ContactModal initialType={contactType} isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  )
}

export default HomePage
