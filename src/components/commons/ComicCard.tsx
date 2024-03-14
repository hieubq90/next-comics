'use client'

/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import * as React from 'react'
import { ImSpinner } from 'react-icons/im'
import { z } from 'zod'
import { Comic } from '~/lib/schemas'
import { cn } from '~/lib/utils'

export type ComicCardProps = {
  comic: z.infer<typeof Comic> & { last_reading?: string; chapter_id?: number }
  detail?: boolean
  isHistory?: boolean
}

const ComicCard = React.forwardRef<HTMLDivElement, ComicCardProps>((props, ref) => {
  const { comic, detail, isHistory } = props
  const {
    authors,
    followers,
    id,
    status,
    thumbnail,
    title,
    total_comments,
    total_views,
    is_trending,
    updated_at,
    chapter_id,
    last_reading,
  } = comic

  const [isImageLoaded, setIsImageLoaded] = React.useState(false)

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-md duration-500 border-2 border-transparent md:hover:border-emerald-300 relative group md:group-hover:shadow-md cursor-pointer"
    >
      <div className="flex gap-1 absolute font-semibold top-0 inset-x-0 z-10 text-xs text-white">
        {is_trending && (
          <span
            v-if=""
            className="bg-rose-500 py-0.5 px-2 rounded-b-sm first:rounded-bl-none"
          >
            Hot
          </span>
        )}
        {status === 'Completed' && (
          <span className="bg-sky-500 py-0.5 px-2 rounded-b-sm first:rounded-bl-none">End</span>
        )}
        {updated_at?.includes('trước') && Number(updated_at.match(/\d+/)?.[0]) <= 3 && (
          <span className="bg-amber-400 py-0.5 px-2 rounded-b-sm first:rounded-bl-none">Up</span>
        )}
      </div>
      <div className="relative">
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center text-white bg-gray-200 duration-150',
            isImageLoaded ? 'hidden' : 'flex'
          )}
        >
          <ImSpinner
            size="48"
            className="animate-spin"
          />
        </div>
        <Image
          className="w-full aspect-[2/3] object-cover object-center scale-[1.01] group-hover:scale-105 duration-300 origin-bottom select-none"
          src={thumbnail}
          alt={'comic-cover'}
          onLoad={() => setIsImageLoaded(true)}
          width={175}
          height={267}
        />
      </div>
    </div>
  )
})

ComicCard.displayName = 'ComicCard'

export { ComicCard }
