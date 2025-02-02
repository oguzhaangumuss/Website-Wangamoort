'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function ThankYouPage() {
  const router = useRouter()

  // 5 saniye sonra ana sayfaya yönlendir
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/')
    }, 30000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <main className="pt-24 pb-16 bg-[#F9F9F9] min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            {/* Success Icon */}
            <div className="flex justify-center mb-8">
              <div className="bg-green-100 rounded-full p-3">
                <CheckCircleIcon className="w-16 h-16 text-green-600" />
              </div>
            </div>

            {/* Thank You Message */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#152e1b]">
              Thank You for Your Quote Request!
            </h1>
            
            <p className="text-gray-600 mb-8">
              We have received your quote request and our team will review it shortly. 
              We will get back to you with a detailed quote as soon as possible.
            </p>

            {/* Additional Information */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <p className="text-sm text-yellow-800">
                Please check your email for confirmation. If you don&apos;t receive an email within 
                the next few minutes, please check your spam folder.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="space-y-4">
              <Link 
                href="/"
                className="block w-full bg-[#ffd230] text-[#152e1b] py-3 px-8 rounded-md 
                  hover:bg-[#152e1b] hover:text-white transition-colors font-semibold"
              >
                Return to Homepage
              </Link>
              
              <Link 
                href="/products"
                className="block w-full border-2 border-[#152e1b] text-[#152e1b] py-3 px-8 
                  rounded-md hover:bg-[#152e1b] hover:text-white transition-colors font-semibold"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Auto Redirect Message */}
            <p className="text-sm text-gray-500 mt-8">
              You will be automatically redirected to the homepage in 30 seconds...
            </p>
          </div>
        </div>
      </div>
    </main>
  )
} 