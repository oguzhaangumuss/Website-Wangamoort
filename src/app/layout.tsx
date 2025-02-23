import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'sonner'
import { CartProvider } from '@/contexts/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Wangamoort - Wholesale Furniture",
  description: "We specialize in delivering tailored furniture and appliances for businesses and institutions such as NDIS providers, real estate agents, and property developers.",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Wangamoort - Wholesale Furniture',
    description: 'We specialize in delivering tailored furniture and appliances for businesses and institutions.',
    url: 'https://wangamoort.com.au',
    siteName: 'Wangamoort',
    images: [
      {
        url: '/favicon-96x96.png', // Geçici olarak favicon'u kullanıyoruz
        width: 96,
        height: 96,
        alt: 'Wangamoort Logo',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  themeColor: '#ffd000', // Sarı tema renginiz
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