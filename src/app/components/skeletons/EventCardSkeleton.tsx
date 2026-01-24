/**
 * Skeleton loading state for Event Cards
 * Used while event data is being fetched
 */

export function EventCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E5E7EB] animate-pulse">
      <div className="flex flex-col md:flex-row">
        {/* Image Skeleton */}
        <div className="w-full md:w-64 h-48 md:h-auto bg-gray-200" />
        
        {/* Content Skeleton */}
        <div className="flex-1 p-5 space-y-3">
          {/* Date Badge */}
          <div className="h-6 w-32 bg-gray-200 rounded-full" />
          
          {/* Title */}
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-4/5" />
            <div className="h-6 bg-gray-200 rounded w-2/3" />
          </div>
          
          {/* Location & Time */}
          <div className="space-y-2 pt-2">
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
          </div>
          
          {/* Button */}
          <div className="h-10 bg-gray-200 rounded-xl w-32 mt-4" />
        </div>
      </div>
    </div>
  );
}

/**
 * List of skeleton event cards
 */
export function EventListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <EventCardSkeleton key={index} />
      ))}
    </div>
  );
}
