import * as React from 'react'

const PageContent = React.forwardRef<
  HTMLDivElement,
  { header?: string; number: number; images: string[]; children?: React.ReactNode }
>(({ header, number, children, images = [] }, ref) => {
  const bgImage = React.useMemo(() => {
    const src = images.map((link) => `url("https://comics-api.hieubq.io.vn/v1${link}")`)
    return src.join(', ')
  }, [images])

  return (
    <div
      className="page"
      ref={ref}
    >
      <div className="page-content">
        {header && <h2 className="page-header">{header}</h2>}
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
