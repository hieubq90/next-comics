import { comicsClient } from '~/lib/ts-rest'

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import Chapter from './Chapter'

export default async function ChapterPage({
  params,
}: {
  params: { comic_id: string; alias: string; chapter_id: string }
}) {
  const { comic_id, alias, chapter_id } = params
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        staleTime: 5 * 1000,
        retry: 0,
      },
    },
  })

  await queryClient.prefetchQuery({
    queryKey: ['detail', comic_id, alias, chapter_id],
    queryFn: async (_params) => await comicsClient.comics.read({ params: { comic_id, alias, chapter_id } }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Chapter
        comicId={comic_id}
        alias={alias}
        chapterId={chapter_id}
      />
    </HydrationBoundary>
  )
}
