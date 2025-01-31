'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaWhatsapp, FaShoppingCart } from 'react-icons/fa'
import content from '../../public/content.json'
import CartSlider from './cart/CartSlider'
import Image from 'next/image'

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Cart item sayısını güncelle
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      setCartItemCount(cart.length)
    }

    updateCartCount()
    window.addEventListener('storage', updateCartCount)
    return () => window.removeEventListener('storage', updateCartCount)
  }, [])

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <Image src="/logo4.png" alt="Wangamoort Logo" width={130} height={25} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <Image src="/logo-ndis.png" alt="NDIS Logo" width={70} height={15} />
            </Link>
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium tracking-wide text-sm">
              HOME
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium tracking-wide text-sm">
              ABOUT US
            </Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 group-hover:text-blue-600 transition-colors font-medium tracking-wide text-sm flex items-center">
                SERVICES
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-lg opacity-0 invisible
                group-hover:opacity-100 group-hover:visible transition-all duration-300 transform
                group-hover:translate-y-0 translate-y-2 z-50">
                <div className="p-4">
                  {content.services.map((service, index) => (
                    <Link
                      key={index}
                      href={`/services/${service.slug}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md transition-colors"
                    >
                      • {service.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/products" className="text-gray-700 hover:text-blue-600 transition-colors font-medium tracking-wide text-sm">
              PRODUCTS
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium tracking-wide text-sm">
              CONTACT US
            </Link>

            {/* WhatsApp Button */}
            <a 
              href="https://wa.me/61493324731" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-600 transition-colors flex items-center gap-2 font-medium text-sm"
            >
              <FaWhatsapp className="text-2xl" />
              <span>WhatsApp</span>
            </a>

            {/* Cart Button */}
            <button onClick={() => setIsCartOpen(true)} className="relative group">
              <div className="p-2 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300">
                <FaShoppingCart className="text-xl text-blue-600" />
              </div>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <button onClick={() => setIsCartOpen(true)} className="relative">
              <FaShoppingCart className="text-xl text-blue-600" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 bg-white border-t mt-3">
            <Link href="/" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              HOME
            </Link>
            <Link href="/about"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ABOUT US
            </Link>
            <div className="px-4 py-2">
              <div className="font-medium text-gray-700 mb-2">SERVICES</div>
              <div className="pl-4 space-y-2">
                {content.services.map((service, index) => (
                  <Link
                    key={index}
                    href={`/services/${service.slug}`}
                    className="block py-1 text-sm text-gray-600 hover:text-blue-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    • {service.title}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/products"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              PRODUCTS
            </Link>
            <Link href="/contact"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              CONTACT US
            </Link>
            <a 
              href="https://wa.me/61493324731"
              className="flex items-center gap-2 px-4 py-2 text-green-500 hover:text-green-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaWhatsapp className="text-xl" />
              <span>WhatsApp</span>
            </a>
          </div>
        )}
      </nav>

      <CartSlider 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </header>
  )
} 