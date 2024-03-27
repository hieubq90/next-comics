'use client'

/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { ImSpinner } from 'react-icons/im'
import { cn } from '~/lib/utils'
import { IComic } from '~/types'

import { Icon } from './Icon'

export type ComicCardProps = {
  comic: IComic
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

  const router = useRouter()

  const [isImageLoaded, setIsImageLoaded] = React.useState(false)

  const handleClickCard = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>, type: 'detail' | 'delete' | 'continue') => {
      e.stopPropagation()
      router.push(`/comic/${id}`)
    },
    [id, router]
  )

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-md duration-500 border-2 border-transparent md:hover:border-emerald-300 relative group md:group-hover:shadow-md cursor-pointer"
      onClick={(e: React.MouseEvent<HTMLDivElement>) => handleClickCard(e, 'detail')}
    >
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
      {detail ? (
        <div className="absolute top-1/2 bottom-0 inset-x-0 flex flex-col justify-end px-2 sm:px-4 py-2 bg-gradient-to-b from-transparent to-black">
          <h5 className="font-semibold leading-5 text-md text-white group-hover:text-emerald-400 text-shadow duration-200 line-clamp-2">
            <span className="no-underline">{title}</span>
          </h5>
          <hr className="mt-3 mb-0.5 border-gray-500" />
          <div>
            <p className="text-sm text-gray-300 truncate font-semibold">
              {Array.isArray(authors) ? <span>{authors.join(' | ')}</span> : null}
              {authors === 'Updating' ? (
                <span className="flex items-center gap-1">
                  <ImSpinner
                    size="16"
                    className="text-emerald-500 animate-spin"
                  />
                  Đang cập nhật
                </span>
              ) : (
                <span>{authors}</span>
              )}
            </p>
            {isHistory ? (
              <div className="text-gray-300">
                <p className="text-sm font-semibold flex items-center gap-0.5 mb-1 text-fuchsia-400">
                  <Icon name="radix/clock" />
                  {last_reading}
                </p>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-0.5 justify-center gap-x-2 gap-y-1 text-emerald-400 text-xs py-1 mt-0.5">
                <span className="flex items-center gap-1 bg-white/25 px-1 rounded">
                  <Icon name="radix/eye-open" />
                  {total_views}
                </span>
                <span className="flex items-center gap-1 bg-white/25 px-1 rounded">
                  <Icon name="radix/heart" />
                  {followers}
                </span>
                {/* <span className="flex items-center gap-1 bg-white/25 px-1 rounded">
                    <Icon name="radix/chat-bubble" />
                    {total_comments}
                  </span> */}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
})

ComicCard.displayName = 'ComicCard'

export { ComicCard }
