import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import ProductDetail from './ProductDetail'
import type { Database } from '@/types/database.types'

export const revalidate = 3600

async function getProduct(slug: string) {
  const supabase = createServerComponentClient<Database>({ cookies })
  
  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      subcategory: subcategories (
        *,
        category: categories (*)
      ),
      variants: product_variants (
        *,
        images: product_images (*)
      )
    `)
    .eq('slug', slug)
    .single()

  if (error || !product) {
    console.error('Error fetching product:', error)
    return null
  }

  return product
}

// Next.js 15 için güncellenmiş tip tanımlaması
type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} variant={product.variants?.[0]} />
}