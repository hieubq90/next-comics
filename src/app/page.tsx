import React from 'react'
import TrendingComics from '~/components/commons/TrendingComics'
import { comicsClient } from '~/lib/ts-rest'

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import NewComics from './NewComics'

export default async function Home() {
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
    queryKey: ['trending'],
    queryFn: async () => await comicsClient.comics.trending(),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="max-w-[72rem] mx-auto pt-5 pb-8 px-3">
        <TrendingComics />
        <NewComics />
      </main>
    </HydrationBoundary>
  )
}
