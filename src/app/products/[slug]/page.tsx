import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import ProductDetail from './ProductDetail'
import type { Database } from '@/types/database.types'
import { Metadata } from 'next'

export const revalidate = 3600

// Props tipini PageProps constraint'ine uygun hale getirelim
type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

async function getProduct(slug: string) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  
  try {
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
      console.error('Error fetching product:', error)
      return null
    }

    return product
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

// Ve kullanımını da buna göre güncelleyelim
export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProduct(slug)
  
  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} />
}

// generateMetadata için de aynı şekilde Promise tipini kullanalım
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  
  if (!product) {
    return {
      title: 'Product Not Found - Wangamoort Furniture',
      description: 'The requested product could not be found.',
    }
  }
  
  return {
    title: `${product.name} - Wangamoort Furniture`,
    description: product.description || 'Quality furniture product from Wangamoort, Sydney\'s leading furniture supplier.',
    openGraph: {
      title: product.name,
      description: product.description || '',
      images: product.variants?.[0]?.images?.[0]?.url ? [
        {
          url: product.variants[0].images[0].url,
          width: 1200,
          height: 630,
        }
      ] : [],
    }
  }
}