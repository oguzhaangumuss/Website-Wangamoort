import type { Database } from './database.types'
/*
//export type Category = Database['public']['Tables']['categories']['Row']
//export type Subcategory = Database['public']['Tables']['subcategories']['Row'] & {
//  category?: Category
//}

export type Product = Database['public']['Tables']['products']['Row'] & {
  subcategory?: Subcategory
  variants?: ProductVariant[]
}

export type ProductVariant = Database['public']['Tables']['product_variants']['Row']
export type ProductImage = Database['public']['Tables']['product_images']['Row']

export type QuoteBasketItem = {
  product_id: string
  quantity: number
  selected_size: string
  selected_color: string
  price: number
  product_name?: string
}

export type Quote = Database['public']['Tables']['quotes']['Row'] & {
  basket: QuoteBasketItem[]
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
*/