'use client'
import { useState } from 'react'
import Image from 'next/image'
import { FaArrowRight } from 'react-icons/fa'

type Product = {
  id: number
  name: string
  image: string
  price: string
  category: string
}

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('bedroom')

  const products: Product[] = [
    // Bedroom Products
    {
      id: 1,
      name: "Modern Bedroom Set",
      image: "/products/bedroom-1.jpg",
      price: "Contact for price",
      category: "bedroom"
    },
    {
      id: 2,
      name: "Luxury Wardrobe",
      image: "/products/bedroom-2.jpg",
      price: "Contact for price",
      category: "bedroom"
    },
    {
      id: 3,
      name: "Dresser Set",
      image: "/products/bedroom-3.jpg",
      price: "Contact for price",
      category: "bedroom"
    },
    // Living Room Products
    {
      id: 4,
      name: "L-Shaped Sofa Set",
      image: "/products/living-1.jpg",
      price: "Contact for price",
      category: "living"
    },
    {
      id: 5,
      name: "Modern TV Unit",
      image: "/products/living-2.jpg",
      price: "Contact for price",
      category: "living"
    },
    {
      id: 6,
      name: "Armchair",
      image: "/products/living-3.jpg",
      price: "Contact for price",
      category: "living"
    },
    // Dining Room Products
    {
      id: 7,
      name: "8-Seater Dining Table",
      image: "/products/dining-1.jpg",
      price: "Contact for price",
      category: "dining"
    },
    {
      id: 8,
      name: "Console Buffet",
      image: "/products/dining-2.jpg",
      price: "Contact for price",
      category: "dining"
    },
    {
      id: 9,
      name: "Display Cabinet",
      image: "/products/dining-3.jpg",
      price: "Contact for price",
      category: "dining"
    },
  ]

  const categories = [
    { id: 'bedroom', name: 'Bedroom' },
    { id: 'living', name: 'Living Room' },
    { id: 'dining', name: 'Dining Room' },
  ]

  return (
    <section className="py-16 bg-gray-50 mb-32">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Products</h2>

        {/* Category Selection */}
        <div className="flex justify-center mb-12 space-x-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-6 py-3 rounded-full transition-all duration-300
                ${activeCategory === category.id 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-blue-50'}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products
            .filter(product => product.category === activeCategory)
            .map(product => (
              <div 
                key={product.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform 
                  duration-300 hover:scale-105"
              >
                {/* Product Image */}
                <div className="relative h-64 w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-300 hover:scale-110"
                  />
                </div>

                {/* Product Details */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600">{product.price}</p>
                  
                  {/* Details Button */}
                  <button className="mt-4 text-blue-600 hover:text-blue-700 flex items-center">
                    Details
                    <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 
            transition-colors duration-300 shadow-lg flex items-center mx-auto">
            View All Products
            <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  )
} 