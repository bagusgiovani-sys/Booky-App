import Skeleton from '@/components/common/Skeleton'

export default function BookRowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-5 py-4 border-b border-gray-100">
      <Skeleton className="w-14 h-18 rounded-xl shrink-0" />
      <div className="flex-1 flex flex-col gap-1.5">
        <Skeleton className="w-16 h-3.5 rounded-full" />
        <Skeleton className="w-[55%] h-4" />
        <Skeleton className="w-[35%] h-3" />
        <Skeleton className="w-12 h-3" />
      </div>
      <Skeleton className="w-44 h-9 rounded-full" />
    </div>
  )
}
