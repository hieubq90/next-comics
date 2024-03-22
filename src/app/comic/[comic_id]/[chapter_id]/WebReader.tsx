import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import { Icon } from '~/components/commons/Icon'
import { cn } from '~/lib/utils'
import { IChapterDetail } from '~/types'

const WebReader = React.forwardRef<HTMLDivElement, { comicId: string; chapterId: string; chapter: IChapterDetail }>(
  ({ comicId, chapterId, chapter }, ref) => {
    const [showToolbar, setShowToolbar] = React.useState<boolean>(true)
    const [openChapter, setOpenChapter] = React.useState<boolean>(false)

    const handleShowToolbar = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target !== e.currentTarget) return
        setShowToolbar(!showToolbar)
        setOpenChapter(false)
      },
      [showToolbar]
    )

    return (
      <div
        ref={ref}
        className="bg-zinc-900 min-h-screen"
      >
        <div className="flex flex-col max-w-2xl mx-auto">
          {chapter.images.map((img) => (
            // eslint-disable-next-line @next/next/no-img-element
            <Image
              key={img.page}
              src={`https://cicdn.hieubq.io.vn/v1${img.src}`}
              alt={`page_${img.page}`}
              className="w-[800px] !h-auto"
              width={800}
              height={800}
            />
          ))}
        </div>
        <div
          className="fixed inset-0"
          onClick={handleShowToolbar}
        >
          <div
            className={cn(
              'select-none top-0 inset-x-0 bg-[rgba(0,0,0,0.9)] text-center py-3 px-2 text-gray-300 font-semibold duration-200',
              showToolbar ? 'translate-y-0 opacity-1' : '-translate-y-full opacity-0'
            )}
          >
            <Link href={`/comic/${comicId as string}`}>{chapter.comic_name}</Link>
            <Icon
              name="radix/caret-right"
              className="mx-2 text-md"
            />
            <span>{chapter.chapter_name}</span>
          </div>
        </div>
      </div>
    )
  }
)

WebReader.displayName = 'WebReader'

export default WebReader
