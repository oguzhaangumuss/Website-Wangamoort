import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Premium Furniture Collection | Wangamoort',
  description: 'Browse our extensive collection of high-quality wholesale furniture. Specialized solutions for NDIS providers, real estate agents, and property developers.',
  openGraph: {
    title: 'Premium Furniture Collection | Wangamoort',
    description: 'High-quality wholesale furniture for businesses and institutions. Competitive prices and professional service.',
    url: 'https://wangamoort.com.au/products',
    siteName: 'Wangamoort Furniture',
    images: [
      {
        url: '/products-hero.jpg', // Ürünler sayfası için genel bir görsel
        width: 1200,
        height: 630,
        alt: 'Wangamoort Furniture Collection',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: 'https://wangamoort.com.au/products'
  }
} 