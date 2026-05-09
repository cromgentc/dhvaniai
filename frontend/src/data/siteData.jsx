import {
  AppWindow,
  AudioLines,
  Bot,
  BrainCircuit,
  Building2,
  BriefcaseBusiness,
  ClipboardCheck,
  CloudCog,
  DatabaseZap,
  FileText,
  Globe2,
  Headphones,
  HeartPulse,
  Image,
  Landmark,
  Layers3,
  Megaphone,
  Network,
  PanelsTopLeft,
  PhoneCall,
  ScanText,
  ShieldCheck,
  Sparkles,
  Store,
  Truck,
  Users,
  Zap,
} from 'lucide-react'

export const navItems = [
  {
    label: 'Artificial Intelligences',
    href: '/',
    featured: true,
    columns: [
      {
        title: 'AI & Data',
        items: [
          { label: 'AI Data Collection', description: 'Scalable datasets for AI model training.' },
          { label: 'Data Annotation', description: 'Human-in-loop labeling for text, image, and speech.' },
          { label: 'Document Collection', description: 'Structured document sourcing and validation.' },
          { label: 'Script Recording', description: 'Prompt-based multilingual speech recording.' },
          { label: 'Audio Recording', description: 'High-quality voice samples for speech AI.' },
          { label: 'Image Collection', description: 'Visual datasets for computer vision systems.' },
          { label: 'OCR Data Collection', description: 'Printed and handwritten OCR data workflows.' },
          { label: 'Call Center Services', description: 'Voice operations and support delivery.' },
        ],
      },
      {
        title: 'Technology',
        items: [
          { label: 'Digital Marketing', description: 'Growth campaigns, lead funnels, and analytics.' },
          { label: 'CRM Solutions', description: 'Sales, service, and customer data workflows.' },
          { label: 'Cloud Solutions', description: 'Cloud operations, migration, and infrastructure.' },
          { label: 'Software Development', description: 'Custom enterprise systems and integrations.' },
          { label: 'Website Development', description: 'Modern web platforms and SaaS experiences.' },
          { label: 'Mobile App Development', description: 'Responsive mobile apps for business teams.' },
          { label: 'Recruitment Services', description: 'Hiring support and workforce operations.' },
          { label: 'BPO Services', description: 'Managed back-office and process operations.' },
        ],
      },
    ],
  },
  {
    label: 'Industries',
    href: '/',
    columns: [
      {
        title: 'Industries We Serve',
        items: [
          { label: 'Artificial Intelligence', description: 'Training data and model operations.' },
          { label: 'BFSI', description: 'Banking, finance, insurance workflows.' },
          { label: 'Healthcare', description: 'Patient, document, and support operations.' },
          { label: 'Telecom', description: 'Voice, support, and field process automation.' },
          { label: 'Retail', description: 'Catalog, support, and CRM workflows.' },
          { label: 'Education', description: 'Learning, content, and student support.' },
          { label: 'IT & Software', description: 'Product, cloud, and support teams.' },
          { label: 'HR & Recruitment', description: 'Hiring, onboarding, and workforce solutions.' },
          { label: 'E-commerce', description: 'Product data, support, and automation.' },
          { label: 'Manufacturing', description: 'Operations, quality, and reporting systems.' },
          { label: 'Logistics', description: 'Routing, tracking, and support automation.' },
          { label: 'Real Estate', description: 'Lead management and client operations.' },
        ],
      },
    ],
  },
  {
    label: 'Solutions',
    href: '/',
    columns: [
      {
        title: 'Enterprise Solutions',
        items: [
          { label: 'Enterprise AI Solutions', description: 'Custom AI systems for business teams.' },
          { label: 'Business Automation', description: 'Automate repeated processes and decisions.' },
          { label: 'Workforce Management', description: 'Manage distributed operations and teams.' },
          { label: 'Vendor Management', description: 'Coordinate partners, SLAs, and delivery.' },
          { label: 'Data Quality Management', description: 'Review, validate, and monitor data quality.' },
          { label: 'CRM Integration', description: 'Connect sales and support platforms.' },
          { label: 'Cloud-Based Operations', description: 'Run secure operations on cloud systems.' },
          { label: 'Lead Management', description: 'Capture, qualify, and route leads.' },
          { label: 'Reporting Dashboard', description: 'Executive dashboards and performance views.' },
          { label: 'Custom Software Solutions', description: 'Tailored systems for enterprise workflows.' },
        ],
      },
    ],
  },
  {
    label: 'Human Resources',
    href: '/',
    columns: [
      {
        title: 'HR Services',
        items: [
          { label: 'Recruitment Services', description: 'End-to-end hiring support for business teams.' },
          { label: 'Staffing Solutions', description: 'Flexible workforce sourcing and deployment.' },
          { label: 'Payroll Management', description: 'Payroll, compliance, and employee operations.' },
          { label: 'Vendor Onboarding', description: 'Partner and field team onboarding workflows.' },
          { label: 'Background Verification', description: 'Candidate verification and document checks.' },
          { label: 'HR Operations Support', description: 'Managed HR process support for enterprises.' },
        ],
      },
    ],
  },
  {
    label: 'Information Technologies',
    href: '/',
    columns: [
      {
        title: 'Developer Service',
        items: [
          { label: 'Software Development', description: 'Custom enterprise software and platforms.' },
          { label: 'Website Development', description: 'Modern business websites and SaaS UI.' },
          { label: 'Mobile App Development', description: 'Android and iOS app development services.' },
          { label: 'API Development', description: 'Secure APIs and backend integrations.' },
          { label: 'Cloud Engineering', description: 'Cloud-native architecture and deployment.' },
          { label: 'Maintenance & Support', description: 'Ongoing product support and improvements.' },
        ],
      },
    ],
  },
]

