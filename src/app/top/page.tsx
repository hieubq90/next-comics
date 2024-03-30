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
      await comicsClient.comics.topComics({
        params: {
          top_type: '',
        },
        query: { page: '1' },
      }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="max-w-[72rem] mx-auto pt-5 pb-8 px-3">
        <TopComics type="all" />
      </main>
    </HydrationBoundary>
  )
}
