'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import * as React from 'react'
import { Icon } from '~/components/commons/Icon'
import { cn } from '~/lib/utils'

export default function Footer() {
  const { comic_id, chapter_id } = useParams<{ comic_id: string; chapter_id: string }>()

  const isReading = React.useMemo(() => !!chapter_id, [chapter_id])
  return (
    <footer className={(cn('bg-white'), isReading ? 'hidden' : '')}>
      <div className=" flex justify-around max-w-7xl px-4 pb-12 mx-auto space-y-8 overflow-hidden">
        <p className="mt-8 text-base leading-6 text-center text-gray-400">
          © {new Date().getFullYear()} NextComics™. Made with &#10084;.
        </p>
        <div className="flex justify-center mt-8 space-x-6">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/hieubq90/next-comics"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">GitHub</span>
            <Icon
              name="radix/github-logo"
              className="text-[24px]"
            />
          </Link>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://comics-api.hieubq.io.vn"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">API</span>
            <Icon
              name="radix/code"
              className="text-[24px]"
            />
          </Link>
        </div>
      </div>
    </footer>
  )
}
