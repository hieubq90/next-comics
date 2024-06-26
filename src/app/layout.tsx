import type { Metadata } from 'next'
import '~/assets/styles/main.scss'

import { Suspense } from 'react'
import { register } from 'swiper/element'
// import { Toaster } from 'react-hot-toast'
import { baloo2, quicksand } from '~/assets/fonts'
import Footer from '~/components/layout/Footer'
import Header from '~/components/layout/Header'
import { Toaster } from '~/components/ui/sonner'

import { Providers } from './providers'

register()

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
        {/* <video
          className="z-0 pointer-events-none"
          autoPlay
          muted
          loop
          id="video_bg"
        >
          <source
            src="bg.webm"
            type="video/webm"
          />
          <track
            src="captions_vi.vtt"
            kind="captions"
            srcLang="vi"
            label="vietnamese_captions"
          />
          Your browser does not support HTML5 video.
        </video> */}
        <Providers>
          <Header />
          <div style={{ minHeight: 'calc(100vh - 204px)' }}>
            <Suspense>{children}</Suspense>
          </div>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
