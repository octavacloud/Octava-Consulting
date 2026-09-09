import type { Metadata, Viewport } from 'next'
import { Syne, DM_Mono } from 'next/font/google'
import './globals.css'
import { CustomCursor } from '@/components/ui/CustomCursor'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-dm-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Octava — Cloud Product Engineering, Azure & AI',
    template: '%s | Octava Cloud',
  },
  description:
    'Octava designs, builds and runs cloud software — product engineering, sovereign Azure platforms, DevOps automation and AI for business and government. Built in Brisbane, deployed anywhere.',
  keywords: [
    'Azure cloud engineering',
    'cloud product engineering',
    'app development Brisbane',
    'software product development',
    'SaaS development Australia',
    'AI application development',
    'DevOps automation',
    'AI automation',
    'cloud consulting',
    'Brisbane cloud',
    'Azure consultant Australia',
    'cloud modernisation',
    'infrastructure as code',
    'Terraform',
    'Azure OpenAI',
  ],
  authors: [{ name: 'Octava Consulting', url: 'https://octava.cloud' }],
  creator: 'Octava Consulting',
  publisher: 'Octava Consulting',
  metadataBase: new URL('https://octava.cloud'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://octava.cloud',
    siteName: 'Octava Consulting',
    title: 'Octava — Cloud Product Engineering, Azure & AI',
    description:
      'We design, build and run cloud software — products, platforms, and AI. Built in Brisbane, deployed anywhere.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Octava Consulting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Octava — Cloud Product Engineering, Azure & AI',
    description:
      'We design, build and run cloud software. Built in Brisbane, deployed anywhere.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/images/logo-icon.png', type: 'image/png' },
    ],
    apple: '/images/logo-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#050505',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmMono.variable}`}>
      <body className="bg-background text-white font-sans antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
