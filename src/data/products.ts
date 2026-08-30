/**
 * Products built by Octava. Single source of truth for the homepage cards
 * (ProductsSection) and the /products/[slug] pages.
 * Copy supplied by the product owners — edit here, everything updates.
 */

export type ProductFeature = { title: string; body: string }

export type Product = {
  slug: string
  name: string
  subtitle: string
  oneLiner: string
  cardDescription: string
  metaDescription: string
  status: string
  statusNote: string
  year: string
  externalUrl: string
  externalCta: string
  logo: { src: string; alt: string; width: number; height: number; bg: 'light' | 'dark' }
  problem?: string
  what: string[]
  gets?: string[]
  features: ProductFeature[]
  builtOn: string
  stack: string[]
}

export const products: Product[] = [
  {
    slug: 'meridianlogix',
    name: 'MeridianLogix',
    subtitle: 'AI freight quoting for freight forwarders',
    oneLiner:
      "From the client's RFQ email to a finished, branded quote, priced from the forwarder's own rates.",
    cardDescription:
      "MeridianLogix reads a freight forwarder's incoming quote requests, checks them for gaps, and prices them from the forwarder's own carrier rate sheets and port charges — LCL, FCL and air — into a quote the operator reviews, approves and sends as a branded PDF. Built by Octava Cloud, it is in use today with selected freight-forwarding teams in Australia.",
    metaDescription:
      'MeridianLogix by Octava Cloud: AI freight quoting for forwarders — reads the RFQ email, prices from your own rate sheets, sends a branded quote in minutes.',
    status: 'Live · Early access',
    statusNote:
      'Currently deployed with selected freight-forwarding teams; taking a small number of forwarders at a time.',
    year: '2026',
    externalUrl: 'https://www.meridianlogix.com/',
    externalCta: 'Request early access',
    logo: {
      src: '/images/products/meridianlogix-mark.svg',
      alt: 'MeridianLogix',
      width: 96,
      height: 96,
      bg: 'dark',
    },
    problem:
      "A freight forwarder's day is quote requests: emails with a lane, a few pallets or a container, sometimes half the details missing. Pricing each one means pulling the right carrier sheet, the right port charges, converting currencies, applying margin and typing it all into a document — and the client who answers first usually wins the job.",
    what: [
      "It turns that request into a quote. The AI reads the email; the pricing engine does the maths from the forwarder's own rate sheets — never a guess. Anything the request doesn't say is flagged for the operator instead of assumed.",
      "The result is an editable draft, a carrier comparison for the lane, and a branded PDF quote carrying the forwarder's terms, ready to send — usually in minutes rather than hours.",
    ],
    gets: [
      'Faster, consistent quotes across LCL, FCL and air, priced from their own contracts and tariffs',
      'Fewer costly misses: missing details, expired rates and unpriced legs are flagged before a quote goes out',
      'A full trail of every quote — what was read, what was priced, who approved it, what was sent',
    ],
    features: [
      { title: 'Reads the request', body: 'The AI reads the incoming RFQ email and extracts lane, cargo and terms.' },
      { title: 'Prices from your own rates', body: 'Carrier rate sheets, port charges, currency conversion and margin — never a guess.' },
      { title: "Flags what's missing", body: "Anything the request doesn't say is raised for the operator instead of assumed." },
      { title: 'Carrier comparison', body: 'Options for the lane side by side, so the operator picks with the numbers in view.' },
      { title: 'Branded PDF quotes', body: "An editable draft becomes a quote carrying the forwarder's own terms and branding." },
      { title: 'Full quote trail', body: 'What was read, what was priced, who approved it and what was sent — every time.' },
    ],
    builtOn:
      'MeridianLogix is an Octava product, designed and built end-to-end in Brisbane and delivered on Azure: App Service and Static Web Apps, Azure Database for PostgreSQL, Azure OpenAI, Azure AI Search, Azure Maps and Blob Storage, with Application Insights monitoring and identity-based access to every resource.',
    stack: ['Azure OpenAI', 'Azure AI Search', 'PostgreSQL', 'Static Web Apps', 'App Service', 'Azure Maps', 'Blob Storage', 'App Insights'],
  },
  {
    slug: 'certifyme',
    name: 'CertifyMe',
    subtitle: 'RPL evidence & assessment platform',
    oneLiner: 'Evidence in, qualification out — RPL without the paperwork.',
    cardDescription:
      'CertifyMe is a mobile-first RPL platform for Registered Training Organisations. Tradespeople capture photo and video evidence of their real work on-site; assessors review it unit-by-unit and guide each student through to a completed qualification — all in one app.',
    metaDescription:
      'CertifyMe by Octava Cloud: mobile-first RPL platform for RTOs — capture on-site evidence, assess unit-by-unit, sign off qualifications in one app.',
    status: 'Live',
    statusNote:
      'Live on iOS, Android and the web, with new trades and qualifications being added as the platform grows.',
    year: '2026',
    externalUrl: 'https://app.certifyme.com.au/',
    externalCta: 'Open CertifyMe',
    logo: {
      src: '/images/products/certifyme-logo.png',
      alt: 'CertifyMe',
      width: 678,
      height: 200,
      bg: 'light',
    },
    what: [
      'CertifyMe streamlines Recognition of Prior Learning (RPL) for vocational RTOs. Instead of chasing paperwork, students photograph and film the work they already do on the job and submit it as evidence against each unit of competency — straight from their phone, on iOS, Android or the web.',
      "Assessors pre-check each piece of evidence as it arrives, approving it or sending it back with a note, so students always know exactly where they stand — what's signed off, what needs more, and what's left. A qualification only moves to final assessment once every unit and compliance document has been cleared, giving RTOs a clean, defensible trail from first upload to certificate.",
    ],
    features: [
      { title: 'Capture evidence anywhere', body: 'iOS and Android apps (plus web) let students upload photos, videos and documents straight from the work site.' },
      { title: 'Unit-by-unit pre-check', body: 'Staff review and approve evidence as it comes in, or request more with feedback — no batch-marking at the end.' },
      { title: 'Live progress for students', body: "A clear view of what's approved, what needs work, and what's still to submit." },
      { title: 'Compliance built in', body: 'USI, ID, White Card and other required documents are tracked and verified alongside the evidence.' },
      { title: 'Assessment integrity', body: 'A qualification only reaches the RTO assessor once everything has passed pre-check.' },
      { title: 'Structured to the qualification', body: 'Core and elective units, trade-specific icons, and standalone add-on units.' },
    ],
    builtOn:
      'Designed and built by Octava on Microsoft Azure — iOS and Android apps, a secure cloud backend (Azure Cosmos DB, Blob Storage and App Service), automated delivery pipelines, and integration with RTO student-management systems (aXcelerate).',
    stack: ['iOS & Android', 'Azure Cosmos DB', 'Blob Storage', 'App Service', 'CI/CD pipelines', 'aXcelerate'],
  },
]

export function getProduct(slug: string) {
  return products.find(p => p.slug === slug)
}
