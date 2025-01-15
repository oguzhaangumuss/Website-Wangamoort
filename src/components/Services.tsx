'use client'
import Image from 'next/image'

export default function Services() {
  const services = [
    {
      title: "Furniture & Appliances Supply",
      description: "We provide furniture, appliances, and all household essentials for both small and large-scale businesses as well as individual customers.",
      image: "/inst.avif",
    },
    {
      title: "Delivery Services",
      description: "We deliver all your products safely and efficiently to your specified address.",
      image: "/rubbish.avif",
    },
    {
      title: "Professional Installation",
      description: "Our expert team handles the installation and testing of all products for a hassle-free experience.",
      image: "/inst.avif",
    },
    {
      title: "Rubbish Removal",
      description: "We take care of all packaging and installation waste, leaving your space clean and tidy.",
      image: "/rubbish.avif",
    },
    {
      title: "Expert Advice & Customization",
      description: "We help you choose the right products and sizes tailored to your home or space needs.",
      image: "/inst.avif",
    }
  ]

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-2 max-w-[1400px]">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-[#152e1b] mb-6">OUR SERVICES</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We provide comprehensive furniture solutions for both residential and commercial spaces. 
            Our team is committed to delivering exceptional service and quality, ensuring your complete satisfaction.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-md h-[250px] cursor-pointer"
            >
              {/* Image */}
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent 
                opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center p-5">
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
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 