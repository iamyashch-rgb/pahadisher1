import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://thepahadisher.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*', '/checkout', '/account', '/api/*']
      }
    ],
    sitemap: `${SITE_URL}/sitemap.xml`
  };
}
