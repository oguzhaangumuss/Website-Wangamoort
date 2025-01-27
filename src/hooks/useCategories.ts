import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Category, Subcategory } from '@/types/database.types'

interface CategoryWithSubs extends Category {
  subcategories: Subcategory[]
}

export function useCategories() {
  const [categories, setCategories] = useState<CategoryWithSubs[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCategories() {
      try {
        // Ana kategorileri al
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order('name')

        if (categoriesError) throw categoriesError

        // Her kategori için alt kategorileri al
        const categoriesWithSubs = await Promise.all(
          categoriesData.map(async (category) => {
            const { data: subcategories, error: subsError } = await supabase
              .from('subcategories')
              .select('*')
              .eq('category_id', category.id)
              .order('name')

            if (subsError) throw subsError

            return {
              ...category,
              subcategories: subcategories
            }
          })
        )

        setCategories(categoriesWithSubs)
      } catch (err) {
        setError('Failed to fetch categories')
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, loading, error }
} 