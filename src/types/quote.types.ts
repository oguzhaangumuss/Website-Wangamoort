type DeliveryAddress = {
  street: string
  city: string
  state: string
  postcode: string
}

type BasketItem = {
  product_id: string
  quantity: number
}

export type QuoteData = {
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