export const slides = [
  {
    eyebrow: 'AI Data Collection Solutions',
    headline: 'Enterprise data pipelines for high-performing AI systems.',
    subtitle: 'Collect, label, validate, and structure multilingual data for voice, vision, NLP, and automation models.',
    description: 'Dhvani.AI helps teams prepare trusted data workflows for production AI with quality controls, domain expertise, and scalable delivery.',
    ctas: ['Get Started', 'Explore Services'],
    icon: DatabaseZap,
    accent: 'from-cyan-300 via-blue-500 to-violet-500',
    metrics: ['99.9% QA checks', '80+ data workflows', '24/7 operations'],
  },
  {
    eyebrow: 'Enterprise Digital Transformation',
    headline: 'Modernize operations with secure AI-first technology.',
    subtitle: 'Transform legacy processes into intelligent digital systems across sales, service, finance, and operations.',
    description: 'From consulting to implementation, we design cloud-ready solutions that make enterprise teams faster and more connected.',
    ctas: ['Contact Us', 'View Platform'],
    icon: Network,
    accent: 'from-indigo-300 via-purple-500 to-cyan-400',
    metrics: ['45% faster workflows', 'Cloud-ready', 'Enterprise-grade'],
  },
  {
    eyebrow: 'Multilingual AI Training Services',
    headline: 'Train AI that understands every customer voice.',
    subtitle: 'Regional language datasets, voice samples, translation review, intent mapping, and conversational AI tuning.',
    description: 'Build inclusive AI experiences with speech and language services designed for global and Indian markets.',
    ctas: ['Explore Services', 'Talk to Expert'],
    icon: Globe2,
    accent: 'from-cyan-200 via-sky-500 to-fuchsia-500',
    metrics: ['25+ languages', 'Voice + text', 'Human-in-loop'],
  },
  {
    eyebrow: 'AI Automation & Business Solutions',
    headline: 'Automate decisions, conversations, and customer journeys.',
    subtitle: 'Deploy AI assistants, calling bots, workflow automation, and business intelligence for enterprise teams.',
    description: 'Dhvani.AI connects voice, data, CRM, and cloud platforms to automate repetitive work while keeping teams in control.',
    ctas: ['Get Started', 'Contact Us'],
    icon: Bot,
    accent: 'from-violet-300 via-blue-500 to-cyan-300',
    metrics: ['60% lower manual work', 'AI agents', 'CRM connected'],
  },
  {
    eyebrow: 'Cloud, CRM & Technology Services',
    headline: 'Build the cloud foundation for intelligent enterprise growth.',
    subtitle: 'Cloud migration, CRM implementation, API platforms, dashboards, integrations, and managed technology services.',
    description: 'We bring together AI engineering, cloud architecture, and enterprise software delivery for long-term scale.',
    ctas: ['Explore Services', 'Book Demo'],
    icon: CloudCog,
    accent: 'from-blue-300 via-cyan-400 to-purple-500',
    metrics: ['API-first', 'Secure cloud', 'Managed delivery'],
  },
]

export const stats = [
  ['500M+', 'data points processed'],
  ['120+', 'enterprise workflows'],
  ['25+', 'languages supported'],
  ['99.9%', 'quality validation'],
]

export const trustedLogos = ['NOVA', 'ORBIT', 'AXIS', 'CLOUD9', 'VERITAS', 'KINETIC']

