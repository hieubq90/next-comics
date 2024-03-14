import React from 'react'
import { Skeleton } from '~/components/ui/skeleton'
import { cn } from '~/lib/utils'

export type SkeletonCardProps = {
  small: boolean
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ small }) => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className={cn('h-[200px] rounded-xl', small ? 'w-[177px]' : 'w-[207px]')} />
      <div className="space-y-2">
        <Skeleton className={cn('h-4', small ? 'w-[177px]' : 'w-[207px]')} />
        <Skeleton className={cn('h-4', small ? 'w-[177px]' : 'w-[207px]')} />
      </div>
    </div>
  )
}

export type ListSkeletonCardProps = {
  count: number
  smallCard?: boolean
}

export const ListSkeletonCards: React.FC<ListSkeletonCardProps> = ({ count, smallCard = false }) => {
  return (
    <div className="flex space-x-3 mb-4">
      {Array.from(Array(count).keys()).map((e) => (
        <SkeletonCard
          key={e}
          small={smallCard}
        />
      ))}
    </div>
  )
}
