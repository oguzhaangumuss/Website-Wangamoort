import Image from 'next/image'
import content from '../../../../public/content.json'
import { notFound } from 'next/navigation'

// Slug'ı servisle eşleştiren yardımcı fonksiyon
function findServiceBySlug(slug: string) {
  return content.services.find(service => service.slug === slug)
}

export const revalidate = 3600

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params
  const service = findServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  return (
    <main>
      {/* Hero Section - Responsive Height */}
      <div className="relative h-[300px] md:h-[420px] -mt-16">
        <div className="absolute inset-0">
          <div className="relative h-full">
            <div className="absolute inset-0 bg-black/50 z-10" />
            <div className="relative h-full">
              <Image
                src={service.heroImage}
                alt={service.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            </div>
          </div>
        </div>
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 pt-40 md:pt-40">{service.title}</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* First Part of Content */}
            <div className="space-y-4 md:space-y-6">
              <div className="prose prose-base md:prose-lg max-w-none">
                {service.description.split('\n\n').slice(0, 2).map((paragraph, index) => (
                  <p key={index} className="text-gray-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Service Image - Responsive Height */}
            <div className="relative h-[300px] md:h-[500px] rounded-xl overflow-hidden shadow-xl">
              <Image
                src={service.contentImage || service.heroImage}
                alt={`${service.title} Service`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              />
            </div>

            {/* Second Part of Content */}
            <div className="space-y-6 lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                {service.description.split('\n\n').slice(2).map((paragraph, index) => (
                  <p key={index} className="text-gray-600 leading-relaxed">
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
        </div>
      </div>
    </main>
  )
} 