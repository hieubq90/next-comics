import Link from 'next/link'
import { IGenre } from '~/types'

const Genres = ({ genres }: { genres: IGenre[] }) => {
  return (
    <div className="font-bold text-sm flex flex-wrap items-center gap-2 my-1">
      {genres.map((genre) => (
        <Link
          key={genre.id}
          href={`/genres?type=${genre.id}`}
          className="px-2 py-0.5 rounded bg-transparent border-2 border-emerald-300 duration-100 hover:bg-emerald-300"
        >
          {genre.name}
        </Link>
      ))}
    </div>
  )
}

export default Genres
