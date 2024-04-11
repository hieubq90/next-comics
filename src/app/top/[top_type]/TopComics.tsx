'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'
import { comicsClient } from '~/app/providers'
import ComicPagination from '~/components/commons/ComicPagination'

export default function TopComics({
  type = 'all',
}: {
  type: 'all' | 'daily' | 'weekly' | 'monthly' | 'chapter' | 'follow' | 'comment'
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const page = searchParams.get('page')

  const topComics = comicsClient.comics.top.useQuery(['top', type, page ? page : '1'], {
    params: {
      top_type: type,
    },
    query: { page: page || '1' },
  })

  const handlePaging = React.useCallback(
    (page: string) => {
      router.push(`${pathname}?page=${page}`)
    },
    [pathname, router]
  )

  const handleChangeTab = React.useCallback(
    (tab: string) => {
      router.push(`/top/${tab}`)
    },
    [router]
  )

  const title = React.useMemo(() => {
    if (type === 'all') return 'Top Truyện'
    if (type === 'daily') return 'Top Truyện Trong Ngày'
    if (type === 'weekly') return 'Top Truyện Trong Tuần'
    if (type === 'monthly') return 'Top Truyện Trong Tháng'
    return ''
  }, [type])

  return (
    <div className="max-w-6xl mx-auto">
      <ComicPagination
        isLoading={topComics.isLoading}
        comics={topComics.data?.body.comics || []}
        title={title}
        icon="radix/top"
        page={topComics.data?.body.current_page || 1}
        totalPages={topComics.data?.body.total_pages || 1}
        setPage={handlePaging}
      />
    </div>
  )
}
