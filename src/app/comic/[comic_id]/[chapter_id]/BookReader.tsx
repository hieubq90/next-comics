import * as React from 'react'
import HTMLFlipBook from 'react-pageflip'
import { IChapterDetail } from '~/types'

import PageContent from './PageContent'
import PageCover from './PageCover'

const BookReader = React.forwardRef<any, { chapter: IChapterDetail }>(({ chapter }, ref) => {
  return (
    <HTMLFlipBook
      ref={ref}
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
        comic={chapter.comic_name}
        chapter={chapter.chapter_name}
      />
      {chapter.images &&
        chapter.images.map((img) => (
          <PageContent
            key={img.page}
            header={`${chapter.comic_name} - ${chapter.chapter_name}`}
            number={img.page}
            images={[img.src, img.backup_url_1, img.backup_url_2]}
          ></PageContent>
        ))}
      <PageCover></PageCover>
    </HTMLFlipBook>
  )
})

BookReader.displayName = 'BookReader'

export default BookReader
