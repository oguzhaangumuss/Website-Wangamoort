'use client'

import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import { IoArrowBack, IoClose } from "react-icons/io5"
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
  
  // Sadece stokta olan varyantları filtrele
  const availableVariants = useMemo(() => 
    product.variants?.filter(v => 
      v.stock_status === 'in_stock' || v.stock_status === 'available'
    ) || [], 
    [product.variants]
  )

  // İlk stokta olan varyantı bul
  const firstAvailableVariant = useMemo(() => 
    availableVariants[0], 
    [availableVariants]
  )

  // Stokta olan varyantlardan benzersiz size ve renkleri hesapla
  const uniqueSizes = useMemo(() => 
    [...new Set(availableVariants.map(v => v.size))],
    [availableVariants]
  )

  const uniqueColors = useMemo(() => 
    [...new Set(availableVariants.map(v => v.color))],
    [availableVariants]
  )

  // İlk varyantın size ve color değerlerini başlangıç değeri olarak kullan
  const [selectedSize, setSelectedSize] = useState<string>(firstAvailableVariant?.size || '')
  const [selectedColor, setSelectedColor] = useState<string>(firstAvailableVariant?.color || '')
  const [quantity, setQuantity] = useState(1)

  // Seçili varyantın resmini başlangıç değeri olarak ayarla
  const [selectedImage, setSelectedImage] = useState(
    firstAvailableVariant?.images?.find(img => img.is_default)?.url ||
    firstAvailableVariant?.images?.[0]?.url
  )
  const [isFullScreen, setIsFullScreen] = useState(false)

  // Seçili kombinasyona göre stokta olan varyantı bul
  const selectedVariant = useMemo(() => {
    return availableVariants.find(v => 
      v.size === selectedSize && 
      v.color === selectedColor
    ) || firstAvailableVariant // Eğer seçili kombinasyon bulunamazsa ilk varyantı kullan
  }, [availableVariants, selectedSize, selectedColor, firstAvailableVariant])

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

  // Sepete ekle butonu için stok kontrolü
  const isOutOfStock = !selectedVariant || 
    (selectedVariant.stock_status !== 'in_stock' && 
     selectedVariant.stock_status !== 'available')

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
      {/* Full Screen Modal */}
      {isFullScreen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsFullScreen(false)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setIsFullScreen(false)}
          >
            <IoClose className="w-8 h-8" />
          </button>
          <div className="relative w-full h-full max-w-4xl max-h-[90vh]">
            <Image
              src={selectedImage || '/placeholder.jpg'}
              alt={product.name}
              fill
              className="object-contain"
              quality={100}
            />
          </div>
        </div>
      )}

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
            <div 
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setIsFullScreen(true)}
            >
              <Image
                src={selectedImage || '/placeholder.jpg'}
                alt={product.name}
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Recommended Badge */}
              {product.is_recommended && (
                <div className="absolute -top-5 right-0 z-10">
                  <Image
                    src="/recomended.png"
                    alt="Recommended Product"
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>
              )}
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
                    className="object-contain p-1"
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

            </h1>

            {/* Fiyat
            <div className="text-2xl font-bold text-[#152e1b]">
              Contact for price
            </div>
            */}
            

            {/* Varyant Seçimi */}
            <div className="space-y-4">
              {/* Size seçimi sadece stokta olan size'lar için gösterilsin */}
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

              {/* Renk seçimi sadece stokta olan renkler için */}
              {uniqueColors.length > 1 && (
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

            {/* Add to Cart Butonu - Stok durumuna göre disable edilsin */}
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`w-full mt-6 py-3 px-8 rounded-md transition-colors 
                flex items-center justify-center space-x-2
                ${isOutOfStock 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-[#152e1b] text-white hover:bg-[#1f4429]'
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              <span>{isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
            </button>

            {/* Ürün Açıklaması - Ana ürün ve Variant */}
            <div className="prose prose-sm max-w-none mt-6">
              <h3 className="text-sm font-medium text-gray-900">Description</h3>
              <div className="mt-2 space-y-4">
                {/* Ana ürün açıklaması */}
                {product.description && (
                  <div className="text-gray-600 whitespace-pre-wrap break-words max-w-full">
                    {product.description}
                  </div>
                )}
                
                {/* Variant açıklaması - varsa göster */}
                {selectedVariant?.description && (
                  <div className="text-gray-600 whitespace-pre-wrap break-words max-w-full border-t pt-4">
                    <span className="font-medium block mb-2">
                      {selectedVariant.variant_name || 'Variant'} Details:
                    </span>
                    {selectedVariant.description}
                  </div>
                )}
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