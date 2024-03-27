import { comicsClient } from '~/lib/ts-rest'

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import Comic from './Comic'

export default async function ComicPage({ params }: { params: { comic_id: string } }) {
  const { comic_id } = params
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
    queryKey: ['detail', comic_id],
    queryFn: async (_params) => await comicsClient.comics.detail({ params: { comic_id } }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Comic comicId={comic_id} />
    </HydrationBoundary>
  )
}
