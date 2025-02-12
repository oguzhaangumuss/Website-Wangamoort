import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import ProductDetail from './ProductDetail'
import type { Database } from '@/types/database.types'

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