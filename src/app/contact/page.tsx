'use client'

import { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa'
import { toast } from 'sonner'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Form gönderme işlemi burada yapılacak
    toast.success('Message sent successfully!')
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <main className="pt-24 pb-16 bg-[#F9F9F9]">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-[#152e1b]">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about our products or services? We're here to help. Contact us through any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-[#152e1b]">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 
                    focus:ring-[#152e1b] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 
                    focus:ring-[#152e1b] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 
                    focus:ring-[#152e1b] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 
                    focus:ring-[#152e1b] focus:border-transparent outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#ffd230] text-[#152e1b] py-3 px-6 rounded-md 
                  hover:bg-[#152e1b] hover:text-white transition-colors font-semibold"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
              <h2 className="text-2xl font-semibold mb-6 text-[#152e1b]">Contact Information</h2>
              <div className="space-y-6">
                {[
                  { icon: FaMapMarkerAlt, text: 'Sydney, Australia', href: null },
                  { icon: FaPhone, text: '+61 493 324 731', href: 'tel:+61493324731' },
                  { icon: FaWhatsapp, text: 'WhatsApp Contact', href: 'https://wa.me/61493324731' },
                  { icon: FaEnvelope, text: 'info@wangamoort.com', href: 'mailto:info@wangamoort.com' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 group">
                    <div className="bg-[#ffd230] p-3 rounded-full group-hover:bg-[#152e1b] transition-colors">
                      <item.icon className="text-[#152e1b] group-hover:text-white w-5 h-5 transition-colors" />
                    </div>
                    {item.href ? (
                      <a 
                        href={item.href}
                        className="text-gray-600 hover:text-[#152e1b] transition-colors"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span className="text-gray-600">{item.text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Google Maps */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-[#152e1b]">Location</h2>
              <div className="aspect-video rounded-lg overflow-hidden border-2 border-[#ffd230]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d424146.10282421886!2d150.65178800550147!3d-33.84792702771172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b129838f39a743f%3A0x3017d681632a850!2sSydney%20NSW%2C%20Australia!5e0!3m2!1sen!2str!4v1696779667343!5m2!1sen!2str"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 