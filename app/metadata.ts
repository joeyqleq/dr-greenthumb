import type { Metadata } from 'next'

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
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
}
