import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import ProductList from './ProductList'  // Client component'i ayrı oluşturacağız
import { Database } from '@/types/database.types'

export const revalidate = 3600 // 1 saat cache

async function getSubcategories() {
  const supabase = createServerComponentClient<Database>({ cookies })
  
  console.group('Database Queries')
  console.time('Subcategories Query')
  
  const { data: subcategories, error } = await supabase
    .from('subcategories')
    .select(`
      *,
      category:categories (*)
    `)
    .order('name')

  console.timeEnd('Subcategories Query')
  
  if (error) {
    console.error('Error:', error)
    return []
  }

  console.log('Raw Query Result:', { subcategories, error })
  console.groupEnd()
  
  return subcategories
}

export default async function ProductsPage() {
  console.group('Products Page Render')
  console.time('Total Render Time')
  
  const subcategories = await getSubcategories()
  console.log('Fetched Subcategories:', subcategories)

  // Kategorileri subcategories'den çıkar, tekrarları önle ve name,id olarak formatla
  const categories = Array.from(
    new Map(
      subcategories
        .filter(sub => sub.category) // undefined category'leri filtrele
        .map(sub => [
          sub.category.id, // Map key olarak category id kullan
          {
            id: sub.category.id,
            name: sub.category.name
          }
        ])
    ).values() // Sadece değerleri al
  )

  console.log('Processed Categories:', categories)
  console.timeEnd('Total Render Time')
  console.groupEnd()

  return (
    <ProductList 
      initialSubcategories={subcategories} 
      categories={categories} 
    />
  )
}
