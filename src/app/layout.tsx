import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'sonner'
import { CartProvider } from '@/contexts/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wangamoort - Wholesale Furniture Supplier in Sydney',
  description: 'Leading wholesale furniture supplier in Sydney. Quality furniture, appliances, and home decor at competitive prices. Commercial and residential solutions.',
  keywords: 'wholesale furniture, Sydney furniture supplier, commercial furniture, office furniture, home furniture, furniture wholesale, Australian furniture supplier',
  openGraph: {
    title: 'Wangamoort - Wholesale Furniture Supplier in Sydney',
    description: 'Leading wholesale furniture supplier in Sydney. Quality furniture, appliances, and home decor at competitive prices.',
    url: 'https://wangamoort.com.au',
    siteName: 'Wangamoort Furniture',
    images: [
      {
        url: 'https://wangamoort.com.au/og-image.jpg', // Ana sayfa görseli ekleyin
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_AU',
    type: 'website',
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
  verification: {
    google: 'Google Search Console doğrulama kodu',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
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