'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { comicsClient } from '~/app/providers'
import Loading from '~/components/layout/Loading'

import BookReader from './BookReader'
import WebReader from './WebReader'

export default function Chapter({ comicId, alias, chapterId }: { comicId: string; alias: string; chapterId: string }) {
  const bookReader = useRef(null)
  const [readingMode, setReadingMode] = useState<'web' | 'book'>('web')

  const chapterDetail = comicsClient.comics.read.useQuery(['detail', comicId, alias, chapterId], {
    params: { comic_id: comicId, chapter_id: chapterId },
    query: { alias },
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
          {readingMode === 'web' && (
            <WebReader
              comicId={comicId}
              chapterId={chapterId}
              chapter={data.body}
              changeMode={() => setReadingMode('book')}
            />
          )}
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
