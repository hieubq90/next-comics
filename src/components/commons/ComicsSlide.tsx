import Link from 'next/link'
import * as React from 'react'
import { Grid, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { z } from 'zod'
import { Comic } from '~/lib/schemas'

import { ComicCard } from './ComicCard'
import { Icon } from './Icon'

type IComic = z.infer<typeof Comic>

export type ComicsSlideProps = {
  comics: IComic[] | undefined
  title: string
  icon: string
  link: string
}

const ComicsSlide: React.FC<ComicsSlideProps> = (props) => {
  const { icon, link, title, comics } = props

  return (
    <div>
      <div className="flex items-center justify-between mb-4 mt-6 md:mt-12">
        <h2 className="flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-bold">
          <Icon
            name={icon}
            className="w-[36px] h-[36px] text-emerald-500"
          />
          {title}
        </h2>
        <Link href={link}>
          <span className="text-sm font-medium">Xem thêm</span>
        </Link>
      </div>
      {comics ? (
        <Swiper
          className="max-w-full"
          slidesPerView={5}
          navigation
          modules={[Grid, Navigation]}
          loop
          spaceBetween={20}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
              grid: {
                rows: 1,
              },
            },
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
              grid: {
                rows: 1,
              },
            },
            576: {
              slidesPerView: 3,
              spaceBetween: 10,
              grid: {
                rows: 1,
              },
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 15,
              grid: {
                rows: 2,
                fill: 'row',
              },
            },
            1024: {
              slidesPerView: 5,
              grid: {
                rows: 2,
                fill: 'row',
              },
            },
          }}
          grid={{
            rows: 2,
            fill: 'row',
          }}
        >
          {comics.map((comic) => (
            <SwiperSlide key={comic.id}>
              <ComicCard
                comic={comic}
                detail
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}
    </div>
  )
}

ComicsSlide.displayName = 'ComicsSlide'

export default ComicsSlide
