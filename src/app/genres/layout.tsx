import type { Metadata } from 'next'
import * as React from 'react'
import { comicsClient } from '~/lib/ts-rest'
import { IGenre } from '~/types'

import { QueryClient, useQuery } from '@tanstack/react-query'

import GenreNav from './GenreNav'

export const metadata: Metadata = {
  title: 'NextComics - Truyện tranh theo thể loại',
  description: 'Truyện tranh hay theo thể loại',
}

export default async function TopLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { body } = await comicsClient.genres.get()

  return (
    <section>
      <main className="max-w-[72rem] mx-auto pt-5 pb-8 px-3">
        <GenreNav genres={(body as IGenre[]) || []} />
        <React.Suspense>{children}</React.Suspense>
      </main>
    </section>
  )
}
