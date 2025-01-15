import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { FaWhatsapp, FaShoppingCart } from 'react-icons/fa'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wangamoort - Wholesale Furniture',
  description: 'Your reliable wholesale supplier for quality furniture products',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-white shadow-sm fixed w-full top-0 z-50">
          <nav className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <img 
                  src="/logo.png" 
                  alt="Wangamoort Logo" 
                  className="h-16 w-auto"
                />
              </div>

              {/* Navigation Links ve Action Buttons Container */}
              <div className="hidden md:flex items-center space-x-8">
                {/* Ana Menü Linkleri */}
                <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors
                  font-medium tracking-wide text-sm">
                  HOME
                </a>

                <a href="/about" className="text-gray-700 hover:text-blue-600 transition-colors
                  font-medium tracking-wide text-sm">
                  ABOUT US
                </a>

                {/* Services Dropdown */}
                <div className="relative group">
                  <button className="text-gray-700 group-hover:text-blue-600 transition-colors
                    font-medium tracking-wide text-sm flex items-center">
                    SERVICES
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-lg opacity-0 invisible
                    group-hover:opacity-100 group-hover:visible transition-all duration-300 transform
                    group-hover:translate-y-0 translate-y-2 z-50">
                    <div className="p-4">
                      {[
                        'Furniture & Appliances Supply',
                        'Delivery Services',
                        'Professional Installation',
                        'Rubbish Removal',
                        'Expert Advice & Customization'
                      ].map((service, index) => (
                        <a
                          key={index}
                          href={`/services#${service.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600
                            rounded-md transition-colors"
                        >
                          • {service}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Products Link */}
                <a href="/products" className="text-gray-700 hover:text-blue-600 transition-colors
                  font-medium tracking-wide text-sm">
                  PRODUCTS
                </a>

                {/* Contact Link */}
                <a href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors
                  font-medium tracking-wide text-sm">
                  CONTACT US
                </a>

                {/* WhatsApp Button */}
                <a 
                  href="https://wa.me/YOURPHONENUMBER" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-600 transition-colors
                    flex items-center gap-2 font-medium text-sm"
                >
                  <FaWhatsapp className="text-2xl" />
                  <span>WhatsApp</span>
                </a>

                {/* Cart Button */}
                <button className="relative group">
                  <div className="p-2 rounded-full bg-blue-50 group-hover:bg-blue-100 
                    transition-colors duration-300">
                    <FaShoppingCart className="text-xl text-blue-600" />
                  </div>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white 
                    text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    0
                  </span>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button className="md:hidden text-gray-700 hover:text-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </nav>
        </header>

        <main>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
} 