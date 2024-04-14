'use client'

import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { FreeMode, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { cn } from '~/lib/utils'
import { IGenre } from '~/types'

export default function GenresNav({ genres }: { genres: IGenre[] }) {
  const params = useParams<{ gid: string }>()
  const { gid } = params
  const router = useRouter()
  const handleChangeGenre = React.useCallback(
    (gid: string) => {
      router.push(`/genres/${gid}`)
    },
    [router]
  )

  const currentGenre = React.useMemo(() => {
    if (!gid) return 'all'
    return gid
  }, [gid])

  const initSlide = React.useMemo(() => {
    return genres.findIndex((genre: any) => genre.id === currentGenre)
  }, [currentGenre, genres])

  return (
    <Swiper
      className="border-y max-w-full"
      slidesPerView={'auto'}
      freeMode
      modules={[FreeMode, Navigation]}
      loop={false}
      initialSlide={initSlide}
    >
      {genres.map((genre) => (
        <SwiperSlide
          id={`${genre.id}`}
          key={genre.id}
          className={cn(
            'px-5 py-3 select-none cursor-pointer',
            genre.id === currentGenre ? 'bg-primary text-white' : ''
          )}
          style={{ width: 'max-content' }}
          onClick={() => handleChangeGenre(genre.id || 'all')}
        >
          {genre.name}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
