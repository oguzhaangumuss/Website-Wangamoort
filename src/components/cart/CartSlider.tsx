'use client'

import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import type { CartItem } from '@/types/database.types'

interface CartSliderProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartSlider({ isOpen, onClose }: CartSliderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    // localStorage'dan sepet verilerini al
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(cart)
  }, [isOpen]) // Slider her açıldığında güncel verileri al

  const removeFromCart = (variantId: string) => {
    const updatedCart = cartItems.filter(item => item.variant_id !== variantId)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    setCartItems(updatedCart)
  }

  const updateQuantity = (variantId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    const updatedCart = cartItems.map(item => 
      item.variant_id === variantId ? { ...item, quantity: newQuantity } : item
    )
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    setCartItems(updatedCart)
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping Cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={onClose}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          {cartItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12">
                              <ShoppingBagIcon className="h-12 w-12 text-gray-400" />
                              <p className="mt-4 text-sm text-gray-500">Your cart is empty</p>
                            </div>
                          ) : (
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {cartItems.map((item) => (
                                <li key={item.variant_id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>{item.name + ' - ' + item.variant_name + ' ' + item.subcategory_name}</h3>
                                        <button
                                          type="button"
                                          onClick={() => removeFromCart(item.variant_id)}
                                          className="text-gray-400 hover:text-gray-500"
                                        >
                                          <XMarkIcon className="h-5 w-5" />
                                        </button>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {item.color} - {item.size}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center">
                                        <button
                                          onClick={() => updateQuantity(item.variant_id, item.quantity - 1)}
                                          className="px-2 py-1 text-gray-500 hover:text-gray-700"
                                        >
                                          -
                                        </button>
                                        <span className="mx-2 text-gray-700">{item.quantity}</span>
                                        <button
                                          onClick={() => updateQuantity(item.variant_id, item.quantity + 1)}
                                          className="px-2 py-1 text-gray-500 hover:text-gray-700"
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="mt-6">
                        <a
                          href="/quote"
                          className="flex items-center justify-center rounded-md border border-transparent 
                            bg-[var(--primary-color)] px-6 py-3 text-base font-medium text-[var(--text-dark)] 
                            shadow-sm hover:bg-[#e6bd2b]"
                        >
                          Request Quote
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          <button
                            type="button"
                            className="font-medium text-[var(--secondary-color)] hover:text-[#1f4429]"
                            onClick={onClose}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
} 