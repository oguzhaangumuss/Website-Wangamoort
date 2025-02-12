import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import ProductDetail from './ProductDetail'
import type { Database } from '@/types/database.types'

export const revalidate = 3600

// Sayfa parametreleri için interface tanımlıyoruz
interface PageProps {
  params: {
    slug: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

async function getProduct(slug: string) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  
  try {
    console.log('Fetching product with slug:', slug)

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

    if (error) {
      console.error('Error details:', error)
      return null
    }

    console.log('Found product:', product)
    return product
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

// PageProps tipini kullanıyoruz
export default async function ProductPage({ params, searchParams }: PageProps) {
  const { slug } = params
  console.log('Requested slug:', slug) // Debug için ekleyelim
  
  const product = await getProduct(slug)
  
  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} />
}