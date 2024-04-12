'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { comicsClient } from '~/app/providers'

import Chapters from './Chapters'
import ComicInfo from './ComicInfo'

export default function Comic({ comicId }: { comicId: string }) {
  const router = useRouter()

  const comidDetail = comicsClient.comics.detail.useQuery(['detail', comicId], {
    params: { comic_id: comicId },
  })

  useEffect(() => {
    if (comidDetail.data && comidDetail.data.status !== 200) {
      // redirect to 404
      router.push('/404')
    }
  }, [comidDetail, router])

  const handleReadNow = useCallback(() => {
    if (
      comidDetail.data &&
      comidDetail.data.status === 200 &&
      comidDetail.data.body &&
      comidDetail.data.body.chapters.length
    ) {
      router.push(
        `/comic/${comidDetail.data.body.id}/${comidDetail.data.body.chapters.at(-1)?.id}?alias=${
          comidDetail.data.body.chapters.at(-1)?.alias || ''
        }`
      )
    }
  }, [comidDetail, router])

  return (
    <div className="relative pt-12 px-4 min-h-screen">
      {comidDetail.isLoading ? 'Loading' : null}
      {!comidDetail.isLoading && comidDetail.data && comidDetail.data.status === 200 ? (
        <>
          <ComicInfo
            comic={comidDetail.data?.body}
            readNow={handleReadNow}
          />
          <Chapters comic={comidDetail.data?.body} />
          <div className="mt-5" />
        </>
      ) : null}
    </div>
  )
}
