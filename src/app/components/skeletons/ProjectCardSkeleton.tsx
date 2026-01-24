/**
 * Skeleton loading state for Project Cards
 * Used while project data is being fetched
 */

export function ProjectCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E5E7EB] animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-gray-200" />
      
      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Badge */}
        <div className="h-6 w-24 bg-gray-200 rounded-full" />
        
        {/* Title */}
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        
        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
        
        {/* Stats */}
        <div className="flex items-center gap-3 pt-2">
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between">
            <div className="h-3 w-16 bg-gray-200 rounded" />
            <div className="h-3 w-12 bg-gray-200 rounded" />
          </div>
          <div className="h-2 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/**
 * Grid of skeleton project cards
 */
export function ProjectGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProjectCardSkeleton key={index} />
      ))}
    </div>
  );
}
