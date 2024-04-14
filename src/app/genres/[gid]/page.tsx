import React from 'react'
import { comicsClient } from '~/lib/ts-rest'

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import ComicsByGenre from './ComicByGenre'

export default async function ComicsByGenrePage({ params }: { params: { gid: string } }) {
  const { gid } = params

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
    queryKey: ['genres-data'],
    queryFn: async () => await comicsClient.genres.get(),
  })

  await queryClient.prefetchQuery({
    queryKey: ['genres', gid ? gid : 'all', '1'],
    queryFn: async () =>
      await comicsClient.genres.byId({
        params: {
          gid: gid || 'all',
        },
        query: { page: '1' },
      }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full">
        <ComicsByGenre gid={gid} />
      </div>
    </HydrationBoundary>
  )
}
