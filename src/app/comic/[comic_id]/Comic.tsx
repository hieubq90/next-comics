'use client'

import { comicsClient } from '~/app/providers'

import ComicInfo from './ComicInfo'

export default function Comic({ comicId }: { comicId: string }) {
  const comidDetail = comicsClient.comics.detail.useQuery(['detail', comicId], {
    params: { comic_id: comicId },
  })

  return (
    <div className="relative pt-12 px-4 min-h-screen">
      {comidDetail.isLoading ? 'Loading' : null}
      {!comidDetail.isLoading && comidDetail.data ? (
        <>
          <ComicInfo comic={comidDetail.data?.body} />
        </>
      ) : null}
    </div>
  )
}
