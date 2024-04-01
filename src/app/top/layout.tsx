import type { Metadata } from 'next'
import * as React from 'react'

import TopNav from './TopNav'

export const metadata: Metadata = {
  title: 'NextComics - Top truyện tranh',
  description: 'Top truyện tranh hay',
}

export default function TopLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section>
      <main className="max-w-[72rem] mx-auto pt-5 pb-8 px-3">
        <TopNav />
        <React.Suspense>{children}</React.Suspense>
      </main>
    </section>
  )
}
