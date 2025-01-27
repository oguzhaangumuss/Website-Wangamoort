'use client'
import { useState } from 'react'
import Image from 'next/image'
import { FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'

type Subcategory = {
  id: string
  name: string
  image: string
  slug: string
  category_id: string
}

type Category = {
  id: string
  name: string
  slug: string
}

type ProductsProps = {
  categories: Category[]
  subcategories: Subcategory[]
}

export default function Products({ categories, subcategories }: ProductsProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || '')

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>

        {/* Category Selection */}
        <div className="flex justify-center mb-8 space-x-4 overflow-x-auto pb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-5 py-2.5 rounded-full transition-all duration-300 whitespace-nowrap
                ${activeCategory === category.id 
                  ? 'bg-[#152e1b] text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Subcategories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {subcategories
            .filter(subcategory => subcategory.category_id === activeCategory)
            .map(subcategory => (
              <Link 
                key={subcategory.id}
                href={`/subcategories/${subcategory.slug}`}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform 
                  duration-300 hover:scale-105"
              >
                {/* Subcategory Image */}
                <div className="relative h-48 w-full">
                  <Image
                    src={subcategory.image || '/images/placeholder.jpg'}
                    alt={subcategory.name}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>

                {/* Subcategory Details */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{subcategory.name}</h3>
                  <div className="mt-2 text-[#152e1b] hover:text-[#1f432a] flex items-center">
                    View Products
                    <FaArrowRight className="ml-2" />
                  </div>
                </div>
              </Link>
            ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link 
            href="/products" 
            className="bg-[#152e1b] text-white px-6 py-2.5 rounded-lg hover:bg-[#1f432a] 
              transition-colors duration-300 shadow-md inline-flex items-center"
          >
            View All Categories
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
} 