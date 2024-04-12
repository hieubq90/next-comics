import * as React from 'react'
import { cn } from '~/lib/utils'

const PageContent = React.forwardRef<
  HTMLDivElement,
  { header?: string; number: number; images: string[]; children?: React.ReactNode }
>(({ header, number, children, images = [] }, ref) => {
  const bgImage = React.useMemo(() => {
    const src = images.map((link) => `url("https://imgproxy.hieubq.io.vn/comics.php${link}")`)
    return src.join(', ')
  }, [images])

  return (
    <div
      className="page"
      ref={ref}
    >
      <div className="page-content">
        {header && <span className={cn('page-header', number % 2 === 0 && '!text-right')}>{header}</span>}
        <div
          className="page-image"
          style={{
            backgroundImage: bgImage,
          }}
        ></div>
        {/* <div className="page-text">{children}</div> */}
        <div className="page-footer">{number + 1}</div>
      </div>
    </div>
  )
})

PageContent.displayName = 'PageContent'

export default PageContent
