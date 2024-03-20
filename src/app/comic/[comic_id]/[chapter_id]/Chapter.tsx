'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { comicsClient } from '~/app/providers'
import Loading from '~/components/layout/Loading'

import BookReader from './BookReader'
import WebReader from './WebReader'

export default function Chapter({ comicId, chapterId }: { comicId: string; chapterId: string }) {
  const bookReader = useRef(null)
  const [readingMode, setReadingMode] = useState<'web' | 'book'>('web')

  const chapterDetail = comicsClient.comics.read.useQuery(['detail', comicId, chapterId], {
    params: { comic_id: comicId, chapter_id: chapterId },
  })

  const { isLoading, isError, error, data } = chapterDetail

  return (
    <div className="w-full min-h-screen mx-auto overflow-hidden">
      {isLoading ? (
        <div>Loading</div>
      ) : isError || !data?.body ? (
        `isError: ${isError} - error: ${JSON.stringify(error)}`
      ) : (
        <>
          {readingMode === 'web' && <WebReader chapter={data.body} />}
          {readingMode === 'book' && (
            <BookReader
              ref={bookReader}
              chapter={data.body}
            />
          )}
        </>
      )}
    </div>
  )
}