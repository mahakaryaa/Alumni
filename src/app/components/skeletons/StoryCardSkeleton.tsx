/**
 * Skeleton loading state for Story Cards
 * Used while story data is being fetched
 */

export function StoryCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E5E7EB] animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-56 bg-gray-200" />
      
      {/* Content Skeleton */}
      <div className="p-5 space-y-3">
        {/* Category Badge */}
        <div className="h-5 w-28 bg-gray-200 rounded-full" />
        
        {/* Title */}
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded w-4/5" />
          <div className="h-6 bg-gray-200 rounded w-3/5" />
        </div>
        
        {/* Meta Info */}
        <div className="flex items-center gap-3 pt-2">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}

/**
 * Grid of skeleton story cards
 */
export function StoryGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <StoryCardSkeleton key={index} />
      ))}
    </div>
  );
}
