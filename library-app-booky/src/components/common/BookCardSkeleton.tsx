import Skeleton from '@/components/common/Skeleton'

export default function BookCardSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="w-full rounded-xl aspect-[2/3]" />
      <Skeleton className="h-3.5 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  )
}
