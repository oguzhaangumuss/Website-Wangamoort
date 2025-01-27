import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Category Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The category you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center px-4 py-2 border border-transparent 
            text-sm font-medium rounded-md text-white bg-[#152e1b] 
            hover:bg-[#1f432a] focus:outline-none focus:ring-2 
            focus:ring-offset-2 focus:ring-[#152e1b]"
        >
          Back to Categories
        </Link>
      </div>
    </div>
  )
} 