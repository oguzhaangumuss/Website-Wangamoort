export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
          image?: string
        }
        Insert: {
          name: string
          slug: string
          image?: string
        }
      }
      subcategories: {
        Row: {
          id: string
          category_id: string
          name: string
          slug: string
          created_at: string
          image?: string
        }
        Insert: {
          category_id: string
          name: string
          slug: string
          image?: string
        }
      }
      products: {
        Row: {
          id: string
          subcategory_id: string
          name: string
          slug: string
          description?: string
          stock_status: string
          created_at: string
          updated_at: string
          is_recommended: boolean
        }
        Insert: {
          subcategory_id: string
          name: string
          slug: string
          description?: string
          stock_status?: string
          is_recommended?: boolean
        }
      }
      product_variants: {
        Row: {
          id: string
          product_id: string
          variant_name: string | null
          size: string
          color: string
          price: number
          stock_status: string
          created_at: string
          description?: string | null
        }
        Insert: {
          product_id: string
          variant_name?: string
          size: string
          color: string
          price: number
          stock_status?: string
          description?: string | null
        }
      }
      product_images: {
        Row: {
          id: string
          variant_id: string
          url: string
          alt: string
          created_at: string
          is_default: boolean
        }
        Insert: {
          variant_id: string
          url: string
          alt: string
          is_default: boolean
        }
      }
      quotes: {
        Row: {
          id: string
          company_name?: string
          customer_first_name: string
          customer_last_name: string
          customer_email: string
          customer_phone: string
          basket: {
            product_id: string
            quantity: number
            selected_size?: string
            selected_color?: string
            price: number
          }[]
          notes?: string
          is_rubbish_removal: boolean
          is_installation: boolean
          is_delivery: boolean
          delivery_address?: {
            street: string
            city: string
            state: string
            postcode: string
          }
          case_id?: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          company_name?: string
          customer_first_name: string
          customer_last_name: string
          customer_email: string
          customer_phone: string
          basket: {
            product_id: string
            quantity: number
            selected_size?: string
            selected_color?: string
            price: number
          }[]
          notes?: string
          is_rubbish_removal?: boolean
          is_installation?: boolean
          is_delivery?: boolean
          delivery_address?: {
            street: string
            city: string
            state: string
            postcode: string
          }
          case_id?: string
          status?: string
        }
      }
    }
  }
}

// Yardımcı Tipler
export type Category = Database['public']['Tables']['categories']['Row']
export type Subcategory = Database['public']['Tables']['subcategories']['Row'] & {
  category?: Category
}
export type Product = Database['public']['Tables']['products']['Row']
export type ProductVariant = Database['public']['Tables']['product_variants']['Row'] & {
  images?: ProductImage[]
}
export type ProductImage = Database['public']['Tables']['product_images']['Row']
export type Quote = Database['public']['Tables']['quotes']['Row']

// Form Tipleri
export interface QuoteFormData {
  company_name?: string
  customer_first_name: string
  customer_last_name: string
  customer_email: string
  customer_phone: string
  notes?: string
  is_rubbish_removal: boolean
  is_installation: boolean
  is_delivery: boolean
  delivery_address?: {
    street: string
    city: string
    state: string
    postcode: string
  }
  case_id?: string
}

// Sepet Elemanı Tipi
export interface CartItem {
  product_id: string
  name: string
  variant_id: string
  variant_name: string
  size: string
  color: string
  quantity: number
  image: string
  subcategory_name: string
  price: number
}

// API Yanıt Tipleri
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export type ProductsResponse = ApiResponse<Product[]>
export type ProductVariantsResponse = ApiResponse<ProductVariant[]>
export type ProductImagesResponse = ApiResponse<ProductImage[]>
export type QuoteResponse = ApiResponse<Quote>

export type Supplier = {
  id: number
  name: string
  contact_person?: string | null
  email?: string | null
  phone?: string | null
  address?: string | null
  created_at?: string
  updated_at?: string
}