import type { MetadataRoute } from 'next'
import { products } from '@/data/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: 'https://octava.cloud', lastModified: now, changeFrequency: 'monthly', priority: 1 },
    ...products.map(p => ({
      url: `https://octava.cloud/products/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
