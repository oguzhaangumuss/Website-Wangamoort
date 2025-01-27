'use client'
import { useState } from 'react'
import Image from 'next/image'
import { FaSearch, FaFilter } from 'react-icons/fa'
import Link from 'next/link'

type Subcategory = {
  id: string
  name: string
  image: string
  category_id: string
  slug: string
}

type Category = {
  id: string
  name: string
}

type ProductListProps = {
  initialSubcategories: Subcategory[]
  categories: Category[]
}

export default function ProductList({ 
  initialSubcategories = [], 
  categories = [] 
}: ProductListProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSubcategories = (initialSubcategories || []).filter(subcategory => {
    const matchesCategory = selectedCategory === 'all' || subcategory.category_id === selectedCategory
    const matchesSearch = subcategory.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[420px] -mt-16">
        <div className="absolute inset-0">
          <div className="relative h-full">
            <div className="absolute inset-0 bg-black/50 z-10" />
            <div className="relative h-full">
              <img
                src="/images/about-us/quality/qualityYellow4.jpg"
                alt="Products Hero Background"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-5xl font-bold text-white mb-4 pt-40">Our Categories</h1>
          <p className="text-xl text-white/90">
            Explore our product categories
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filters Section */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search subcategories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                    focus:ring-blue-500 focus:border-transparent"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              {/* Categories */}
              <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-full whitespace-nowrap
                    ${selectedCategory === 'all'
                      ? 'bg-[#152e1b] text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full capitalize whitespace-nowrap
                      ${selectedCategory === category.id
                        ? 'bg-[#152e1b] text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Subcategories Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredSubcategories.map((subcategory) => (
                <Link
                  key={subcategory.id}
                  href={`/subcategories/${subcategory.slug}`}
                  className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl 
                    transition-shadow duration-300"
                >
                  {/* Subcategory Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={subcategory.image || '/images/placeholder.jpg'} // Placeholder image ekleyin
                      alt={subcategory.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Subcategory Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {subcategory.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Click to view products
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 