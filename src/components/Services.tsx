'use client'
import Image from 'next/image'
import Link from 'next/link'
import content from '../../public/content.json'

export default function Services() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-2 max-w-[1400px]">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-[#152e1b] mb-5">OUR SERVICES</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We provide comprehensive furniture solutions for both residential and commercial spaces. 
            Our team is committed to delivering exceptional service and quality, ensuring your complete satisfaction.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
          {content.services.map((service, index) => (
            <Link
              key={index}
              href={`/services/${service.slug}`}
              className="group relative overflow-hidden rounded-lg shadow-md h-[290px] cursor-pointer"
            >
              {/* Image */}
              <Image
                src={service.heroImage}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent 
                opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                {/* Title */}
                <h3 className="text-xl font-bold text-white text-center mb-3 
                  transform transition-all duration-500 group-hover:opacity-0 
                  group-hover:translate-y-4 drop-shadow-lg">
                  {service.title}
                </h3>

                {/* Description */}
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <p className="text-white text-center text-base leading-relaxed opacity-0 
                    transform transition-all duration-500 translate-y-4 
                    group-hover:opacity-100 group-hover:translate-y-0 
                    line-clamp-5 max-h-[200px] overflow-hidden">
                    {service.shortDescription}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
} 