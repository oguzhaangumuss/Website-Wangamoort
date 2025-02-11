import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'
import ProductGrid from '@/components/ProductGrid'
import NotFound from '@/components/not-found'
import ProductSkeleton from '@/components/skeletons/ProductSkeleton'
import { Suspense } from 'react'

// Revalidate her saat
export const revalidate = 3600
export const fetchCache = 'force-cache'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function getSubcategoryWithProducts(slug: string) {
  try {
    // Önce subcategory'yi bulalım
    const { data: subcategory, error: subcategoryError } = await supabase
      .from('subcategories')
      .select(`
        *,
        category:categories (*)
      `)
      .eq('slug', slug)
      .single()

    if (subcategoryError || !subcategory) {
      console.error('Error fetching subcategory:', subcategoryError)
      return null
    }

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
      .limit(50)

    if (productsError) {
      console.error('Error fetching products:', productsError)
      return null
    }

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

  return (
    <Suspense fallback={<ProductSkeleton />}>
      <SubcategoryContent slug={slug} />
    </Suspense>
  )
}

// Async içeriği ayrı bir component'e taşıyoruz
async function SubcategoryContent({ slug }: { slug: string }) {
  const subcategory = await getSubcategoryWithProducts(slug)

  if (!subcategory) {
    console.log('Subcategory not found:', slug)
    return <NotFound 
      title="Subcategory Not Found"
      message="The subcategory you are looking for doesn't exist or has been moved."
      buttonText="Back to Categories"
      buttonHref="/products"
    />
  }

  if (!subcategory.products || subcategory.products.length === 0) {
    console.log('No products found for subcategory:', slug)
    return <NotFound 
      title="No Products Found"
      message={`No products found in ${subcategory.name} subcategory.`}
      buttonText="Back to Categories"
      buttonHref="/products"
    />
  }

  return (
    <ProductGrid 
      products={subcategory.products} 
      title={`${subcategory.name} Products`}
    />
  )
} 