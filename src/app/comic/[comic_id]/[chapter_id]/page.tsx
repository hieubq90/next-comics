import { comicsClient } from '~/lib/ts-rest'

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import Chapter from './Chapter'

export default async function ChapterPage({ params }: { params: { comic_id: string; chapter_id: string } }) {
  const { comic_id, chapter_id } = params
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
    queryKey: ['detail', comic_id, chapter_id],
    queryFn: async (_params) => await comicsClient.comics.read({ params: { comic_id, chapter_id } }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Chapter
        comicId={comic_id}
        chapterId={chapter_id}
      />
    </HydrationBoundary>
  )
}
