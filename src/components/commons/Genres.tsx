import Link from 'next/link'
import { IGenre } from '~/types'

export const Genres = ({ genres }: { genres: IGenre[] }) => {
  return (
    <div className="font-bold text-sm flex flex-wrap items-center gap-2 my-1 ml-[-6px]">
      {genres.map((genre) => (
        <Link
          key={genre.id}
          href={`/genres?type=${genre.id}`}
          className="uppercase px-2 py-0.5 bg-transparent border-b-2 border-transparent hover:border-emerald-300 duration-100"
        >
          {genre.name}
        </Link>
      ))}
    </div>
  )
}

export default Genres
