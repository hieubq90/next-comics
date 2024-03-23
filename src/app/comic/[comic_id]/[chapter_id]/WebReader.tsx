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

    // const handleChangeChapter = (type: 'prev' | 'next') => {
    //   isChangingEpisode.value = true;
    //   const episodes = [...chapters].reverse();
    //   const chapterIdx = episodes.findIndex(
    //     (chapter: any) => chapter.id === Number(chapterId)
    //   );
    //   const nextChapterIdx = chapterIdx + (type === 'next' ? 1 : -1);
    //   navigateTo(`/comic/${comicId}/${episodes[nextChapterIdx].id}`);
    // };

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
        {/* HEADER */}
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
        {/* FOOTER */}
        <div
          className={cn(
            'select-none absolute flex items-center flex-col-reverse justify-center gap-3 lg:flex-row lg:gap-8 py-2 bottom-0 inset-x-0 bg-[rgba(0,0,0,0.75)] text-gray-400 text-sm font-semibold duration-300',
            showToolbar ? 'translate-y-0 opacity-1' : 'translate-y-full opacity-0'
          )}
        >
          <div className="flex items-center gap-3">
            {chapter.chapters.length > 0 && parseInt(chapterId) !== chapter.chapters.at(-1)?.id ? (
              <button
                className={cn(
                  'px-3 py-1 rounded-full',
                  parseInt(chapterId) === chapter.chapters.at(-1)?.id
                    ? 'bg-gray-200 text-gray-500'
                    : 'bg-emerald-200 text-emerald-500 '
                )}
              >
                Phần trước
              </button>
            ) : null}
            {chapter.chapters.length > 0 && parseInt(chapterId) !== chapter.chapters[0]?.id && (
              <button
                className={cn(
                  'px-3 py-1 rounded-full',
                  parseInt(chapterId) === chapter.chapters[0]?.id
                    ? 'bg-gray-200 text-gray-500'
                    : 'bg-emerald-200 text-emerald-500 '
                )}
              >
                Phần tiếp theo
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
)

WebReader.displayName = 'WebReader'

export default WebReader
