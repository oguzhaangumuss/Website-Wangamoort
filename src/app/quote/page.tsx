'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import Link from 'next/link'
import { FaShoppingCart } from 'react-icons/fa'
import { useCart } from '@/contexts/CartContext'
import type { QuoteFormData } from '@/types/database.types'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

const additionalServices = [
  {
    id: 'delivery',
    name: 'Delivery Service',
    description: 'Professional delivery to your doorstep',
    image: '/images/services/delivery/delivery2.jpeg'
  },
  {
    id: 'installation',
    name: 'Installation Service',
    description: 'Expert assembly and installation',
    image: '/images/services/installation.jpg'
  },
  {
    id: 'rubbish_removal',
    name: 'Rubbish Removal',
    description: 'Complete cleanup and disposal service',
    image: '/images/services/rubbish/rubbish.jpg'
  }
]

export default function QuotePage() {
  const { cart, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<QuoteFormData>({
    company_name: '',
    customer_first_name: '',
    customer_last_name: '',
    customer_email: '',
    customer_phone: '',
    notes: '',
    is_rubbish_removal: false,
    is_installation: false,
    is_delivery: false,
    delivery_address: {
      street: '',
      city: '',
      state: '',
      postcode: ''
    }
  })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      if (parent === 'delivery_address') {
        setFormData(prev => ({
          ...prev,
          delivery_address: {
            ...(prev.delivery_address || { street: '', city: '', state: '', postcode: '' }),
            [child]: value
          }
        }))
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }))
    }
  }

  const handleNextStep = (e: React.MouseEvent) => {
    e.preventDefault()
    if (step < 4) {
      setStep(step + 1)
    }
  }

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (step !== 4) {
      return
    }

    try {
      const quoteData = {
        ...formData,
        basket: cart.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
          selected_size: item.size,
          selected_color: item.color,
          price: item.price
        })),
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      // Debug için verileri konsola yazdır
      console.log('Form Data:', formData)
      console.log('Cart Items:', cart)
      console.log('Final Quote Data:', quoteData)

      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('API Error Response:', errorData)
        throw new Error('Failed to submit quote')
      }

      toast.success('Quote request submitted successfully!')
      clearCart()
      router.push('/')
    } catch (error) {
      console.error('Error submitting quote:', error)
      toast.error('Failed to submit quote. Please try again.')
    }
  }

  if (cart.length === 0) {
    return (
      <main className="pt-24 pb-16 bg-[#F9F9F9] min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="mb-6">
                <FaShoppingCart className="w-16 h-16 mx-auto text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-[#152e1b] mb-4">
                Your Cart is Empty
              </h2>
              <p className="text-gray-600 mb-8">
                Add some products to your cart to request a quote.
              </p>
              <Link 
                href="/products"
                className="inline-block px-6 py-3 bg-[#ffd230] text-[#152e1b] rounded-md
                  hover:bg-[#152e1b] hover:text-white transition-colors font-semibold"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#152e1b]">Review Your Cart</h2>
            <div className="space-y-4">
              {/* Cart Items */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Product</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Size</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Color</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Quantity</th>
                      {cart.some(item => item.price > 0) && (
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Price</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cart.map((item, index) => (
                      <tr key={index} className="bg-white">
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{item.name}</div>
                              <div className="text-sm text-gray-500">{item.variant_name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center text-sm text-gray-500">
                          {item.size || '-'}
                        </td>
                        <td className="px-4 py-4 text-center text-sm text-gray-500">
                          {item.color || '-'}
                        </td>
                        <td className="px-4 py-4 text-center text-sm text-gray-500">
                          {item.quantity}
                        </td>
                        {cart.some(item => item.price > 0) && (
                          <td className="px-4 py-4 text-right text-sm font-medium text-gray-900">
                            {item.price > 0 ? `$${item.price.toFixed(2)}` : '-'}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                  {cart.some(item => item.price > 0) && (
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan={4} className="px-4 py-3 text-right font-semibold">Total:</td>
                        <td className="px-4 py-3 text-right font-semibold text-[#152e1b]">
                          ${cart.reduce((total, item) => total + (item.price > 0 ? item.price * item.quantity : 0), 0).toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>

              {/* Additional Services */}
              <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-6">Additional Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {additionalServices.map((service) => (
                    <div 
                      key={service.id}
                      className={`relative overflow-hidden rounded-lg border-2 transition-all duration-200 
                        ${formData[service.id === 'rubbish_removal' ? 'is_rubbish_removal' : 
                          service.id === 'installation' ? 'is_installation' : 'is_delivery'] 
                          ? 'border-[var(--primary-color)] bg-[var(--primary-color)]/10' 
                          : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <div className="aspect-w-16 aspect-h-9">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-medium">{service.name}</h3>
                        <p className="text-gray-600 mt-1">{service.description}</p>
                        <label className="flex items-center mt-4 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData[service.id === 'rubbish_removal' ? 'is_rubbish_removal' : 
                              service.id === 'installation' ? 'is_installation' : 'is_delivery']}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              [service.id === 'rubbish_removal' ? 'is_rubbish_removal' : 
                                service.id === 'installation' ? 'is_installation' : 'is_delivery']: e.target.checked
                            }))}
                            className="w-4 h-4 text-[var(--primary-color)] border-gray-300 rounded 
                              focus:ring-[var(--primary-color)]"
                          />
                          <span className="ml-2">Add this service</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#152e1b]">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  name="customer_first_name"
                  value={formData.customer_first_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 
                    focus:ring-[#152e1b] focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="customer_last_name"
                  value={formData.customer_last_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 
                    focus:ring-[#152e1b] focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 
                    focus:ring-[#152e1b] focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="customer_phone"
                  value={formData.customer_phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 
                    focus:ring-[#152e1b] focus:border-transparent outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="customer_email"
                  value={formData.customer_email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 
                    focus:ring-[#152e1b] focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#152e1b]">Delivery Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  name="delivery_address.street"
                  value={formData.delivery_address?.street}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 
                    focus:ring-[#152e1b] focus:border-transparent outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="delivery_address.city"
                    value={formData.delivery_address?.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 
                      focus:ring-[#152e1b] focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="delivery_address.state"
                    value={formData.delivery_address?.state}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 
                      focus:ring-[#152e1b] focus:border-transparent outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postcode
                </label>
                <input
                  type="text"
                  name="delivery_address.postcode"
                  value={formData.delivery_address?.postcode}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 
                    focus:ring-[#152e1b] focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 
                    focus:ring-[#152e1b] focus:border-transparent outline-none resize-none"
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-[#152e1b]">Review Your Quote Request</h2>
            
            {/* Cart Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Cart Summary</h3>
              <div className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <div key={`${item.variant_id}-${item.size}-${item.color}`} className="py-4 flex items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div className="ml-4 flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        {item.variant_name} - {item.size}, {item.color}
                      </p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    {item.price > 0 && (
                      <p className="font-medium">${item.price.toFixed(2)}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Services */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Additional Services</h3>
              <div className="space-y-2">
                {formData.is_delivery && (
                  <div className="flex items-center text-green-600">
                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                    Delivery Service
                  </div>
                )}
                {formData.is_installation && (
                  <div className="flex items-center text-green-600">
                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                    Installation Service
                  </div>
                )}
                {formData.is_rubbish_removal && (
                  <div className="flex items-center text-green-600">
                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                    Rubbish Removal Service
                  </div>
                )}
                {!formData.is_delivery && !formData.is_installation && !formData.is_rubbish_removal && (
                  <p className="text-gray-500">No additional services selected</p>
                )}
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">{formData.customer_first_name} {formData.customer_last_name}</p>
                </div>
                {formData.company_name && (
                  <div>
                    <p className="text-sm text-gray-600">Company</p>
                    <p className="font-medium">{formData.company_name}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{formData.customer_email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{formData.customer_phone}</p>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            {formData.delivery_address && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Delivery Information</h3>
                <div className="space-y-2">
                  <p className="font-medium">{formData.delivery_address.street}</p>
                  <p className="font-medium">
                    {formData.delivery_address.city}, {formData.delivery_address.state} {formData.delivery_address.postcode}
                  </p>
                </div>
              </div>
            )}

            {/* Additional Notes */}
            {formData.notes && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Additional Notes</h3>
                <p className="text-gray-600">{formData.notes}</p>
              </div>
            )}

            {/* Confirmation Message */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-sm text-yellow-800">
                Please review all the information above carefully. Once you submit your quote request, 
                our team will review it and get back to you with a detailed quote as soon as possible.
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <main className="pt-24 pb-16 bg-[#F9F9F9] min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-[#152e1b]">Request a Quote</h1>
            <p className="text-gray-600">
              Review your cart and fill out the form below for a customized quote.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`flex-1 text-center relative ${
                  stepNumber < 4 ? 'after:content-[""] after:h-1 after:w-full after:absolute after:top-4 after:left-1/2 after:bg-gray-200' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center relative z-10 
                    ${step >= stepNumber ? 'bg-[#152e1b] text-white' : 'bg-gray-200 text-gray-400'}`}
                >
                  {stepNumber}
                </div>
                <div className={`text-sm ${step >= stepNumber ? 'text-[#152e1b]' : 'text-gray-400'}`}>
                  {['Review Cart', 'Personal Info', 'Delivery', 'Confirmation'][stepNumber - 1]}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmitQuote} className="bg-white rounded-lg shadow-lg p-8">
            {renderStep()}

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-2 border-2 border-[#152e1b] text-[#152e1b] rounded-md
                    hover:bg-[#152e1b] hover:text-white transition-colors font-semibold"
                >
                  Previous
                </button>
              )}
              {step === 4 ? (
                <button 
                  type="submit" 
                  className="ml-auto px-6 py-2 rounded-md font-semibold transition-colors
                    bg-[#ffd230] text-[#152e1b] hover:bg-[#152e1b] hover:text-white"
                >
                  Submit Quote Request
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={cart.length === 0}
                  className={`ml-auto px-6 py-2 rounded-md font-semibold transition-colors
                    ${cart.length === 0 
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-[#ffd230] text-[#152e1b] hover:bg-[#152e1b] hover:text-white'
                    }`}
                >
                  Next
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  )
} 