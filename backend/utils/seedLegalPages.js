import LegalPage from '../models/LegalPage.js'

const defaultLegalPages = [
  {
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    shortDescription: 'How Dhvani.AI collects, uses, protects, and retains business, vendor, recruitment, CRM, cloud, and AI project data.',
    seoTitle: 'Privacy Policy | Dhvani.AI',
    metaDescription: 'Read Dhvani.AI privacy practices for personal information, business data, vendor details, recruitment data, cookies, retention, and user rights.',
    content: '## Introduction\nDhvani.AI respects privacy across our website, AI data collection operations, vendor onboarding, recruitment workflows, CRM services, cloud solutions, and technology delivery.\n\n## Information We Collect\nWe may collect business contact details, project requirements, vendor profiles, recruitment details, usage logs, communication records, and operational metadata required to deliver services.\n\n## How We Use Information\nWe use information to operate services, manage projects, onboard vendors, process recruitment, respond to inquiries, improve quality, communicate updates, and comply with legal obligations.\n\n## Data Protection\nWe apply access controls, secure transfer practices, monitoring, internal policies, and vendor controls to protect data from unauthorized access, misuse, alteration, disclosure, or loss.\n\n## Contact\nFor privacy questions or data requests, contact Dhvani.AI at hello@dhvani.ai.',
    status: 'Published',
  },
  {
    title: 'Terms & Conditions',
    slug: 'terms-and-conditions',
    shortDescription: 'Responsible use and service terms for Dhvani.AI clients, vendors, users, and project partners.',
    seoTitle: 'Terms & Conditions | Dhvani.AI',
    metaDescription: 'Review Dhvani.AI terms for service use, vendor responsibilities, project guidelines, confidentiality, payment, compliance, and liability.',
    content: '## Acceptance of Terms\nBy accessing our website, requesting proposals, onboarding as a vendor, or engaging Dhvani.AI for services, you agree to these Terms & Conditions.\n\n## Services Overview\nDhvani.AI provides AI data collection, annotation, recording, call center services, software development, cloud and CRM services, recruitment, HR, and outsourcing operations.\n\n## User Responsibilities\nUsers must provide accurate information, comply with applicable laws, avoid unauthorized access, and maintain confidentiality of credentials, project materials, and shared data.\n\n## Vendor Responsibilities\nVendors must follow project guidelines, quality standards, confidentiality terms, timelines, compliance requirements, and payment documentation rules.\n\n## Contact\nFor questions about these terms, contact Dhvani.AI at hello@dhvani.ai.',
    status: 'Published',
  },
  {
    title: 'Security',
    slug: 'security',
    shortDescription: 'Security controls and data protection practices for AI projects, vendor operations, and enterprise workflows.',
    seoTitle: 'Security | Dhvani.AI',
    metaDescription: 'Learn about Dhvani.AI security practices for access control, encryption, monitoring, vendor standards, incident response, and AI data protection.',
    content: '## Security Commitment\nDhvani.AI treats security as a core operating principle across data collection, AI projects, vendor management, cloud services, CRM workflows, and business process delivery.\n\n## Access Control\nAccess is restricted based on role, business need, project assignment, and operational responsibility.\n\n## Vendor Security Standards\nVendors are expected to follow confidentiality obligations, data handling rules, secure communication practices, and project-specific compliance standards.\n\n## Incident Response\nPotential incidents are reviewed, contained, investigated, and remediated according to severity, business impact, legal obligations, and client requirements.\n\n## Contact Security Team\nFor security questions or vulnerability reporting, contact hello@dhvani.ai with the subject line Security.',
    status: 'Published',
  },
  {
    title: 'Cookies Policy',
    slug: 'cookies-policy',
    shortDescription: 'How Dhvani.AI uses cookies and similar technologies for sessions, analytics, preferences, security, and service improvement.',
    seoTitle: 'Cookies Policy | Dhvani.AI',
    metaDescription: 'Read how Dhvani.AI uses cookies, analytics, preference storage, session technology, and browser controls.',
    content: '## Cookies Overview\nCookies and similar technologies may help Dhvani.AI maintain sessions, understand site performance, improve user experience, remember preferences, and support analytics.\n\n## Types of Cookies\nWe may use essential cookies, preference cookies, analytics cookies, and security-related cookies depending on the website or portal feature.\n\n## Managing Cookies\nYou can manage or disable cookies through your browser settings. Some features may not work correctly if essential cookies are disabled.\n\n## Updates\nWe may update this Cookies Policy to reflect changes in technology, analytics tools, or legal requirements.',
    status: 'Published',
  },
  {
    title: 'Disclaimer',
    slug: 'disclaimer',
    shortDescription: 'General website, service, content, and liability disclaimer for Dhvani.AI information and materials.',
    seoTitle: 'Disclaimer | Dhvani.AI',
    metaDescription: 'Read Dhvani.AI disclaimer covering website content, service information, third-party links, and limitation of responsibility.',
    content: '## General Information\nThe information on this website is provided for general business and service awareness. It should not be treated as legal, financial, technical, or compliance advice.\n\n## No Warranty\nWhile we aim to keep information accurate and current, Dhvani.AI does not guarantee that all content is complete, error-free, or suitable for every use case.\n\n## Third-Party Links\nOur website may reference third-party platforms, tools, or websites. Dhvani.AI is not responsible for third-party content, availability, privacy practices, or security.\n\n## Contact\nFor questions about this disclaimer, contact Dhvani.AI at hello@dhvani.ai.',
    status: 'Published',
  },
]

export async function seedLegalPages() {
  await Promise.all(
    defaultLegalPages.map((page) =>
      LegalPage.updateOne(
        { slug: page.slug },
        { $setOnInsert: { ...page, createdBy: 'system', updatedBy: 'system' } },
        { upsert: true },
      ),
    ),
  )
}
