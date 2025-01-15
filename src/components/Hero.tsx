'use client'
import Image from 'next/image'
import { FaPhoneAlt } from 'react-icons/fa'

export default function Hero() {
  return (
    <section className="relative h-screen flex items-end pb-28">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/wangaMoort1.jpeg"
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
        <div className="max-w-2xl text-white">
          <h1 className="text-6xl font-bold mb-8">
            Your Trusted Furniture Supplier
          </h1>
          <p className="text-2xl mb-10 text-gray-200">
            The right address for quality and modern furniture solutions
          </p>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="bg-[#ffd230] hover:bg-white text-[#152e1b] px-8 py-4 
              rounded-lg transition-all duration-300 flex items-center font-semibold
              shadow-lg hover:shadow-xl hover:-translate-y-1.5 group">
              <span className="group-hover:text-[#152e1b]">Request a Quote</span>
            </button>
            <button className="bg-[#F9F9F9] hover:bg-[#ffd230] text-[#152e1b] px-8 py-4 
              rounded-lg transition-all duration-300 flex items-center gap-2 font-semibold
              shadow-lg hover:shadow-xl hover:-translate-y-1.5 group">
              <div className="bg-[#ffd230] group-hover:bg-white p-2 rounded-full transition-colors duration-300">
                <FaPhoneAlt className="text-[#152e1b]" />
              </div>
              <span className="group-hover:text-[#152e1b]">+61 493 324 731</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 