'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { Icon } from '~/components/commons/Icon'
import Loading from '~/components/layout/Loading'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { ScrollArea } from '~/components/ui/scroll-area'
import { Separator } from '~/components/ui/separator'
import { Slider } from '~/components/ui/slider'
import { Switch } from '~/components/ui/switch'
import { cn } from '~/lib/utils'
import { IChapterDetail } from '~/types'

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'

const WebReader = React.forwardRef<
  HTMLDivElement,
  { comicId: string; chapterId: string; chapter: IChapterDetail; changeMode: () => void }
>(({ comicId, chapterId, chapter, changeMode }, ref) => {
  const router = useRouter()
  const [showToolbar, setShowToolbar] = React.useState<boolean>(true)
  const [currentPage, setCurrentPage] = React.useState<number>(1)
  const [firstRender, setFirstRender] = React.useState<boolean>(true)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  React.useEffect(() => {
    const getElementsPos = () => {
      const elements = document.querySelectorAll('.image-source')
      const foundEle = Array.from(elements).find((el) => {
        const rect = el.getBoundingClientRect()
        return rect.top > 0
      })
      if (foundEle) {
        setCurrentPage(Number(foundEle.getAttribute('id')) - 1)
        return
      }
      if (firstRender) {
        setCurrentPage(1)
        setFirstRender(false)
        return
      }
      setCurrentPage(elements.length)
    }

    document.addEventListener('scroll', getElementsPos)
    return function cleanup() {
      document.removeEventListener('scroll', getElementsPos)
    }
  }, [firstRender])

  const handleShowToolbar = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return
      setShowToolbar(!showToolbar)
    },
    [showToolbar]
  )

  const handleChangeChapter = React.useCallback(
    (type: 'prev' | 'next') => {
      const chapters = [...chapter.chapters].reverse()
      const chapterIdx = chapters.findIndex((c: any) => c.id === Number(chapterId))
      const nextChapterIdx = chapterIdx + (type === 'next' ? 1 : -1)
      setIsLoading(true)
      router.push(`/comic/${comicId}/${chapters[nextChapterIdx].id}`)
    },
    [chapter.chapters, chapterId, comicId, router]
  )

  const openChapterList = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setTimeout(() => {
        const state = (e.target as any).getAttribute('data-state')
        if (state === 'open') {
          document.getElementById(`chapter_${chapterId}`)?.scrollIntoView()
        }
      }, 200)
    },
    [chapterId]
  )

  const handlePageChange = React.useCallback((page: number) => {
    setCurrentPage(page)
    const el = document.getElementById(page.toString())
    el?.scrollIntoView()
  }, [])

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
              id={`${img.page}`}
              key={img.page}
              src={`https://imgproxy.hieubq.io.vn/index.php${img.src}`}
              alt={`page_${img.page}`}
              className="w-[800px] !h-auto image-source"
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
            <span className="w-[50px] text-white">{`${currentPage} / ${chapter.images?.length || 1}`}</span>
            <Slider
              className="w-[150px]"
              defaultValue={[currentPage]}
              value={[currentPage]}
              min={1}
              max={chapter.images?.length || 1}
              step={1}
              onValueChange={(values: number[]) => handlePageChange(values[0])}
            />
          </div>
          <div className="dark flex items-center gap-3 text-white">
            <Button
              size="icon"
              disabled={Number(chapterId) === chapter.chapters?.at(-1)?.id}
              onClick={() => handleChangeChapter('prev')}
            >
              <Icon
                name="radix/chevron-left"
                className="h-4 w-4"
              />
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[200px] justify-between bg-transparent hover:border-primary hover:bg-transparent data-[state=open]:border-primary data-[state=open]:bg-transparent"
                  onClick={openChapterList}
                >
                  {chapter.chapter_name}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50 text-white" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="dark w-80">
                <div className="p-2 font-bold">{`Có ${chapter.chapters?.length || 0} chương`}</div>
                <ScrollArea className="w-full h-[300px]">
                  <div className="">
                    {chapter.chapters
                      ? chapter.chapters.map((c) => (
                          <Link
                            id={`chapter_${c.id}`}
                            key={`chapter_${c.id}`}
                            href={`/comic/${comicId}/${c.id}`}
                            className={cn(
                              'py-2 block max-w-78 truncate px-2 duration-100 hover:bg-zinc-950',
                              c.id === Number(chapterId) ? 'text-primary font-bold' : ''
                            )}
                          >
                            {c.name}
                          </Link>
                        ))
                      : null}
                  </div>
                </ScrollArea>
              </PopoverContent>
            </Popover>
            <Button
              size="icon"
              disabled={Number(chapterId) === chapter.chapters[0]?.id}
              onClick={() => handleChangeChapter('next')}
            >
              <Icon
                name="radix/chevron-right"
                className="h-4 w-4"
              />
            </Button>
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
              <Label htmlFor="reading-mode">Chế độ đọc sách</Label>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
    </div>
  )
})

WebReader.displayName = 'WebReader'

export default WebReader
