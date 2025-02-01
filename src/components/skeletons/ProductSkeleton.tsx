export default function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="h-[40vh] bg-gray-200 mb-8" />

      {/* Filters Section Skeleton */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex gap-4 mb-6">
          <div className="h-10 w-32 bg-gray-200 rounded-lg" />
          <div className="h-10 w-32 bg-gray-200 rounded-lg" />
        </div>
      </div>

      {/* Products Grid Skeleton */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
              {/* Image Skeleton */}
              <div className="h-48 bg-gray-200" />
              
              {/* Content Skeleton */}
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 