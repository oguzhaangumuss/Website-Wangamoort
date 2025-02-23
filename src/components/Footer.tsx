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
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById('services')
    if (element) {
      const yOffset = -100 // Navbar yüksekliği için offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      })
    }
  }

  return (
    <footer className="relative mt-32 bg-gradient-to-br from-[#1f2937] via-[#274159] to-[#1f2937]">
      {/* Wave SVG with gradient */}
      <div className="absolute -top-16 left-0 w-full overflow-hidden">
        <svg
          viewBox="0 0 1440 54"
          className="w-full h-16"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="0" x2="100%" y2="0">
              <stop offset="0%" stopColor="#1f2937" />
              <stop offset="50%" stopColor="#274159" />
              <stop offset="100%" stopColor="#1f2937" />
            </linearGradient>
          </defs>
          <path 
            fill="url(#waveGradient)"
            d="M0,32L48,26.7C96,21,192,11,288,16C384,21,480,43,576,48C672,53,768,43,864,37.3C960,32,1056,32,1152,37.3C1248,43,1344,53,1392,58.7L1440,64L1440,54L1392,54C1344,54,1248,54,1152,54C1056,54,960,54,864,54C768,54,672,54,576,54C480,54,384,54,288,54C192,54,96,54,48,54L0,54Z" 
          />
        </svg>
      </div>

      {/* Scroll to Top Button */}
      <button 
        onClick={scrollToTop}
        className="absolute -top-4 right-8 bg-[#ffd230] text-[#152e1b] p-3 rounded-full shadow-lg
          hover:bg-white transition-all duration-300 group z-10"
      >
        <FaArrowUp className="text-base group-hover:-translate-y-1 transition-transform duration-300" />
      </button>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              {/*<img src="/logo4.png" alt="Wangamoort Logo" className="h-10 w-auto" />*/}
              <h3 className="text-[#ffd230] text-lg font-bold tracking-wide">Wangamoort</h3>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
            From compact homes to large-scale projects, enjoy seamless delivery, expert installation, and exceptional customer service.
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
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Our Products', href: '/products' },
                { name: 'Our Services', href: '#services', onClick: scrollToServices },
                { name: 'Contact', href: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    onClick={item.onClick}
                    className="text-gray-300 hover:text-white transition-colors hover:translate-x-2 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Categories */}
          <div>
            <h3 className="text-white text-base font-bold mb-4 pb-2 tracking-wider uppercase border-b-2 border-blue-500/30">
              Services
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: 'Delivery Service', href: '/services/delivery-service' },
                { name: 'Professional Installation Service', href: '/services/professional-installation-service' },
                { name: 'Rubbish Removal Service', href: '/services/rubbish-removal-service' },
                { name: 'Expert Guidance & Customization', href: '/services/expert-guidance-customization' }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors hover:translate-x-2 inline-block"
                  >
                    {item.name}
                  </Link>
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
                { icon: FaMapMarkerAlt, text: 'Culloden Road Marsfield 2122 NSW Sydney Australia', href: null },
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
        <div className="container mx-auto px-4 py-4 ">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="text-gray-400">&copy; {currentYear} Wangamoort. All rights reserved. | Website Designed by <a href="https://www.linkedin.com/in/oguzhaangumuss/" target="_blank" className="text-blue-500 hover:text-blue-600 transition-colors">Oğuzhan Gümüş</a></p>
            <div className="flex space-x-4 mt-2 md:mt-0">
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 