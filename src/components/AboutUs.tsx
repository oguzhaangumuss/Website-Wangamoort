'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function AboutUs() {
  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4 max-w-[1400px]">
        {/* Header with Image */}
        <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden group">
          <Image
            src="/womanworker.jpeg"
            alt="Wangamoort About Us"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 md:gap-0">
              <div className="max-w-3xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-6">About Us</h2>
                {/* Mobil için kısa versiyon */}
                <p className="text-base md:hidden text-gray-200 leading-relaxed">
                  We are a dedicated provider of high-quality furniture and appliances, 
                  serving Sydney and its surrounding areas.
                </p>
                {/* Desktop için uzun versiyon */}
                <p className="hidden md:block text-xl text-gray-200 leading-relaxed">
                  We are a dedicated provider of high-quality furniture, appliances, and household essentials, 
                  proudly serving Sydney and its surrounding areas. Our commitment to quality and exceptional 
                  customer service sets us apart.
                </p>
              </div>
              
              <Link 
                href="/about"
                className="inline-flex items-center gap-2 bg-[#ffd230] text-[#152e1b] px-6 py-3 md:px-8 md:py-4 
                  rounded-lg transition-all duration-300 font-semibold hover:bg-white 
                  hover:shadow-xl hover:-translate-y-1 md:ml-8 text-sm md:text-base"
              >
                Learn More
                <svg 
                  className="w-4 h-4 md:w-5 md:h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 