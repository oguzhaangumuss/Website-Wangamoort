import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import type { Database } from '@/types/database.types'
import ProductList from '@/app/products/ProductList'

// Revalidate her saat
export const revalidate = 3600

async function getSubcategoryWithProducts(slug: string) {
  const supabase = createServerComponentClient<Database>({ cookies })
  
  const { data: subcategory, error: subcategoryError } = await supabase
    .from('subcategories')
    .select(`
      *,
      category:categories (*),
      products (
        *,
        variants:product_variants (
          *,
          images:product_images (*)
        )
      )
    `)
    .eq('slug', slug)
    .single()

  if (subcategoryError || !subcategory) {
    console.error('Error:', subcategoryError)
    return null
  }

  return subcategory
}

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function SubcategoryPage({ params }: PageProps) {
  const { slug } = await params
  const subcategory = await getSubcategoryWithProducts(slug)

  if (!subcategory) {
    notFound()
  }

  return (
    <ProductList 
      initialSubcategories={[subcategory]}
      categories={[subcategory.category]}
    />
  )
} 