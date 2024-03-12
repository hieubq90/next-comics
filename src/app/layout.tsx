import type { Metadata } from 'next'
import '~/assets/styles/main.scss'

// import { Toaster } from 'react-hot-toast'
import { baloo2, quicksand } from '~/assets/fonts'
import Header from '~/components/layout/Header'
import { Toaster } from '~/components/ui/sonner'

import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'NextComics - Trang đọc truyện tranh Tiếng Việt',
  description: 'NextComic được xây dựng trên NextJs',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="vi"
      className={`${quicksand.variable} ${baloo2.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen font-quicksand antialiased">
        <Providers>
          <Header />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
