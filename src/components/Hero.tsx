'use client'
import Image from 'next/image'
import { FaPhoneAlt } from 'react-icons/fa'

export default function Hero() {
  const scrollToHowToOrder = () => {
    const element = document.getElementById('how-to-order')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative h-screen flex items-end pb-28">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/wangamoort-house.jpg"
          alt="Furniture Background"
          fill
          priority
          className="object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#152e1b]/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl text-white">
          <h1 className="text-5xl font-bold mb-8">
          Your Trusted Partner for Home Design and Appliance Solutions
          </h1>
          <p className="text-2xl mb-10 text-gray-200">
          Delivering Quality, Speed, and Reliability—Tailored for Every Need.
          </p>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-wrap gap-4 group/buttons">
            <button 
              onClick={scrollToHowToOrder}
              className="bg-[#ffd230] text-[#152e1b] px-8 py-4 
                rounded-lg transition-all duration-300 flex items-center font-semibold
                shadow-lg hover:shadow-xl hover:-translate-y-1.5
                group-hover/buttons:bg-white hover:!bg-white">
              <span>Request a Quote</span>
            </button>
            <button className="bg-white text-[#152e1b] px-8 py-4 
              rounded-lg transition-all duration-300 flex items-center gap-2 font-semibold
              shadow-lg hover:shadow-xl hover:-translate-y-1.5
              group-hover/buttons:bg-[#ffd230] hover:!bg-[#ffd230]">
              <div className="bg-[#ffd230] p-2 rounded-full transition-colors duration-300
                group-hover/buttons:bg-white hover:!bg-white">
                <FaPhoneAlt className="text-[#152e1b]" />
              </div>
              <span>+61 493 324 731</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 