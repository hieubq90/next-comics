import * as React from 'react'

const PageCover = React.forwardRef<HTMLDivElement, { children?: React.ReactNode }>((props, ref) => {
  return (
    <div
      ref={ref}
      className="page page-cover"
      data-density="hard"
    >
      <div className="page-content">
        <h2>{props.children}</h2>
      </div>
    </div>
  )
})

PageCover.displayName = 'PageCover'

export default PageCover
