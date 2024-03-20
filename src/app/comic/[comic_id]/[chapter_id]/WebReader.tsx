import Image from 'next/image'
import * as React from 'react'
import { IChapterDetail } from '~/types'

const WebReader = React.forwardRef<HTMLDivElement, { chapter: IChapterDetail }>(({ chapter }, ref) => {
  return (
    <div
      ref={ref}
      className="w-full flex flex-col items-center bg-black"
    >
      {chapter.images.map((img) => (
        // eslint-disable-next-line @next/next/no-img-element
        <Image
          key={img.page}
          src={`https://comics-api.hieubq.io.vn/v1${img.src}`}
          alt={`page_${img.page}`}
          className="w-[800px] !h-auto"
          width={800}
          height={800}
        />
      ))}
    </div>
  )
})

WebReader.displayName = 'WebReader'

export default WebReader
