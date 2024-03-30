import React, { useCallback, useEffect, useState } from 'react'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ComicCard } from '~/components/commons/ComicCard'
import ComicsSlide from '~/components/commons/ComicsSlide'
import { ListSkeletonCards } from '~/components/commons/SkeletonCard'
import TrendingComics from '~/components/commons/TrendingComics'
import { comicsClient } from '~/lib/ts-rest'

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import NewComics from './NewComics'

export default async function NewComicsPage() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        staleTime: 5 * 1000,
        retry: 1,
      },
    },
  })

  await queryClient.prefetchQuery({
    queryKey: ['new', '1'],
    queryFn: async () => await comicsClient.comics.newComics({ query: { page: '1' } }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="max-w-[72rem] mx-auto pt-5 pb-8 px-3">
        <NewComics />
      </main>
    </HydrationBoundary>
  )
}
