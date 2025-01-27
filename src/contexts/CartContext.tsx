'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import type { CartItem } from '@/types/database.types'

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  cartTotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartTotal, setCartTotal] = useState(0)

  // Cart'ı localStorage'dan yükle
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Cart güncellendiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
    // Toplam fiyatı hesapla
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    setCartTotal(total)
  }, [cart])

  const addToCart = (newItem: CartItem) => {
    console.log('CartContext - Adding item:', newItem) // Debug için
    setCart(prevCart => {
      const existingItem = prevCart.find(item => 
        item.product_id === newItem.product_id && 
        item.size === newItem.size && 
        item.color === newItem.color
      )

      if (existingItem) {
        return prevCart.map(item =>
          item.product_id === newItem.product_id &&
          item.size === newItem.size &&
          item.color === newItem.color
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        )
      }

      return [...prevCart, newItem]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product_id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.product_id === productId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem('cart')
  }

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 