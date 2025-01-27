// 'use client'
// import { useState } from 'react'
// import Image from 'next/image'
// import { FaSearch, FaFilter } from 'react-icons/fa'

// type Product = {
//   id: number
//   name: string
//   image: string
//   price: string
//   category: string
// }

// export default function ProductsPage() {
//   const [selectedCategory, setSelectedCategory] = useState('all')
//   const [searchQuery, setSearchQuery] = useState('')

//   const categories = [
//     'all',
//     'living',
//     'bedroom',
//     'dining',
//     'office',
//     'outdoor'
//   ]

//   const products: Product[] = [
//     // Bedroom Products
//     {
//         id: 1,
//         name: "Modern Bedroom Set",
//         image: "/products/bedroom-1.jpg",
//         price: "Contact for price",
//         category: "bedroom"
//       },
//       {
//         id: 2,
//         name: "Luxury Wardrobe",
//         image: "/products/bedroom-2.jpg",
//         price: "Contact for price",
//         category: "bedroom"
//       },
//       {
//         id: 3,
//         name: "Dresser Set",
//         image: "/products/bedroom-3.jpg",
//         price: "Contact for price",
//         category: "bedroom"
//       },
//       // Living Room Products
//       {
//         id: 4,
//         name: "L-Shaped Sofa Set",
//         image: "/products/living-1.jpg",
//         price: "Contact for price",
//         category: "living"
//       },
//       {
//         id: 5,
//         name: "Modern TV Unit",
//         image: "/products/living-2.jpg",
//         price: "Contact for price",
//         category: "living"
//       },
//       {
//         id: 6,
//         name: "Armchair",
//         image: "/products/living-3.jpg",
//         price: "Contact for price",
//         category: "living"
//       },
//       // Dining Room Products
//       {
//         id: 7,
//         name: "8-Seater Dining Table",
//         image: "/products/dining-1.jpg",
//         price: "Contact for price",
//         category: "dining"
//       },
//       {
//         id: 8,
//         name: "Console Buffet",
//         image: "/products/dining-2.jpg",
//         price: "Contact for price",
//         category: "dining"
//       },
//       {
//         id: 9,
//         name: "Display Cabinet",
//         image: "/products/dining-3.jpg",
//         price: "Contact for price",
//         category: "dining"
//       }
    
//     // Diğer ürünler...
//   ]

//   const filteredProducts = products.filter(product => {
//     const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
//     const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
//     return matchesCategory && matchesSearch
//   })

//   return (
//     <main className="pt-24">
//       {/* Hero Section */}
//       <section className="relative h-[35vh] flex items-center">
//         <Image
//           src="/images/about-us/quality/qualityYellow4.jpg"
//           alt="Our Products"
//           fill
//           className="object-cover"
//           priority
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/40" />
//         <div className="container mx-auto px-4 relative z-10">
//           <h1 className="text-6xl font-bold text-white mb-4">Our Products</h1>
//           <p className="text-xl text-gray-200 max-w-2xl">
//             Discover our extensive collection of quality furniture
//           </p>
//         </div>
//       </section>

//       {/* Filters Section */}
//       <section className="py-8 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row justify-between gap-4">
//             {/* Search Bar */}
//             <div className="relative flex-1 max-w-md">
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
//                   focus:ring-blue-500 focus:border-transparent"
//               />
//               <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             </div>

//             {/* Categories */}
//             <div className="flex gap-2 overflow-x-auto hide-scrollbar">
//               {categories.map((category) => (
//                 <button
//                   key={category}
//                   onClick={() => setSelectedCategory(category)}
//                   className={`px-4 py-2 rounded-full capitalize whitespace-nowrap
//                     ${selectedCategory === category
//                       ? 'bg-[#152e1b] text-white'
//                       : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
//                     }`}
//                 >
//                   {category}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Products Grid */}
//       <section className="py-12">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {filteredProducts.map((product) => (
//               <div
//                 key={product.id}
//                 className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl 
//                   transition-shadow duration-300"
//               >
//                 {/* Product Image */}
//                 <div className="relative h-64 overflow-hidden">
//                   <Image
//                     src={product.image}
//                     alt={product.name}
//                     fill
//                     className="object-cover group-hover:scale-110 transition-transform duration-300"
//                   />
//                 </div>

//                 {/* Product Info */}
//                 <div className="p-4">
//                   <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                     {product.name}
//                   </h3>
//                   <p className="text-[#152e1b] font-bold">{product.price}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </main>
//   )
// } 