'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'
import { comicsClient } from '~/app/providers'
import ComicPagination from '~/components/commons/ComicPagination'

export default function NewComics() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const page = searchParams.get('page')

  const newComics = comicsClient.comics.newComics.useQuery(['new', page ? page : '1'], {
    query: { page: page || '1' },
  })

  const handlePaging = React.useCallback(
    (page: string) => {
      router.push(`${pathname}?page=${page}`)
    },
    [pathname, router]
  )

  return (
    <div className="max-w-6xl mx-auto">
      <ComicPagination
        isLoading={newComics.isLoading}
        comics={newComics.data?.body.comics || []}
        title="Truyện mới"
        icon="radix/new"
        page={newComics.data?.body.current_page || 1}
        totalPages={newComics.data?.body.total_pages || 1}
        setPage={handlePaging}
      />
    </div>
  )
}
