import type { Metadata } from 'next'

import { Analytics } from '@vercel/analytics/next'
import SiteAnalytics from '@/components/cyber/analytics'
import AccessGate from '@/components/cyber/access-gate'
import './globals.css'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400','500','600','700'], variable: '--font-display', display: 'swap' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['300','400','500','600','700'], variable: '--font-mono', display: 'swap' })

export const metadata: Metadata = {
  title: 'DR. GREENTHUMB // Private Drop Protocol',
  description: 'Encrypted four-step delivery protocol — Reddit handshake, Whish payment, Bekaa pickup, hidden drop. Zero face time.',
  keywords: ['delivery', 'protocol', 'encrypted', 'private', 'drop'],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://v0-dr-greenthumb.vercel.app',
    siteName: 'DR. GREENTHUMB',
    title: 'DR. GREENTHUMB // Private Drop Protocol',
    description: 'Encrypted four-step delivery protocol — Reddit handshake, Whish payment, Bekaa pickup, hidden drop. Zero face time.',
    images: [
      {
        url: 'https://v0-dr-greenthumb.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DR. GREENTHUMB',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DR. GREENTHUMB // Private Drop Protocol',
    description: 'Encrypted four-step delivery protocol — Reddit handshake, Whish payment, Bekaa pickup, hidden drop. Zero face time.',
    images: ['https://v0-dr-greenthumb.vercel.app/og-image.png'],
  },
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon-32x32.svg',
        sizes: '32x32',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon-16x16.svg',
        sizes: '16x16',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} bg-[#070809]`}>
      <head>
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="canonical" href="https://v0-dr-greenthumb.vercel.app" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className="font-sans antialiased">
        <AccessGate>{children}</AccessGate>
        <SiteAnalytics />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
