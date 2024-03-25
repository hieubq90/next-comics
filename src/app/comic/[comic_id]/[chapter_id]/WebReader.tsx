'use client'

import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import { Icon } from '~/components/commons/Icon'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '~/components/ui/select'
import { Separator } from '~/components/ui/separator'
import { Slider } from '~/components/ui/slider'
import { Switch } from '~/components/ui/switch'
import { cn } from '~/lib/utils'
import { IChapterDetail } from '~/types'

const WebReader = React.forwardRef<
  HTMLDivElement,
  { comicId: string; chapterId: string; chapter: IChapterDetail; changeMode: () => void }
>(({ comicId, chapterId, chapter, changeMode }, ref) => {
  const [showToolbar, setShowToolbar] = React.useState<boolean>(true)
  const [openChapter, setOpenChapter] = React.useState<boolean>(false)
  const [currentPage, setCurrentPage] = React.useState<number>(1)

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
        {chapter.images &&
          chapter.images.map((img) => (
            // eslint-disable-next-line @next/next/no-img-element
            <Image
              key={img.page}
              src={`https://imgproxy.hieubq.io.vn/index.php${img.src}`}
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
        {/* HEADER */}
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
        {/* FOOTER */}
        <div
          className={cn(
            'select-none absolute flex items-center flex-col-reverse justify-center gap-3 lg:flex-row lg:gap-8 py-2 bottom-0 inset-x-0 bg-[rgba(0,0,0,0.75)] text-gray-400 text-sm font-semibold duration-300',
            showToolbar ? 'translate-y-0 opacity-1' : 'translate-y-full opacity-0'
          )}
        >
          <div className="items-center gap-2 hidden lg:flex">
            <span className="w-[50px]">{`${currentPage} / ${chapter.images.length}`}</span>
            <Slider
              className="w-[150px]"
              defaultValue={[currentPage]}
              min={1}
              max={chapter.images.length}
              step={1}
            />
          </div>
          <div className="dark flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              disabled={parseInt(chapterId) === chapter.chapters.at(-1)?.id}
            >
              <Icon
                name="radix/chevron-left"
                className="h-4 w-4"
              />
            </Button>
            <Button
              variant="outline"
              size="icon"
              disabled={parseInt(chapterId) === chapter.chapters[0]?.id}
            >
              <Icon
                name="radix/chevron-right"
                className="h-4 w-4"
              />
            </Button>
            <Select>
              <SelectTrigger className="dark w-[180px]">
                <SelectValue placeholder="Chọn chương" />
              </SelectTrigger>
              <SelectContent className="dark">
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <Separator
              orientation="vertical"
              className="h-6"
            />
            <div className="flex items-center space-x-2">
              <Switch
                id="reading-mode"
                checked={false}
                onCheckedChange={() => changeMode()}
              />
              <Label htmlFor="reading-mode">Book Reading</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

WebReader.displayName = 'WebReader'

export default WebReader
