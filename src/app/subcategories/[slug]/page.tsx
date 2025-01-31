import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import type { Database } from '@/types/database.types'
import ProductGrid from '@/components/ProductGrid'

// Revalidate her saat
export const revalidate = 3600

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

async function getSubcategoryWithProducts(slug: string) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  
  try {
    console.log('Fetching subcategory with slug:', slug)

    // Önce subcategory'yi bulalım
    const { data: subcategory, error: subcategoryError } = await supabase
      .from('subcategories')
      .select(`
        *,
        category:categories (*)
      `)
      .eq('slug', slug as string)
      .single()

    if (subcategoryError || !subcategory) {
      console.error('Error fetching subcategory:', subcategoryError)
      return null
    }

    console.log('Found subcategory:', subcategory)

    // Sonra bu subcategory'ye ait ürünleri çekelim
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select(`
        *,
        subcategory:subcategories (*),
        variants:product_variants (
          *,
          images:product_images (*)
        )
      `)
      .eq('subcategory_id', subcategory.id)

    if (productsError) {
      console.error('Error fetching products:', productsError)
      return null
    }

    console.log('Found products:', products)

    return {
      ...subcategory,
      products: products
    }
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function SubcategoryPage({ params }: PageProps) {
  const { slug } = await params
  const subcategory = await getSubcategoryWithProducts(slug)

  if (!subcategory?.products) {
    console.error('Subcategory not found:', slug)
    notFound()
  }

  return (
    <ProductGrid 
      products={subcategory.products} 
      title={`${subcategory.name} Products`}
    />
  )
} 