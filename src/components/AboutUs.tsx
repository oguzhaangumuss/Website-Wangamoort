'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function AboutUs() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-[1400px]">
        {/* Header with Image */}
        <div className="relative w-full h-[500px] rounded-2xl overflow-hidden group">
          <Image
            src="/wangamoort3.jpeg"
            alt="Wangamoort Furniture"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
            <div className="flex justify-between items-end">
              <div className="max-w-3xl">
                <h2 className="text-5xl font-bold mb-6">About Us</h2>
                <p className="text-xl text-gray-200 leading-relaxed">
                  We are a dedicated provider of high-quality furniture, appliances, and household essentials, 
                  proudly serving Sydney and its surrounding areas. Our commitment to quality and exceptional 
                  customer service sets us apart.
                </p>
              </div>
              
              <Link 
                href="/about"
                className="inline-flex items-center gap-2 bg-[#ffd230] text-[#152e1b] px-8 py-4 
                  rounded-lg transition-all duration-300 font-semibold hover:bg-white 
                  hover:shadow-xl hover:-translate-y-1 ml-8"
              >
                Learn More
                <svg 
                  className="w-5 h-5" 
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