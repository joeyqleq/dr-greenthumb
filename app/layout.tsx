import type { Metadata } from 'next'

import { Analytics } from '@vercel/analytics/next'
import SiteAnalytics from '@/components/cyber/analytics'
import AccessGate from '@/components/cyber/access-gate'
import './globals.css'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400','500','600','700'], variable: '--font-display', display: 'swap' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['300','400','500','600','700'], variable: '--font-mono', display: 'swap' })

export const metadata: Metadata = {
  title: 'Dr. Greenthumb // Private Drop Protocol',
  description: 'Encrypted four-step delivery protocol — Reddit handshake, Whish payment, Bekaa pickup, hidden drop. Zero face time.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
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
      <body className="font-sans antialiased">
        <AccessGate>{children}</AccessGate>
        <SiteAnalytics />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
