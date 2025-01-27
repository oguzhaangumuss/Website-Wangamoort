import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database, Product, ProductVariant, ProductImage } from '@/types/database.types'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FaBoxOpen } from 'react-icons/fa'

// Revalidate her saat
export const revalidate = 3600

async function getSubcategoryProducts(slug: string) {
  const supabase = createServerComponentClient<Database>({ cookies })

  console.group('Subcategory Database Query')
  console.time('Database Query Duration')

  // Önce subcategory'yi bulalım
  const { data: subcategory, error: subcategoryError } = await supabase
    .from('subcategories')
    .select(`
      *,
      category:categories (*)
    `)
    .eq('slug', slug)
    .single()

  if (subcategoryError) {
    console.error('Error fetching subcategory:', subcategoryError)
    return null
  }

  // Sonra ürünleri çekelim
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('*')
    .eq('subcategory_id', subcategory.id)

  if (productsError) {
    console.error('Error fetching products:', productsError)
    return null
  }

  // Her ürün için varyantları ve resimleri ayrı ayrı çekelim
  const productsWithDetails = await Promise.all(
    products.map(async (product) => {
      // Ürünün varyantlarını çek
      const { data: variants } = await supabase
        .from('product_variants')
        .select('*')
        .eq('product_id', product.id)

      // Her varyant için resimleri çek
      const variantsWithImages = await Promise.all(
        (variants || []).map(async (variant) => {
          const { data: images } = await supabase
            .from('product_images')
            .select('*')
            .eq('variant_id', variant.id)

          return {
            ...variant,
            images: images || []
          }
        })
      )

      return {
        ...product,
        variants: variantsWithImages
      }
    })
  )

  console.log('Raw Subcategory:', subcategory)
  console.log('Products with Details:', productsWithDetails)
  console.log('Products Count:', productsWithDetails?.length || 0)
  console.log('Product Details:', productsWithDetails?.map((p: Product & { variants?: ProductVariant[] }) => ({
    id: p.id,
    name: p.name,
    variantsCount: p.variants?.length || 0,
    variants: p.variants?.map((v: ProductVariant & { images?: ProductImage[] }) => ({
      id: v.id,
      name: v.variant_name,
      size: v.size,
      color: v.color,
      imagesCount: v.images?.length || 0,
      images: v.images?.map((img: ProductImage) => ({
        id: img.id,
        url: img.url,
        is_default: img.is_default
      }))
    }))
  })))
  console.groupEnd()

  return {
    ...subcategory,
    products: productsWithDetails
  }
}

export default async function SubcategoryPage({
  params: { slug }
}: {
  params: { slug: string }
}) {
  console.group('Subcategory Page Render')
  console.time('Page Render Duration')
  
  console.log('Fetching data for slug:', slug)
  const subcategory = await getSubcategoryProducts(slug)

  if (!subcategory) {
    console.log('Subcategory not found')
    console.groupEnd()
    notFound()
  }

  console.log('Subcategory found:', {
    name: subcategory.name,
    category: subcategory.category?.name,
    productsCount: subcategory.products?.length || 0
  })
  
  console.timeEnd('Page Render Duration')
  console.groupEnd()

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[420px] -mt-24">
        <div className="absolute inset-0">
          <div className="relative h-full">
            <div className="absolute inset-0 bg-black/50 z-10" />
            <div className="relative h-full">
              <img
                src="/images/about-us/quality/qualityYellow4.jpg"
                alt="Products Hero Background"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="text-sm text-white/80 mb-2 pt-40">
            <Link href="/products" className="hover:text-white text-lg">
              Categories
            </Link>
            {' / '}
            <Link href="/products" className="hover:text-white text-lg">
              {subcategory.category?.name}
            </Link>
            {' / '}
            <span>{subcategory.name}</span>
          </div>
          <h1 className="text-5xl font-bold text-white">
            {subcategory.name}
          </h1>
        </div>
      </div>

      {/* Products Grid */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {subcategory.products?.map((product: Product & { variants?: ProductVariant[] }) => {
              // Her ürün için default resmi veya ilk resmi bul
              const defaultImage = product.variants
                ?.find(v => v.images?.some(img => img.is_default))
                ?.images?.find(img => img.is_default)?.url

              const firstImage = product.variants
                ?.find((v: any) => v.images?.length > 0)
                ?.images?.[0]?.url

              const productImage = defaultImage || firstImage || '/images/placeholder.jpg'

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group bg-white rounded-xl shadow-md overflow-hidden 
                    hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Product Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={productImage}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Contact for price
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* No Products Message */}
          {(!subcategory.products || subcategory.products.length === 0) && (
            <div className="min-h-[400px] flex items-center justify-center">
              <div className="text-center p-8 max-w-md">
                <div className="mb-6">
                  <FaBoxOpen className="w-16 h-16 mx-auto text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  No Products Found
                </h3>
                <p className="text-gray-600 mb-8">
                  We couldn't find any products in this category at the moment. 
                  Please check back later or explore other categories.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center px-6 py-3 border border-transparent 
                    text-base font-medium rounded-lg text-white bg-[#152e1b] 
                    hover:bg-[#1f432a] transition-colors duration-300 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#152e1b]
                    shadow-sm hover:shadow-md"
                >
                  Browse Other Categories
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 