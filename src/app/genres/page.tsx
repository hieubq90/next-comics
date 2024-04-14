import React from 'react'
import { comicsClient } from '~/lib/ts-rest'

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import ComicsByGenre from './[gid]/ComicByGenre'

export default async function AllGenresComicsPage({ params }: { params: { type: string } }) {
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
    queryKey: ['genres', 'all', '1'],
    queryFn: async () =>
      await comicsClient.genres.byId({
        params: {
          gid: 'all',
        },
        query: { page: '1' },
      }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full">
        <ComicsByGenre gid="all" />
      </div>
    </HydrationBoundary>
  )
}
