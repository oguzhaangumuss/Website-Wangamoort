'use client'

import { useState } from 'react'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import ImageUpload from './ImageUpload'


// Database'e uygun image tipi
interface ProductImage {
    id?: string
    variant_id?: string
    url: string
    alt?: string | null
    is_default: boolean
  }

// Database'e uygun variant tipi
export interface VariantFormData {
  id?: string
  product_id?: string
  variant_name: string | null
  size: string
  color: string
  price: string
  stock_status: 'in_stock' | 'out_of_stock' | 'pre_order'
  images?: ProductImage[]
}

interface VariantFormProps {
  variants: VariantFormData[]
  onChange: (variants: VariantFormData[]) => void
  onDelete?: () => void
}

export default function VariantForm({ variants = [], onChange, onDelete }: VariantFormProps) {
  // Yeni variant ekleme
  const handleAddVariant = () => {
    onChange([
      ...variants,
      {
        variant_name: '',
        size: '',
        color: '',
        price: '',
        stock_status: 'in_stock',
        images: []
      }
    ])
  }

  const updateVariant = (index: number, field: keyof VariantFormData, value: any) => {
    const newVariants = [...variants]
    newVariants[index] = { ...newVariants[index], [field]: value }
    onChange(newVariants)
  }

  const handleImagesChange = (variantIndex: number, images: ProductImage[]) => {
    const newVariants = [...variants]
    newVariants[variantIndex] = { 
      ...newVariants[variantIndex], 
      images: images.map(img => ({
        ...img,
        variant_id: newVariants[variantIndex].id // Mevcut variant id'sini koru
      }))
    }
    onChange(newVariants)
  }

  const setDefaultImage = (variantIndex: number, imageIndex: number) => {
    const newVariants = [...variants]
    if (newVariants[variantIndex].images) {
      newVariants[variantIndex].images = newVariants[variantIndex].images?.map((img, idx) => ({
        ...img,
        is_default: idx === imageIndex
      }))
      onChange(newVariants)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Variants</h3>
        <button
          type="button"
          onClick={handleAddVariant}
          className="inline-flex items-center px-3 py-2 border border-transparent 
            text-sm font-medium rounded-md text-[var(--text-dark)] bg-[var(--primary-color)] 
            hover:bg-[#e6bd2b] transition-colors duration-200"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Variant
        </button>
      </div>

      {Array.isArray(variants) && variants.map((variant, index) => (
        <div 
          key={variant?.id || index} 
          className="relative p-6 bg-gray-50 rounded-lg border border-gray-200"
        >
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-600 
                transition-colors duration-200 rounded-full hover:bg-red-50"
              title="Delete variant"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mevcut form alanları */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Variant Name
              </label>
              <input
                type="text"
                value={variant.variant_name || ''}
                onChange={(e) => updateVariant(index, 'variant_name', e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            {/* Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Size
              </label>
              <input
                type="text"
                value={variant.size}
                onChange={(e) => updateVariant(index, 'size', e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Color
              </label>
              <input
                type="text"
                value={variant.color}
                onChange={(e) => updateVariant(index, 'color', e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                value={variant.price}
                onChange={(e) => updateVariant(index, 'price', e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            {/* Stock Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stock Status
              </label>
              <select
                value={variant.stock_status}
                onChange={(e) => updateVariant(index, 'stock_status', e.target.value as 'in_stock' | 'out_of_stock' | 'pre_order')}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="in_stock">In Stock</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="pre_order">Pre Order</option>
              </select>
            </div>
          </div>

          {/* ImageUpload komponenti */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images
            </label>
            <ImageUpload
              variantIndex={index}
              initialImages={variant.images}
              onImagesChange={(variantIndex, images) => handleImagesChange(variantIndex, images)}
              onSetDefaultImage={(imageIndex) => setDefaultImage(index, imageIndex)}
            />
          </div>
        </div>
      ))}
    </div>
  )
} 