import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/.next/'],
    },
    sitemap: 'https://v0-dr-greenthumb.vercel.app/sitemap.xml',
  }
}
