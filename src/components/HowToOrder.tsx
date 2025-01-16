'use client'
import { FaShoppingCart, FaTruck, FaFileInvoice, FaCalendarCheck, FaHome } from 'react-icons/fa'
import Image from 'next/image'

export default function HowToOrder() {
  const steps = [
    {
      number: "1",
      title: "Choose Your Products",
      description: "Browse our extensive range and select the items you need.",
      icon: FaShoppingCart
    },
    {
      number: "2",
      title: "Request Services",
      description: "Fill out a quick form to request delivery, installation, rubbish removal, or any additional service. It takes less than 5 minutes and speeds up your quote process.",
      icon: FaTruck
    },
    {
      number: "3",
      title: "Receive a Quote",
      description: "Submit your request, and we'll get back to you the same day with your quote via call or email.",
      icon: FaFileInvoice
    },
    {
      number: "4",
      title: "Confirm & Schedule",
      description: "Approve the quote, and let us handle the rest.",
      icon: FaCalendarCheck
    },
    {
      number: "5",
      title: "Enjoy Your Space",
      description: "Sit back, relax, and enjoy your perfectly prepared home or business space!",
      icon: FaHome
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-[1400px]">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-[#152e1b] mb-4 tracking-tight">
            How to Order
          </h2>
          <div className="w-20 h-1 bg-[#ffd230] mx-auto rounded-full mb-4" />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div 
                key={index}
                className="bg-white rounded-lg p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] 
                  hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-500 
                  transform hover:-translate-y-1.5 relative group"
              >
                {/* Step Number & Icon Container */}
                <div className="flex items-center gap-3 mb-4">
                  {/* Step Number */}
                  <div className="w-10 h-10 bg-[#ffd230] rounded-full flex items-center justify-center
                    text-[#152e1b] font-bold text-lg group-hover:scale-110 transition-transform
                    duration-500 shadow-md">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="text-[#152e1b] opacity-80 text-xl group-hover:scale-110 
                    transition-transform duration-500">
                    <Icon />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#152e1b] mb-2 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {step.description}
                </p>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 
                    bg-gray-300 transform -translate-y-1/2" />
                )}
              </div>
            )
          })}
        </div>

        {/* Hero Image - moved to bottom */}
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
          <Image
            src="/images/about-us/quality/qualityYellow3.jpg"
            alt="Wangamoort Furniture Delivery Service"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>
    </section>
  )
} 