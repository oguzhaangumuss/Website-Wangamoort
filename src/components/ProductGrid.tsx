'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Product, ProductVariant, ProductImage, Subcategory } from '@/types/database.types'

// Genişletilmiş Product tipi
interface ExtendedProduct extends Product {
  variants?: (ProductVariant & {
    images?: ProductImage[]
  })[]
  subcategory?: Subcategory
}

type ProductGridProps = {
  products: ExtendedProduct[]
  title?: string
}

export default function ProductGrid({ products, title }: ProductGridProps) {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[420px] -mt-16 mb-16">
        <div className="absolute inset-0">
          <div className="relative h-full">
            <div className="absolute inset-0 bg-black/50 z-10" />
            <div className="relative h-full">
              <Image
                src="/images/about-us/quality/qualityYellow4.jpg"
                alt="Products Hero Background"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 pt-40">
            {title || 'Our Products'}
          </h1>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-3 md:grid-cols-4  gap-2 gap-2 sm:gap-4 md:gap-6">
          {products.map((product) => {
            const defaultImage = product.variants?.[0]?.images?.find(
              (img): img is ProductImage => img.is_default
            )?.url || '/placeholder.jpg'
            
            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group bg-white rounded-lg md:rounded-xl shadow-sm md:shadow-md 
                  overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={defaultImage}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 33vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {/* Recommended Badge */}
                  {product.is_recommended && (
                    <div className="absolute -top-5 right-0 z-10">
                      <Image
                        src="/recomended.png"
                        alt="Recommended Product"
                        width={200}
                        height={200}
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
                <div className="p-2 md:p-4">
                  <h3 className="text-base md:text-base lg:text-lg font-semibold text-gray-800 mb-1 md:mb-2 truncate">
                    {product.name}
                  </h3>
                  {product.subcategory && (
                    <p className="text-sm md:text-sm text-gray-600 truncate">
                      {product.subcategory.name}
                    </p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
} 