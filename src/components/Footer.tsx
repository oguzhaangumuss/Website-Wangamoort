'use client'
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaWhatsapp,
  FaArrowUp
} from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-32">
      {/* Üst Dalga Efekti */}
      <div className="absolute -top-24 left-0 w-full overflow-hidden">
        <svg
          viewBox="0 0 1440 200"
          className="relative block w-full h-24"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />  {/* Sayfa arka plan rengi */}
              <stop offset="50%" stopColor="#ffffff" />  {/* Sayfa arka plan rengi */}
              <stop offset="100%" stopColor="#111827" /> {/* Footer arka plan rengi */}
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGradient)"
            d="M0,32L60,42.7C120,53,240,75,360,80C480,85,600,75,720,64C840,53,960,43,1080,48C1200,53,1320,75,1380,85.3L1440,96L1440,200L1380,200C1320,200,1200,200,1080,200C960,200,840,200,720,200C600,200,480,200,360,200C240,200,120,200,60,200L0,200Z"
          ></path>
        </svg>
      </div>

      {/* Scroll to Top Button */}
      <button 
        onClick={scrollToTop}
        className="absolute -top-4 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg
          hover:bg-blue-700 transition-all duration-300 group"
      >
        <FaArrowUp className="text-base group-hover:-translate-y-1 transition-transform duration-300" />
      </button>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="Wangamoort Logo" className="h-6 w-auto" />
              <h3 className="text-white text-lg font-bold tracking-wide">Wangamoort</h3>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Providing quality and modern furniture solutions for over 20 years.
            </p>
            <div className="flex space-x-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
                >
                  <Icon className="text-base" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-base font-bold mb-4 pb-2 tracking-wider uppercase border-b-2 border-blue-500/30">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {['About Us', 'Our Products', 'Our Services', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors hover:translate-x-2 inline-block">
                    → {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="text-white text-base font-bold mb-4 pb-2 tracking-wider uppercase border-b-2 border-blue-500/30">
              Categories
            </h3>
            <ul className="space-y-2 text-sm">
              {['Bedroom', 'Living Room', 'Dining Room', 'All Products'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors hover:translate-x-2 inline-block">
                    → {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-white text-base font-bold mb-4 pb-2 tracking-wider uppercase border-b-2 border-blue-500/30">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { icon: FaMapMarkerAlt, text: 'Sydney, Australia', href: null },
                { icon: FaPhone, text: '+61 493 324 731', href: 'tel:+61 493 324 731' },
                { icon: FaWhatsapp, text: 'WhatsApp Contact', href: 'https://wa.me/61493324731', color: 'blue' },
                { icon: FaEnvelope, text: 'info@wangamoort.com', href: 'mailto:info@wangamoort.com' }
              ].map((item, index) => (
                <li key={index} className="flex items-center space-x-3 group">
                  <div className="bg-blue-500/10 p-2 rounded-full group-hover:bg-blue-500/20 transition-colors">
                    <item.icon className="text-blue-400 text-sm" />
                  </div>
                  {item.href ? (
                    <a href={item.href} className="text-gray-300 hover:text-white transition-colors">
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-gray-300">{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs">
            <p className="text-gray-400">&copy; {currentYear} Wangamoort. All rights reserved.</p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Use</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 