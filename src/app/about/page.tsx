import Image from 'next/image'

export default function AboutPage() {
  const sections = [
    {
      title: "Quality and Trust",
      content: "We are a dedicated provider of high-quality furniture, appliances, and household essentials, proudly serving Sydney and its surrounding areas. Whether you&apos;re a business managing large-scale projects or an individual upgrading your home, we deliver tailored solutions designed to meet your unique needs. Our commitment to quality, speed, and exceptional customer service sets us apart, ensuring every client enjoys a seamless and satisfying experience.",
      image: "/about/quality.jpeg"
    },
    {
      title: "Wide Product Range",
      content: "Our product range includes a diverse selection of carefully chosen items, from modern furniture and home appliances to commercial kitchen equipment and office essentials",
      image: "/about/products3.jpeg"
    },
    {
      title: "Professional Service",
      content: "At the heart of our service is convenience. We handle every step of the process—from delivery to professional installation and rubbish removal. Our expert team ensures that all products are installed correctly, tested thoroughly, and ready for use. We also provide tailored advice to help you select items that perfectly match your space and requirements, whether it's a cozy apartment, a spacious office, or a bustling commercial kitchen.",
      image: "/about/installation.jpeg"
    },
    {
      title: "Local Understanding",
      content: "Operating locally in Sydney, we understand the specific needs of our community. Our goal is to offer a comprehensive, stress-free service that saves you time and effort while ensuring you receive the best value for your investment. With competitive pricing, exclusive bulk order discounts, and a focus on customer satisfaction, we are committed to being your trusted partner in furnishing and appliance solutions.",
      image: "/womanworker.jpeg"
    }
  ]

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center mt-[64px]">
        <Image
          src="/wangamoort3.jpeg"
          alt="About Wangamoort"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-6xl font-bold text-white mb-6">About Wangamoort</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Creating beautiful spaces with quality furniture and exceptional service.
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="space-y-32">
            {sections.map((section, index) => (
              <div 
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-12 items-center`}
              >
                <div className="flex-1">
                  <h2 className="text-4xl font-bold text-[#152e1b] mb-6">
                    {section.title}
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {section.content}
                  </p>
                </div>
                <div className="flex-1 relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 