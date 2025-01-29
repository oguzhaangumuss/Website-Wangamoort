'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import ProductList from './ProductList'
import { Database } from '@/types/database.types'

type Subcategory = {
  id: string
  name: string
  slug: string
  category_id: string
  created_at: string
  image: string  // undefined olmayacak şekilde
  category?: {
    id: string
    name: string
    slug: string
    created_at: string
    image: string  // undefined olmayacak şekilde
  }
}

export default function ProductsPage() {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    async function loadData() {
      try {
        console.group('Database Queries')
        console.time('Subcategories Query')

        const { data: subcategoriesData, error } = await supabase
          .from('subcategories')
          .select(`
            *,
            category:categories (*)
          `)
          .order('name')

        console.timeEnd('Subcategories Query')

        if (error) {
          console.error('Error:', error)
          return
        }

        console.log('Raw Query Result:', { subcategoriesData, error })

        setSubcategories(subcategoriesData || [])

        // Kategorileri subcategories'den çıkar, tekrarları önle ve name,id olarak formatla
        const processedCategories = Array.from(
          new Map(
            subcategoriesData
              .filter(sub => sub.category) // Map key olarak id kullanıyoruz
              .map(sub => [ 
                sub.category!.id,
                {
                  id: sub.category!.id,
                  name: sub.category!.name
                }
              ])
          ).values() // unique kategorileri al
        )

        setCategories(processedCategories)
        console.log('Processed Categories:', processedCategories)

      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
        console.groupEnd()
      }
    }

    loadData()
  }, [supabase])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <ProductList 
      initialSubcategories={subcategories} 
      categories={categories} 
    />
  )
}
