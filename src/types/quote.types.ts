export type DeliveryAddress = {
  street: string
  city: string
  state: string
  postcode: string
}

export type BasketItem = {
  product_id: string
  price: number
  quantity: number
  product_name: string
  variant_name: string
  selected_size?: string
  selected_color?: string
}

export type QuoteData = {
  case_id: number
  company_name?: string
  customer_first_name: string
  customer_last_name: string
  customer_email: string
  customer_phone: string
  delivery_address?: DeliveryAddress
  is_delivery: boolean
  is_installation: boolean
  is_rubbish_removal: boolean
  notes?: string
  basket: BasketItem[]
  status?: string
} 
