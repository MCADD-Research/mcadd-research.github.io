export const site = {
  name: 'MCADD',
  longTitle: 'MCADD — medium-chain acyl-CoA dehydrogenase deficiency, explained',
  siteUrl: 'https://mcadd-research.github.io',
  ogImageUrl: 'https://mcadd-research.github.io/og-image.png',
  description:
    'An evidence-based guide to medium-chain acyl-CoA dehydrogenase deficiency (MCADD): understanding the disease, diagnosis, daily management, emergencies, and the latest research.',
  contentLastVerified: '2026-10-09',
  knowledgeBaseDate: '2026-08-21',
  emergencyNumberNote: 'Call your local emergency number (e.g. 911, 112, 999).',
} as const

export const disclaimer = {
  heading: 'Medical disclaimer',
  body: [
    'This site is an informational resource built from a validated knowledge base of established medical sources. It is not medical advice, and it is not a substitute for the care of a physician or a specialist metabolic team.',
    'The information here cannot diagnose, treat, or make decisions about your individual care. Always consult your own metabolic specialist before making changes to diet, fasting schedules, or emergency plans.',
    'In an emergency, call your local emergency number immediately rather than relying on this website.',
  ],
} as const

export interface NavItem {
  label: string
  to: string
  description?: string
}

export const primaryNav: NavItem[] = [
  { label: 'Understand', to: '/understanding' },
  { label: 'Diagnosis', to: '/diagnosis' },
  { label: 'Living with MCADD', to: '/living' },
  { label: 'Emergency', to: '/emergency' },
  { label: 'Research', to: '/research' },
]

export const secondaryNav: NavItem[] = [
  { label: 'Glossary', to: '/glossary' },
  { label: 'Methodology', to: '/methodology' },
  { label: 'Resources', to: '/resources' },
]
