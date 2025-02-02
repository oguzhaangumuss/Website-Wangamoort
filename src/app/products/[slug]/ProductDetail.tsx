'use client'

import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import { IoArrowBack } from "react-icons/io5"
import type { Database, ProductVariant,CartItem } from '@/types/database.types'
import { useCart } from '@/contexts/CartContext'


type Product = Database['public']['Tables']['products']['Row'] & {
  subcategory: Database['public']['Tables']['subcategories']['Row'] & {
    category: Database['public']['Tables']['categories']['Row']
  }
  variants: (Database['public']['Tables']['product_variants']['Row'] & {
    images: Database['public']['Tables']['product_images']['Row'][]
  })[]
}

export default function ProductDetail({ product, variant }: { product: Product, variant: typeof product.variants[0] }) {
  const { addToCart } = useCart()
  const [selectedImage, setSelectedImage] = useState(
    variant?.images?.find(img => img.is_default)?.url ||
    variant?.images?.[0]?.url
  )

  // Benzersiz size ve renkleri başlangıçta hesapla
  const uniqueSizes = [...new Set(product.variants?.map(v => v.size))]
  const uniqueColors = useMemo(() => 
    [...new Set(product.variants?.map(v => v.color))],
    [product.variants]
  )

  const [selectedSize, setSelectedSize] = useState<string>(() => {
    return uniqueSizes.length === 1 ? uniqueSizes[0] : ''
  })
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [quantity, setQuantity] = useState(1)

  // Seçili kombinasyona göre varyantı bul
  const selectedVariant = useMemo(() => {
    return product.variants?.find(v => 
      v.size === selectedSize && 
      v.color === selectedColor
    )
  }, [product.variants, selectedSize, selectedColor])

  // Component mount olduğunda veya size değiştiğinde ilk rengi seç
  useEffect(() => {
    if (uniqueColors?.length === 1) {
      setSelectedColor(uniqueColors[0])
    } else if (uniqueColors?.length > 0 && !uniqueColors.includes(selectedColor)) {
      setSelectedColor(uniqueColors[0])
    }
  }, [uniqueColors, selectedSize, selectedColor])

  // selectedVariant değiştiğinde ana resmi güncelle
  useEffect(() => {
    if (selectedVariant) {
      const defaultImage = selectedVariant.images?.find(img => img.is_default)?.url
      const firstImage = selectedVariant.images?.[0]?.url
      setSelectedImage(defaultImage || firstImage)
    }
  }, [selectedVariant])

  // Tekrarlanan resimleri filtrele
  const getUniqueImages = (variant: ProductVariant | undefined) => {
    if (!variant?.images) return []
    
    const uniqueUrls = new Set()
    return variant.images?.filter(img => {
      if (!uniqueUrls.has(img.url)) {
        uniqueUrls.add(img.url)
        return true
      }
      return false
    }) || []
  }

  // Benzersiz resimleri al
  const uniqueImages = getUniqueImages(selectedVariant)

  const handleAddToCart = () => {
    if (uniqueSizes.length > 1 && !selectedSize) {
      toast.error('Please select a size')
      return
    }
    if (uniqueColors.length > 1 && !selectedColor) {
      toast.error('Please select a color')
      return
    }
    if (!selectedVariant) {
      toast.error('Selected combination is not available')
      return
    }

    const cartItem: CartItem = {
      product_id: product.id,
      name: product.name,
      image: selectedVariant.images?.find(img => img.is_default)?.url || 
             selectedVariant.images?.[0]?.url || '',
      quantity,
      size: selectedSize,
      color: selectedColor,
      price: selectedVariant.price || 0,
      variant_id: selectedVariant.id,
      variant_name: selectedVariant.variant_name || '',
      subcategory_name: product.subcategory?.name || ''
    }

    addToCart(cartItem)
    toast.success('Added to cart')
  }

  return (
    <main className="pt-24">
      <div className="container mx-auto px-4">
        <Link
          href="/products"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-[#152e1b] 
            transition-colors mb-6 group"
        >
          <IoArrowBack className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Products</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sol: Resim Galerisi */}
          <div className="space-y-4">
            {/* Ana Resim */}
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={selectedImage || '/images/about-us/quality/qualityYellow4.jpg'}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            
            {/* Küçük Resimler */}
            <div className="grid grid-cols-4 gap-2">
              {uniqueImages.map((image: { id: string, url: string, alt: string }) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(image.url)}
                  className={`relative aspect-square rounded-lg overflow-hidden 
                    ${selectedImage === image.url ? 'ring-2 ring-[#152e1b]' : ''}`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Sağ: Ürün Bilgileri */}
          <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500">
                {product.subcategory?.category?.name}
               / 
              <Link href={`/subcategories/${product.subcategory?.slug}`} className="hover:text-[#152e1b] hover:underline transition-colors">
                {product.subcategory?.name}
              </Link>
            </div>

            {/* Ürün Başlığı */}
            <h1 className="text-3xl font-bold text-gray-900">
              {product.name}
              {selectedVariant?.variant_name && ` - ${selectedVariant.variant_name}`}
              {product.subcategory?.name && ` ${product.subcategory.name}`}
            </h1>

            {/* Fiyat
            <div className="text-2xl font-bold text-[#152e1b]">
              Contact for price
            </div>
            */}
            

            {/* Varyant Seçimi */}
            <div className="space-y-4">
              {/* Size seçimi sadece birden fazla size varsa gösterilsin */}
              {uniqueSizes.length > 1 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {uniqueSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`
                          px-4 py-2 text-sm rounded-md border
                          ${selectedSize === size 
                            ? 'border-[#152e1b] bg-[#152e1b] text-white' 
                            : 'border-gray-300 hover:border-[#152e1b]'
                          }
                        `}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Renk seçimi */}
              { uniqueColors.length > 1 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {uniqueColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`
                          px-4 py-2 text-sm rounded-md border
                          ${selectedColor === color 
                            ? 'border-[#152e1b] bg-[#152e1b] text-white' 
                            : 'border-gray-300 hover:border-[#152e1b]'
                          }
                        `}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Miktar Seçimi */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
                <div className="flex items-center space-x-3 mt-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 border rounded-md hover:bg-gray-50 w-8 h-8 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 border rounded-md hover:bg-gray-50 w-8 h-8 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart Butonu */}
            <button
              onClick={handleAddToCart}
              className="w-full mt-6 bg-[#152e1b] text-white py-3 px-8 rounded-md 
                hover:bg-[#1f4429] transition-colors flex items-center justify-center space-x-2"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              <span>Add to Cart</span>
            </button>

            {/* Ürün Açıklaması */}
            <div className="prose prose-sm max-w-none">
              <h3 className="text-sm font-medium text-gray-900">Description</h3>
              <div className="mt-2 text-gray-600 whitespace-pre-line">
                {product.description}
              </div>
            </div>

            {/* Seçili varyant bilgisi */}
            {selectedVariant && (
              <div className="mt-4 text-sm text-gray-500">
                Selected: {selectedSize} - {selectedColor}
              </div>
            )}

            

            {/* İletişim Butonu */}
            <button className="w-full bg-[#152e1b] text-white py-3 px-8 rounded-md hover:bg-[#1f4429] transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </main>
  )
} 