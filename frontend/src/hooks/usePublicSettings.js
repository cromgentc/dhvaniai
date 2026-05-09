import { useEffect, useState } from 'react'
import { API_BASE_URL } from '../lib/api.js'

export const defaultContactSettings = {
  email: 'hello@dhvani.ai',
  phone: '+91 98765 43210',
  address: 'Noida, Uttar Pradesh, India',
  googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Noida%2C%20Uttar%20Pradesh%2C%20India',
  supportEmail: 'hello@dhvani.ai',
  salesEmail: 'hello@dhvani.ai',
  logoUrl: '/dhvani-logo.png',
  faviconUrl: '/dhvani-logo.png',
}

export function usePublicSettings() {
  const [contact, setContact] = useState(defaultContactSettings)
  const [socialLinks, setSocialLinks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const [contactResponse, socialResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/api/settings/contact`),
          fetch(`${API_BASE_URL}/api/settings/social-links`),
        ])
        const [contactResult, socialResult] = await Promise.all([contactResponse.json(), socialResponse.json()])
        if (contactResponse.ok && contactResult.data) {
          const nextContact = { ...defaultContactSettings, ...contactResult.data }
          setContact(nextContact)
          updateFavicon(nextContact.faviconUrl)
        }
        if (socialResponse.ok && socialResult.data) setSocialLinks(socialResult.data)
      } catch {
        setContact(defaultContactSettings)
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  return { contact, loading, socialLinks }
}

function updateFavicon(faviconUrl) {
  if (!faviconUrl || typeof document === 'undefined') return

  let link = document.querySelector("link[rel='icon']")
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }
  link.href = faviconUrl
}
