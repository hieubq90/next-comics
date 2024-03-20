import * as React from 'react'

const PageContent = React.forwardRef<HTMLDivElement, { number: number; children?: React.ReactNode }>(
  ({ number, children }, ref) => {
    return (
      <div
        className="page"
        ref={ref}
      >
        <div className="page-content">
          <h2 className="page-header">{`Trang - ${number}`}</h2>
          <div className="page-image"></div>
          {/* <div className="page-text">{children}</div> */}
          <div className="page-footer">{number + 1}</div>
        </div>
      </div>
    )
  }
)

PageContent.displayName = 'PageContent'

export default PageContent
