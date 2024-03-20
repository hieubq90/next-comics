'use client'

import { useRef } from 'react'
import HTMLFlipBook from 'react-pageflip'

import PageContent from './PageContent'
import PageCover from './PageCover'

export default function Chapter({ comic_id, chapter_id }: { comic_id: String; chapter_id: String }) {
  const book = useRef()
  return (
    <div className="max-w-[72rem] mx-auto py-5 px-3 overflow-hidden">
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
        <PageCover>Book Title</PageCover>
        <PageContent number={1}>Page 1</PageContent>
        <PageContent number={2}>Page 2</PageContent>
        <PageContent number={3}>Page 3</PageContent>
        <PageContent number={4}>Page 4</PageContent>
        <PageContent number={5}>Page 5</PageContent>
        <PageCover></PageCover>
      </HTMLFlipBook>
    </div>
  )
}
