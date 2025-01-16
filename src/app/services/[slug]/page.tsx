import Image from 'next/image'
import content from '../../../../public/content.json'
import { notFound } from 'next/navigation'

// Slug'ı servisle eşleştiren yardımcı fonksiyon
function findServiceBySlug(slug: string) {
  return content.services.find(service => service.slug === slug)
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = findServiceBySlug(params.slug)

  if (!service) {
    notFound()
  }

  return (
    <main className="pt-24 bg-white">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center">
        <Image
          src={service.heroImage}
          alt={service.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-bold text-white mb-4">{service.title}</h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            {/* Service Description */}
            <div className="prose prose-lg max-w-none">
              {service.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-[#152e1b] mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-gray-600 mb-8">
                Contact us today to learn more about our {service.title.toLowerCase()} and how we can help you.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#152e1b] text-white px-8 py-4 
                    rounded-lg transition-all duration-300 font-semibold hover:bg-[#1f3f26] 
                    hover:shadow-xl hover:-translate-y-1"
                >
                  Contact Us
                </a>
                <a
                  href="tel:+61493324731"
                  className="inline-flex items-center gap-2 bg-[#ffd230] text-[#152e1b] px-8 py-4 
                    rounded-lg transition-all duration-300 font-semibold hover:bg-[#ffda5c] 
                    hover:shadow-xl hover:-translate-y-1"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 