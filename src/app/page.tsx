import Hero from '@/components/Hero'
import AboutUs from '@/components/AboutUs'
import Services from '@/components/Services'
import HowToOrder from '@/components/HowToOrder'
import Products from '@/components/Products'
import WhyChooseUs from '@/components/WhyChooseUs'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types/database.types'

async function getCategories() {
  const supabase = createServerComponentClient<Database>({ cookies })
  
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  return categories || []
}

async function getSubcategories() {
  const supabase = createServerComponentClient<Database>({ cookies })
  
  const { data: subcategories } = await supabase
    .from('subcategories')
    .select(`
      *,
      category:categories (*)
    `)
    .order('name')

  return subcategories || []
}

export default async function HomePage() {
  const [categories, subcategories] = await Promise.all([
    getCategories(),
    getSubcategories()
  ])

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <Services />

      {/* How To Order Section */}
      <HowToOrder />

      {/* Products Section */}
      <Products categories={categories} subcategories={subcategories} />

      {/* About Us Section */}
      <AboutUs />

      {/* Why Choose Us Section */}
      <WhyChooseUs />
    </div>
  )
} 