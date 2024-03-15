'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ComicCard, IComic } from '~/components/commons/ComicCard'
import ComicsSlide from '~/components/commons/ComicsSlide'
import { ListSkeletonCards } from '~/components/commons/SkeletonCard'

import { comicsClient } from './providers'

export default function Home() {
  const [isPaused, setIsPaused] = useState(true)
  const [recommendComics, setRecommendComics] = useState<IComic[]>([])

  const getRecommendComics = useCallback(async () => {
    console.log('getRecommendComics')
    const { body } = await comicsClient.comics.recommend.query()
    setRecommendComics(body as IComic[])
    setIsPaused(false)
  }, [])

  useEffect(() => {
    console.log('mounted')
    getRecommendComics()
  }, [getRecommendComics])

  // const recommendComics = comicsClient.comics.recommend.useQuery(['recommend'])
  const trendingComics = comicsClient.comics.trending.useQuery(
    ['trending'],
    {},
    { queryKey: ['trending'], enabled: !isPaused }
  )
  const completedComics = comicsClient.comics.completedComics.useQuery(
    ['completed'],
    {},
    { queryKey: ['completed'], enabled: !isPaused }
  )
  const recentlyUpdateComics = comicsClient.comics.recentlyUpdateComics.useQuery(
    ['recently'],
    {},
    { queryKey: ['recently'], enabled: !isPaused }
  )
  const boyComics = comicsClient.comics.boyComics.useQuery(['boy'], {}, { queryKey: ['boy'], enabled: !isPaused })
  const girlComics = comicsClient.comics.girlComics.useQuery(['girl'], {}, { queryKey: ['girl'], enabled: !isPaused })

  return (
    <main className="max-w-[72rem] mx-auto py-5 px-3">
      {isPaused ? (
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
          {recommendComics.map((comic) => (
            <SwiperSlide key={comic.id}>
              <ComicCard
                key={comic.id}
                comic={comic}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <ComicsSlide
        title="Truyện nổi tiếng"
        comics={trendingComics.data?.body.comics}
        icon="radix/popular"
        link="/popular"
        isLoading={trendingComics.isLoading}
      />
      <ComicsSlide
        title="Truyện đã hoàn thành"
        comics={completedComics.data?.body.comics}
        icon="radix/completed"
        link="/completed"
        isLoading={completedComics.isLoading}
      />
      <ComicsSlide
        title="Truyện mới cập nhật"
        comics={recentlyUpdateComics.data?.body.comics}
        icon="radix/recently"
        link="/recently-update"
        isLoading={recentlyUpdateComics.isLoading}
      />
      <ComicsSlide
        title="Truyện cho con trai"
        comics={boyComics.data?.body.comics}
        icon="radix/boy"
        link="/boy"
        isLoading={boyComics.isLoading}
      />
      <ComicsSlide
        title="Truyện cho con gái"
        comics={girlComics.data?.body.comics}
        icon="radix/girl"
        link="/girl"
        isLoading={girlComics.isLoading}
      />
    </main>
  )
}
