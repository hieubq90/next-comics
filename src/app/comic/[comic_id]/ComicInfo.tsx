/* eslint-disable @next/next/no-img-element */

import { useCallback } from 'react'
import { Icon } from '~/components/commons/Icon'
import { Button } from '~/components/ui/button'
import { IComic } from '~/types'

import Authors from './Authors'
import Genres from './Genres'
import Stats from './Stats'

const ComicInfo = ({ comic, readNow }: { comic: IComic; readNow: () => void }) => {
  const handleReadNow = useCallback(() => {}, [])

  return (
    <>
      <div className="max-w-5xl mx-auto p-0 rounded-xl sm:grid sm:grid-cols-4 gap-6 md:p-4">
        <div className="aspect-[2/3] w-56 mx-auto sm:w-full rounded-lg border-2 overflow-hidden border-primary relative sm:col-span-1">
          <img
            className="w-full h-full object-cover"
            src={comic.thumbnail}
            alt={comic.title}
            draggable="false"
          />
        </div>
        <div className="sm:col-span-3">
          <h4 className="text-3xl font-extrabold mt-5 sm:mt-0">{comic.title}</h4>
          <p className="mb-3 mt-1 text-sm font-semibold text-gray-700">
            {Array.isArray(comic.other_names) ? comic.other_names.join(' | ') : comic.other_names}
          </p>
          <Genres genres={comic.genres} />
          <Authors authors={comic.authors} />
          <Stats
            total_views={comic.total_views}
            followers={comic.followers}
          />
          {comic.description && (
            <div className="mt-2">
              <p className="line-clamp-5">{comic.description.replace(/NetTruyen/g, 'NextComics')}</p>
            </div>
          )}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-5 font-bold">
            <Button
              className="uppercase font-semibold"
              disabled={!comic.chapters.length}
              onClick={() => readNow()}
            >
              <Icon
                name="radix/history"
                className="text-lg mr-2"
              />
              Đọc ngay
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ComicInfo
