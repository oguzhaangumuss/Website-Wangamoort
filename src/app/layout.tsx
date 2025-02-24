import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'sonner'
import { CartProvider } from '@/contexts/CartContext'
import content from '../..//public/content.json'

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
        url: '/logo3.png', // Favicon yerine logo kullanıyoruz
        width: 300,
        height: 300,
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://wangamoort.com.au",
              "url": "https://wangamoort.com.au",
              "logo": "https://wangamoort.com.au/logo3.png",
              "name": "Wangamoort",
              "description": "Wholesale Furniture and Professional Services",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Sydney",
                "addressRegion": "NSW",
                "addressCountry": "AU"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+61-493-324-731", // Telefon numaranızı ekleyin
                "contactType": "sales"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Products and Services",
                "itemListElement": [
                  ...content.services.map(service => ({
                    "@type": "Service",
                    "name": service.title,
                    "description": service.description.split('\n\n')[0],
                    "url": `https://wangamoort.com.au/services/${service.slug}`
                  })),
                  {
                    "@type": "ProductCollection",
                    "name": "Furniture Collection",
                    "description": "High-quality wholesale furniture for businesses",
                    "url": "https://wangamoort.com.au/products"
                  }
                ]
              }
            })
          }}
        />
      </head>
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