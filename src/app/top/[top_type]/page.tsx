import React from 'react'
import { comicsClient } from '~/lib/ts-rest'

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import TopComics from './TopComics'

type TOP_TYPE = '' | 'daily' | 'weekly' | 'monthly' | 'chapter' | 'follow' | 'comment'

export default async function AllTopComicsPage({ params }: { params: { top_type: string } }) {
  const { top_type } = params

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
    queryKey: ['top', top_type ? top_type : 'all', '1'],
    queryFn: async () =>
      await comicsClient.comics.topComics({
        params: {
          top_type: top_type === 'all' ? '' : (top_type as TOP_TYPE),
        },
        query: { page: '1' },
      }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="max-w-[72rem] mx-auto pt-5 pb-8 px-3">
        <TopComics type={top_type as TOP_TYPE & 'all'} />
      </main>
    </HydrationBoundary>
  )
}
