import * as React from 'react'

const PageCover = React.forwardRef<HTMLDivElement, { comic?: string; chapter?: string; children?: React.ReactNode }>(
  (props, ref) => {
    const { comic, chapter, children } = props
    return (
      <div
        ref={ref}
        className="page page-cover"
        data-density="hard"
      >
        <div className="w-full h-full flex flex-col justify-center items-center">
          {comic && <p className="w-full text-center font-bold uppercase text-[36px]">{comic}</p>}
          {comic && <p className="w-full text-center text-[24px]">{chapter}</p>}
          <h2>{children}</h2>
        </div>
      </div>
    )
  }
)

PageCover.displayName = 'PageCover'

export default PageCover
