import { useState } from 'react'
import { Quote } from '@/types'
import { QuoteStatus } from '@/types/quoteStatus'
  
type QuoteRowProps = {
  quote: Quote
  onStatusChange: (id: string, status: QuoteStatus) => void
  onViewDetails: () => void
}

export function QuoteRow({ quote, onStatusChange, onViewDetails }: QuoteRowProps) {
  const [isUpdating, setIsUpdating] = useState(false)

  const total = quote.basket.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const formattedDate = new Date(quote.created_at).toLocaleDateString('en-GB')
  
  // Dolar formatı için
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const handleStatusChange = async (newStatus: QuoteStatus) => {
    setIsUpdating(true)
    await onStatusChange(quote.id, newStatus)
    setIsUpdating(false)
  }

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-4">{formattedDate}</td>
      <td className="p-4">
        <div>
          {quote.customer_first_name} {quote.customer_last_name}
        </div>
        <div className="text-sm text-gray-500">
          {quote.customer_email}
        </div>
      </td>
      <td className="p-4">{formatPrice(total)}</td>
      <td className="p-4">
        <div className="relative">
          <select
            value={quote.status}
            onChange={(e) => handleStatusChange(e.target.value as QuoteStatus)}
            className={`px-3 py-1 border rounded-lg ${isUpdating ? 'opacity-50' : ''}`}
            disabled={isUpdating}
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="in_progress">In Progress</option>
            <option value="on_hold">On Hold</option>
            <option value="on_delivery">On Delivery</option>
            <option value="delivered">Delivered</option>
          </select>
          {isUpdating && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <div className="animate-spin h-4 w-4 border-b-2 border-gray-900 rounded-full" />
            </div>
          )}
        </div>
      </td>
      <td className="p-4">
        <button
          onClick={onViewDetails}
          className="text-blue-600 hover:text-blue-800"
        >
          Details
        </button>
      </td>
    </tr>
  )
} 