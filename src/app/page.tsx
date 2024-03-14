'use client'

import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ComicCard } from '~/components/commons/ComicCard'
import ComicsSlide from '~/components/commons/ComicsSlide'
import { ListSkeletonCards } from '~/components/commons/SkeletonCard'

import { useIsFetching } from '@tanstack/react-query'

import { comicsClient } from './providers'

export default function Home() {
  const isLoading = useIsFetching()
  const recommendComics = comicsClient.comics.recommend.useQuery(['recommend'])
  const trendingComics = comicsClient.comics.trending.useQuery(['trending'])
  const completedComics = comicsClient.comics.completedComics.useQuery(['completed'])
  const recentlyUpdateComics = comicsClient.comics.recentlyUpdateComics.useQuery(['recent-update'])
  const boyComics = comicsClient.comics.boyComics.useQuery(['boy'])
  const girlComics = comicsClient.comics.girlComics.useQuery(['girl'])

  return (
    <main className="max-w-[72rem] mx-auto py-5 px-3">
      {isLoading ? (
        <ListSkeletonCards
          count={6}
          smallCard
        />
      ) : (
        <Swiper
          className="max-w-full"
          slidesPerView={6}
          modules={[Autoplay]}
          loop
          spaceBetween={10}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            320: {
              slidesPerView: 2,
            },
            576: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
            1280: {
              slidesPerView: 6,
            },
          }}
        >
          {recommendComics.data?.body.map((comic) => (
            <SwiperSlide key={comic.id}>
              <ComicCard
                key={comic.id}
                comic={comic}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {isLoading ? (
        <ListSkeletonCards count={6} />
      ) : (
        <ComicsSlide
          title="Truyện nổi tiếng"
          comics={trendingComics.data?.body.comics}
          icon="radix/popular"
          link="/popular"
        />
      )}
      {isLoading ? (
        <ListSkeletonCards count={6} />
      ) : (
        <ComicsSlide
          title="Truyện đã hoàn thành"
          comics={completedComics.data?.body.comics}
          icon="radix/completed"
          link="/completed"
        />
      )}
      {isLoading ? (
        <ListSkeletonCards count={6} />
      ) : (
        <ComicsSlide
          title="Truyện mới cập nhật"
          comics={recentlyUpdateComics.data?.body.comics}
          icon="radix/recently"
          link="/recently-update"
        />
      )}
      {isLoading ? (
        <ListSkeletonCards count={6} />
      ) : (
        <ComicsSlide
          title="Truyện cho con trai"
          comics={boyComics.data?.body.comics}
          icon="radix/boy"
          link="/boy"
        />
      )}
      {isLoading ? (
        <ListSkeletonCards count={6} />
      ) : (
        <ComicsSlide
          title="Truyện cho con gái"
          comics={girlComics.data?.body.comics}
          icon="radix/girl"
          link="/girl"
        />
      )}
    </main>
  )
}
