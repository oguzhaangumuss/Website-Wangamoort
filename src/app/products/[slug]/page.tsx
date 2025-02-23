import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import ProductDetail from './ProductDetail'
import type { Database } from '@/types/database.types'
import { Metadata } from 'next'

export const revalidate = 3600

// Her iki parametre de Promise olmalı
type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function ProductPage({ params, searchParams }: Props) {
  const { slug } = await params
  const product = await getProduct(slug)
  
  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} />
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProduct(params.slug)
  
  return {
    title: `${product.name} - Wangamoort Furniture`,
    description: product.description || 'Quality furniture product from Wangamoort, Sydney\'s leading furniture supplier.',
    openGraph: {
      title: product.name,
      description: product.description,
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