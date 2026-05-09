const configuredApiUrl = import.meta.env.VITE_API_URL || ''
const fallbackApiUrl = 'https://dhvaniai-3w7k.onrender.com'
const frontendHosts = ['https://dhvaniai.vercel.app']

function normalizeApiBaseUrl(value) {
  return value.trim().replace(/\/+$/, '').replace(/\/api$/, '')
}

function resolveApiBaseUrl(value) {
  const normalizedValue = normalizeApiBaseUrl(value)
  return frontendHosts.includes(normalizedValue) ? fallbackApiUrl : normalizedValue
}

export const API_BASE_URL = resolveApiBaseUrl(configuredApiUrl || fallbackApiUrl)

const apiPath = (path) => `${API_BASE_URL}${path}`

export const API_ENDPOINTS = {
  health: apiPath('/api/health'),
  auth: {
    login: apiPath('/api/auth/login'),
  },
  leads: {
    create: apiPath('/api/leads/create'),
    all: apiPath('/api/leads/all'),
    byId: (id) => apiPath(`/api/leads/${id}`),
    status: (id) => apiPath(`/api/leads/${id}/status`),
  },
  legal: {
    create: apiPath('/api/legal/create'),
    all: apiPath('/api/legal/all'),
    bySlug: (slug) => apiPath(`/api/legal/${slug}`),
    update: (id) => apiPath(`/api/legal/update/${id}`),
    delete: (id) => apiPath(`/api/legal/delete/${id}`),
    status: (id) => apiPath(`/api/legal/status/${id}`),
  },
  jobs: {
    open: apiPath('/api/jobs/open'),
    apply: apiPath('/api/jobs/apply'),
    all: apiPath('/api/jobs/all'),
    create: apiPath('/api/jobs/create'),
    bySlug: (slug) => apiPath(`/api/jobs/${slug}`),
    update: (id) => apiPath(`/api/jobs/update/${id}`),
    delete: (id) => apiPath(`/api/jobs/delete/${id}`),
    status: (id) => apiPath(`/api/jobs/status/${id}`),
  },
  applications: {
    all: apiPath('/api/applications/all'),
    byId: (id) => apiPath(`/api/applications/${id}`),
    status: (id) => apiPath(`/api/applications/status/${id}`),
    delete: (id) => apiPath(`/api/applications/delete/${id}`),
  },
  settings: {
    contact: apiPath('/api/settings/contact'),
    socialLinks: apiPath('/api/settings/social-links'),
  },
  adminSettings: {
    contact: apiPath('/api/admin/settings/contact'),
    socialLinks: apiPath('/api/admin/settings/social-links'),
    socialLink: (id) => apiPath(`/api/admin/settings/social-links/${id}`),
    socialLinkStatus: (id) => apiPath(`/api/admin/settings/social-links/${id}/status`),
  },
  users: {
    create: apiPath('/api/users/create'),
    all: apiPath('/api/users/all'),
    byId: (id) => apiPath(`/api/users/${id}`),
    update: (id) => apiPath(`/api/users/update/${id}`),
    status: (id) => apiPath(`/api/users/status/${id}`),
    delete: (id) => apiPath(`/api/users/delete/${id}`),
  },
}
