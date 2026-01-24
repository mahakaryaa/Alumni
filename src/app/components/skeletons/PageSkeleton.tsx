/**
 * Full page skeleton loading states
 * Used for major page transitions
 */

export function DetailPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-[#E5E7EB] p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="h-6 w-6 bg-gray-200 rounded" />
          <div className="h-6 w-32 bg-gray-200 rounded" />
          <div className="h-6 w-6 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Hero Image Skeleton */}
      <div className="w-full h-64 md:h-96 bg-gray-200" />

      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-8 bg-gray-200 rounded w-1/2" />
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-200">
          <div className="h-10 w-24 bg-gray-200 rounded-t" />
          <div className="h-10 w-24 bg-gray-200 rounded-t" />
          <div className="h-10 w-24 bg-gray-200 rounded-t" />
        </div>

        {/* Content Blocks */}
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-white rounded-xl p-6 space-y-3">
              <div className="h-6 bg-gray-200 rounded w-1/4" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-[#E5E7EB] p-4">
        <div className="h-6 w-32 bg-gray-200 rounded mx-auto" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-white rounded-xl p-4 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-8 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>

        {/* Content Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white rounded-xl h-64 bg-gray-200" />
          ))}
        </div>
      </div>
    </div>
  );
}