export const serviceCards = [
  { icon: BrainCircuit, title: 'AI Strategy', text: 'Roadmaps, operating models, and implementation plans for enterprise AI.' },
  { icon: PhoneCall, title: 'Voice AI', text: 'Calling bots, speech workflows, transcription, and multilingual assistants.' },
  { icon: Layers3, title: 'Cloud Platforms', text: 'Secure cloud foundations, APIs, dashboards, and scalable integrations.' },
  { icon: ShieldCheck, title: 'Managed Delivery', text: 'Governed execution with quality systems, reporting, and support.' },
]

export const footerItems = ['Enterprise AI roadmap', 'Voice and multilingual AI', 'Cloud and CRM services']

export const dropdownIcons = [
  Sparkles,
  DatabaseZap,
  FileText,
  AudioLines,
  Headphones,
  Image,
  ScanText,
  PhoneCall,
  Megaphone,
  CloudCog,
  AppWindow,
  PanelsTopLeft,
  Users,
  BriefcaseBusiness,
  HeartPulse,
  Landmark,
  Store,
  Truck,
  Building2,
  Bot,
  ShieldCheck,
  ClipboardCheck,
  Zap,
  Globe2,
]

export const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const generatedServicePages = navItems
  .flatMap((navItem) =>
    (navItem.columns || []).flatMap((column) =>
      column.items.map((item, index) => ({
        ...item,
        slug: slugify(item.label),
        category: navItem.label,
        group: column.title,
        icon: dropdownIcons[index % dropdownIcons.length],
      })),
    ),
  )
  .filter((item, index, items) => items.findIndex((match) => match.slug === item.slug) === index)

const supplementalServicePages = [
  {
    label: 'Voice AI Agents',
    description: 'Conversational voice agents, calling bots, IVR automation, and customer interaction workflows for enterprise teams.',
    category: 'Artificial Intelligences',
    group: 'AI & Voice Automation',
    icon: Bot,
  },
  {
    label: 'Multilingual Training',
    description: 'Language datasets, speech samples, translation review, intent mapping, and regional AI training support.',
    category: 'Artificial Intelligences',
    group: 'AI & Data',
    icon: Globe2,
  },
  {
    label: 'Cloud Services',
    description: 'Cloud migration, managed infrastructure, secure deployments, monitoring, and scalable enterprise operations.',
    category: 'Information Technologies',
    group: 'Cloud & Infrastructure',
    icon: CloudCog,
  },
  {
    label: 'Finance',
    description: 'AI data, automation, compliance workflows, document processing, and CRM operations for finance teams.',
    category: 'Industries',
    group: 'Industries We Serve',
    icon: Landmark,
  },
  {
    label: 'Ecommerce',
    description: 'Catalog operations, product data enrichment, customer support, CRM automation, and marketplace workflows.',
    category: 'Industries',
    group: 'Industries We Serve',
    icon: Store,
  },
  {
    label: 'Digital Transformation',
    description: 'Modernize business processes with AI, cloud, CRM, dashboards, integrations, and workflow automation.',
    category: 'Solutions',
    group: 'Enterprise Solutions',
    icon: Network,
  },
  {
    label: 'AI Automation',
    description: 'Automate decisions, conversations, reporting, lead routing, QA workflows, and repetitive operational tasks.',
    category: 'Solutions',
    group: 'Enterprise Solutions',
    icon: Zap,
  },
  {
    label: 'Data Engineering',
    description: 'Build reliable data pipelines, validation layers, dashboards, API feeds, and analytics-ready datasets.',
    category: 'Solutions',
    group: 'Enterprise Solutions',
    icon: DatabaseZap,
  },
  {
    label: 'Insights',
    description: 'Business insights, performance intelligence, analytics summaries, and practical AI transformation guidance.',
    category: 'Resources',
    group: 'Knowledge Center',
    icon: BrainCircuit,
  },
  {
    label: 'Case Studies',
    description: 'Explore project stories, delivery approaches, measurable outcomes, and enterprise implementation examples.',
    category: 'Resources',
    group: 'Knowledge Center',
    icon: FileText,
  },
  {
    label: 'Documentation',
    description: 'Service documentation, onboarding notes, workflow references, compliance information, and support material.',
    category: 'Resources',
    group: 'Knowledge Center',
    icon: PanelsTopLeft,
  },
].map((item) => ({ ...item, slug: slugify(item.label) }))

export const servicePages = [...generatedServicePages, ...supplementalServicePages].filter(
  (item, index, items) => items.findIndex((match) => match.slug === item.slug) === index,
)
