/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { z } from 'zod'
import { IComic } from '~/types'

import Genres from './Genres'

const ComicInfo = ({ comic }: { comic: IComic }) => {
  return (
    <div className="absolute top-0 inset-x-0 h-80 bg-gradient-to-b from-emerald-100 -z-10">
      <div className="max-w-5xl mx-auto border-4 border-transparent p-0 rounded-xl sm:grid sm:grid-cols-4 gap-6 md:p-4 md:border-white">
        <div className="aspect-[2/3] w-56 mx-auto sm:w-full rounded-lg border-2 overflow-hidden border-emerald-500 relative sm:col-span-1">
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
        </div>
      </div>
    </div>
  )
}

export default Genres
