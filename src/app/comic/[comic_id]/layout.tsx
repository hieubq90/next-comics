import { Suspense } from 'react'

export default function ComicLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Suspense>{children}</Suspense>
    </section>
  )
}
