import Skeleton from '@/components/common/Skeleton'

export default function LoanCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="px-5 py-3.5 flex justify-between">
        <Skeleton className="w-28 h-4" />
        <Skeleton className="w-36 h-4" />
      </div>
      <div className="h-px bg-gray-100" />
      <div className="px-5 py-3.5 flex items-center justify-between gap-4">
        <div className="flex gap-3 flex-1">
          <Skeleton className="w-18 h-22 rounded-xl shrink-0" />
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="w-20 h-3.5 rounded-full" />
            <Skeleton className="w-3/5 h-4" />
            <Skeleton className="w-2/5 h-3.5" />
            <Skeleton className="w-1/2 h-3" />
          </div>
        </div>
        <div className="flex flex-col gap-1.5 items-end">
          <Skeleton className="w-24 h-3" />
          <Skeleton className="w-28 h-4" />
        </div>
      </div>
    </div>
  )
}
