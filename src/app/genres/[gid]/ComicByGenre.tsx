'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'
import { comicsClient } from '~/app/providers'
import ComicPagination from '~/components/commons/ComicPagination'

export default function ComicsByGenre({ gid = 'all' }: { gid: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const page = searchParams.get('page')

  const genres = comicsClient.genres.get.useQuery(['genres-data'])

  const comics = comicsClient.genres.byId.useQuery(['genres', gid, page ? page : '1'], {
    params: {
      gid,
    },
    query: { page: page || '1' },
  })

  const handlePaging = React.useCallback(
    (page: string) => {
      router.push(`${pathname}?page=${page}`)
    },
    [pathname, router]
  )

  const title = React.useMemo(() => {
    if (!gid || !genres.data) return 'Tất cả thể loại'

    const curentGenre = genres.data.body.find((item) => item.id === gid)
    return curentGenre ? curentGenre.name : 'Tất cả thể loại'
  }, [gid, genres.data])

  return (
    <div className="max-w-6xl mx-auto">
      <ComicPagination
        isLoading={comics.isLoading}
        comics={comics.data?.body.comics || []}
        title={title}
        icon="radix/top"
        page={comics.data?.body.current_page || 1}
        totalPages={comics.data?.body.total_pages || 1}
        setPage={handlePaging}
      />
    </div>
  )
}
