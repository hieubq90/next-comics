'use client'

import { comicsClient } from '~/app/providers'

import ComicInfo from './ComicInfo'

export default function Page({ params }: { params: { comic_id: string } }) {
  const { comic_id } = params

  const comidDetail = comicsClient.comics.detail.useQuery(['detail', comic_id], { params: { comic_id } })

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
