import React from 'react'
import { comicsClient } from '~/lib/ts-rest'

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import TopComics from './[top_type]/TopComics'

export default async function AllTopComicsPage({ params }: { params: { type: string } }) {
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
    queryKey: ['top', 'all', '1'],
    queryFn: async () =>
      await comicsClient.comics.top({
        params: {
          top_type: 'all',
        },
        query: { page: '1' },
      }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full">
        <TopComics type="all" />
      </div>
    </HydrationBoundary>
  )
}
