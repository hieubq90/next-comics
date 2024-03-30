'use client'

import { useSearchParams } from 'next/navigation'
import * as React from 'react'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import {
    Pagination, PaginationContent, PaginationEllipsis, PaginationItem
} from '~/components/ui/pagination'
import { Comic } from '~/lib/schemas'

import { ComicCard } from './ComicCard'
import { Icon } from './Icon'

type IComic = z.infer<typeof Comic>

export default function ComicPagination({
  isLoading,
  comics,
  title,
  icon,
  page,
  totalPages,
  setPage,
}: {
  isLoading: boolean
  comics: IComic[]
  title?: string
  icon: string
  page: number
  totalPages: number
  setPage?: (page: string) => void
}) {
  const searchParams = useSearchParams()
  const currentPage = searchParams.get('page')
  return (
    <>
      {title && (
        <h2 className="flex items-center gap-2 text-primary text-xl title md:text-3xl font-bold uppercase mb-4 mt-12">
          <Icon
            name={icon}
            className="text-[36px]"
          />
          {`${title} - Trang ${currentPage || 1}`}
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-1.5 md:gap-3 responsive-devices">
        {isLoading
          ? Array.from(Array(12).keys()).map((e) => (
              <div
                key={e}
                className="aspect-[2/3] rounded bg-gray-100 animation-pulse"
              />
            ))
          : comics.map((comic) => (
              <ComicCard
                key={comic.id}
                comic={comic}
                detail
              />
            ))}
      </div>
      {totalPages > 1 && (
        <Pagination className="my-4">
          <PaginationContent>
            <Button
              size="icon"
              variant={'ghost'}
              disabled={page === 1}
              onClick={() => setPage?.('1')}
            >
              <Icon name="radix/double-arrow-left" />
            </Button>
            <PaginationItem>
              <Button
                size={'icon'}
                variant={'ghost'}
                disabled={page === 1}
                onClick={() => setPage?.(`${page - 1}`)}
              >
                <Icon name="radix/chevron-left" />
              </Button>
            </PaginationItem>
            {page > 1 && (
              <PaginationItem>
                <Button
                  size="icon"
                  variant={'ghost'}
                  onClick={() => setPage?.('1')}
                >
                  1
                </Button>
              </PaginationItem>
            )}
            {page > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {page > 2 && (
              <PaginationItem>
                <Button
                  size="icon"
                  variant={'ghost'}
                  onClick={() => setPage?.(`${page - 1}`)}
                >
                  {page - 1}
                </Button>
              </PaginationItem>
            )}
            <PaginationItem>
              <Button size="icon">{page}</Button>
            </PaginationItem>
            {totalPages - page > 1 && (
              <PaginationItem>
                <Button
                  size="icon"
                  variant={'ghost'}
                  onClick={() => setPage?.(`${page + 1}`)}
                >
                  {page + 1}
                </Button>
              </PaginationItem>
            )}
            {totalPages - page > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {page < totalPages && (
              <PaginationItem>
                <Button
                  size="icon"
                  variant={'ghost'}
                  onClick={() => setPage?.(`${totalPages}`)}
                >
                  {totalPages}
                </Button>
              </PaginationItem>
            )}
            <Button
              size="icon"
              variant={'ghost'}
              disabled={page === totalPages}
              onClick={() => setPage?.(`${page + 1}`)}
            >
              <Icon name="radix/chevron-right" />
            </Button>
            <Button
              size="icon"
              variant={'ghost'}
              disabled={page === totalPages}
              onClick={() => setPage?.(`${totalPages}`)}
            >
              <Icon name="radix/double-arrow-right" />
            </Button>
          </PaginationContent>
        </Pagination>
      )}
    </>
  )
}
