// 'use client'

import Link from 'next/link'
import { ImSpinner } from 'react-icons/im'

const Authors = ({ authors }: { authors: String[] | String }) => {
  return (
    <div className="font-semibold flex items-center gap-2 my-1">
      Tác giả:
      {Array.isArray(authors) ? (
        authors.map((author, idx) => (
          <div key={`author_${idx}`}>
            <Link
              href={`/search?q=${author.replace(/\s+/g, '+')}`}
              className="text-fuchsia-500"
            >
              {author}
            </Link>
            <span
              className="select-none"
              v-if="idx < comic.authors.length - 1"
            >
              -
            </span>
          </div>
        ))
      ) : authors === 'Updating' ? (
        <span className="flex items-center gap-1">
          <ImSpinner
            size="16"
            className="animate-spin text-emerald-500"
          />
          Updating
        </span>
      ) : (
        <Link
          href={`/search?q=${authors.replace(/\s+/g, '+')}`}
          className="text-fuchsia-500"
        >
          {authors}
        </Link>
      )}
    </div>
  )
}

export default Authors
