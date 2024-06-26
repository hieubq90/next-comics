'use client'

import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { Icon } from '~/components/commons/Icon'
import { Button } from '~/components/ui/button'
import { IComic } from '~/types'

const CHAPTER_PER_PAGE = 50

const Chapters = ({ comic }: { comic: IComic }) => {
  const newestChapter = useMemo(() => comic.chapters[0]?.name.match(/\d+(\.\d+)?/)?.[0], [comic])
  const router = useRouter()

  const totalChapterPage = useMemo(() => {
    return !isNaN(Number(newestChapter)) ? Math.ceil(Number(newestChapter) / CHAPTER_PER_PAGE) : 0
  }, [newestChapter])

  const chapterPages = useMemo(
    () => (totalChapterPage ? Array.from(Array(totalChapterPage).keys()) : []),
    [totalChapterPage]
  )
  const [currentChapterPage, setCurrentChapterPage] = useState<Number>(0)

  const chaptersSection = useMemo(() => {
    const start = currentChapterPage === 0 ? 0 : Number(currentChapterPage) * CHAPTER_PER_PAGE + 1
    const end = (Number(currentChapterPage) + 1) * CHAPTER_PER_PAGE

    const limit = CHAPTER_PER_PAGE * 6
    const chapters = [...comic.chapters]
      .reverse()
      .slice(start < limit ? 0 : start - limit, end + limit)
      .filter((chapter) => {
        const chap = chapter.name.match(/\d+(\.\d+)?/)?.[0]
        if (!chap) return false
        if (parseFloat(chap) >= start && parseFloat(chap) <= end + 0.99) return true
        return false
      })
    return chapters
  }, [comic.chapters, currentChapterPage])

  return (
    <div className="max-w-5xl mx-auto mt-5">
      <div className="flex items-center gap-6 font-bold text-lg sm:text-xl border-b-2 py-1">
        <span className="flex items-center gap-1 text-primary uppercase">
          <Icon
            name="radix/comic"
            className="text-[2rem]"
          />
          Danh sách chương
        </span>
      </div>
      <div>
        {!comic.chapters.length ? (
          <h4
            className="mt-6 text-center text-2xl font-bold text-gray-700 select-none"
            v-if=""
          >
            Không có chương nào
          </h4>
        ) : (
          <>
            <div className="grid gap-x-2 gap-y-2 grid-cols-3 md:grid-cols-9  my-5 text-gray-800 font-semibold text-sm">
              {chapterPages.map((_, idx) => (
                <Button
                  key={`page_${idx}`}
                  variant={idx === currentChapterPage ? undefined : 'outline'}
                  className="uppercase dark:text-white"
                  onClick={() => setCurrentChapterPage(idx)}
                >
                  {idx + 1 < totalChapterPage
                    ? `${idx === 0 ? 0 : idx * CHAPTER_PER_PAGE + 1} - ${(idx + 1) * CHAPTER_PER_PAGE}`
                    : `${totalChapterPage === 1 ? 0 : idx * CHAPTER_PER_PAGE + 1} - ${newestChapter}`}
                </Button>
              ))}
            </div>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {chaptersSection.map((chapter) => (
                <Button
                  key={`chapter_${chapter.id}`}
                  className="uppercase dark:text-white"
                  variant="outline"
                  onClick={() => router.push(`/comic/${comic.id}/${chapter.id}?alias=${chapter.alias || ''}`)}
                >
                  {chapter.name}
                </Button>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}

export default Chapters
