import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/sessions/', '/assignments/', '/quizzes/', '/members/', '/access-requests/', '/profile/'] },
    sitemap: 'https://weboom-dhv-tec.vercel.app/sitemap.xml',
  }
}
