import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'sonner'
import { CartProvider } from '@/contexts/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://wangamoort.com.au'),
  title: {
    template: '%s | Wangamoort Furniture',
    default: 'Wangamoort - Wholesale Furniture Supplier in Sydney'
  },
  description: 'We specialize in delivering tailored furniture and appliance solutions for businesses and institutions such as NDIS providers, real estate agencies, Airbnb hosts.',
  icons: {
    icon: [
      { rel: 'shortcut icon', url: '/favicon.ico' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#152e1b'
      }
    ]
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    title: 'Wangamoort',
    statusBarStyle: 'default'
  },
  keywords: [
    // Marka varyasyonları
    'wangamoort', 'wangamort', 'vangamoort', 'vangamort',
    // Ana hizmetler
    'wholesale furniture', 'furniture supplier sydney',
    // Lokasyon bazlı
    'sydney furniture', 'nsw furniture supplier', 'australian furniture wholesaler',
    // Hedef kitle
    'commercial furniture sydney', 'business furniture supplier',
    'ndis furniture provider', 'airbnb furniture supplier',
    // Ürün kategorileri
    'office furniture sydney', 'home furniture wholesale',
    'commercial furniture wholesale', 'bulk furniture orders',
    // Hizmet alanları
    'furniture delivery sydney', 'furniture installation service',
    'commercial fitout sydney', 'office furniture solutions'
  ].join(', '),
  openGraph: {
    title: 'Wangamoort - Wholesale Furniture',
    description: 'We specialize in delivering tailored furniture and appliance solutions for businesses and institutions.',
    url: 'https://wangamoort.com.au',
    siteName: 'Wangamoort Furniture',
    images: [{
      url: '/homepage2.png',
      width: 1200,
      height: 630,
      alt: 'Wangamoort Furniture Showcase'
    }],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wangamoort - Wholesale Furniture',
    description: 'We specialize in delivering tailored furniture and appliance solutions for businesses and institutions.',
    images: ['/homepage2.png'],
    creator: '@wangamoort'
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
  alternates: {
    canonical: 'https://wangamoort.com.au'
  },
  verification: {
    google: 'Google Search Console doğrulama kodu buraya gelecek'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
          <Toaster position="top-right" />
        </CartProvider>
      </body>
    </html>
  )
} 