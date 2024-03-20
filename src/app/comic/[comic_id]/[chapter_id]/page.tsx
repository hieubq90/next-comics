'use client'

import { Suspense, useRef } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { comicsClient } from '~/app/providers'
import Loading from '~/components/layout/Loading'

import PageContent from './PageContent'
import PageCover from './PageCover'

export default function Chapter({ params }: { params: { comic_id: string; chapter_id: string } }) {
  const { comic_id, chapter_id } = params
  const book = useRef()

  const chapterDetail = comicsClient.comics.read.useQuery(['detail', comic_id, chapter_id], {
    params: {
      comic_id,
      chapter_id,
    },
  })

  return (
    <Suspense>
      <div
        className="max-w-[72rem] min-h-full mx-auto py-5 px-3 overflow-hidden"
        style={{ minHeight: 'calc(100vh - 65px)' }}
      >
        {chapterDetail.isLoading ? (
          <Loading />
        ) : (
          <HTMLFlipBook
            ref={book}
            className="flip-book html-book demo-book"
            style={{ backgroundImage: 'url("/bg-read.jpg")' }}
            width={550}
            height={733}
            size="stretch"
            minWidth={315}
            maxWidth={600}
            minHeight={400}
            maxHeight={800}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            // onFlip={this.onPage}
            // onChangeOrientation={this.onChangeOrientation}
            // onChangeState={this.onChangeState}

            startPage={0}
            drawShadow={true}
            flippingTime={1000}
            usePortrait={true}
            startZIndex={0}
            autoSize={true}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={0}
            showPageCorners={true}
            disableFlipByClick={false}
          >
            <PageCover
              comic={chapterDetail.data?.body.comic_name}
              chapter={chapterDetail.data?.body.chapter_name}
            />
            {chapterDetail.data?.body.images &&
              chapterDetail.data?.body.images.map((img) => (
                <PageContent
                  key={img.page}
                  header={`${chapterDetail.data?.body.comic_name} - ${chapterDetail.data?.body.chapter_name}`}
                  number={img.page}
                  images={[img.src, img.backup_url_1, img.backup_url_2]}
                ></PageContent>
              ))}
            <PageCover></PageCover>
          </HTMLFlipBook>
        )}
      </div>
    </Suspense>
  )
}
