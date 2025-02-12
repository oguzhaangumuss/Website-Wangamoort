import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'
import ProductGrid from '@/components/ProductGrid'
import NotFound from '@/components/not-found'
import ProductSkeleton from '@/components/skeletons/ProductSkeleton'
import { Suspense } from 'react'

// Cache ve revalidation ayarlarını güncelleyelim
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function getSubcategoryWithProducts(slug: string) {
  try {
    // Debug için log ekleyelim
    console.log('Fetching subcategory:', slug)

    const { data: subcategory, error: subcategoryError } = await supabase
      .from('subcategories')
      .select(`
        *,
        category:categories (*)
      `)
      .eq('slug', slug)
      .single()

    if (subcategoryError || !subcategory) {
      console.error('Subcategory error:', subcategoryError)
      return null
    }

    console.log('Found subcategory:', subcategory.id)

    // Ürün sorgusunu güncelleyelim
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
      // .eq('stock_status', 'in_stock')  // Bu filtreyi kaldıralım
      .order('created_at', { ascending: false }) // En yeni ürünler önce gelsin

    if (productsError) {
      console.error('Products error:', productsError)
      return null
    }

    console.log('Found products count:', products?.length)

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