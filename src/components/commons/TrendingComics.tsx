'use client'

import { useRouter } from 'next/navigation'
import * as React from 'react'
import { comicsClient } from '~/app/providers'
import { Button } from '~/components/ui/button'
import {
    Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious
} from '~/components/ui/carousel'
import { cn } from '~/lib/utils'

import { Authors } from './Authors'
import { ComicCard } from './ComicCard'
import { Icon } from './Icon'
import { Stats } from './Stats'
import styles from './TrendingComics.module.scss'

export default function TrendingComics() {
  const router = useRouter()

  const trendingComics = comicsClient.comics.trending.useQuery(['trending'])
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  const currentComic = React.useMemo(() => {
    if (trendingComics.isLoading || !trendingComics.data?.body?.comics) return undefined
    return trendingComics.data?.body?.comics[current]
  }, [current, trendingComics.data?.body?.comics, trendingComics.isLoading])

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <>
      {trendingComics.isLoading && <div>LOADING</div>}
      {!trendingComics.isLoading && !trendingComics.isError && trendingComics.data?.body.comics ? (
        <div
          className={cn(
            'w-full min-h-[400px] rounded-2xl p-4 md:pl-16 flex md:flex-row flex-col-reverse items-center justify-between text-white',
            styles.trending_container
          )}
        >
          {currentComic ? (
            <div className="mx-auto">
              <h4 className=" text-3xl sm:text-md font-extrabold mt-5 sm:mt-0">{currentComic?.title}</h4>
              <span className="mb-3 mt-1 text-sm font-semibold text-gray-400">
                {Array.isArray(currentComic?.other_names)
                  ? currentComic.other_names.join(' | ')
                  : currentComic?.other_names}
              </span>
              {/* <Genres genres={currentComic?.genres || []} /> */}
              <Authors authors={currentComic?.authors || []} />
              <Stats
                total_views={currentComic?.total_views || '0'}
                followers={currentComic?.followers || '0'}
              />
              {currentComic?.description && (
                <div className="mt-2">
                  <p className="line-clamp-3">{currentComic?.description.replace(/NetTruyen/g, 'NextComics')}</p>
                </div>
              )}
              <div className="flex flex-col sm:flex-row items-center gap-3 mt-5 font-bold">
                <Button
                  className="dark:text-white uppercase font-semibold"
                  onClick={() => router.push(`/comic/${currentComic?.id}`)}
                >
                  <Icon
                    name="radix/history"
                    className="text-lg mr-2"
                  />
                  Chi tiết
                </Button>
              </div>
            </div>
          ) : (
            <div></div>
          )}

          <div className="md:pr-16">
            <Carousel
              className="w-[250px]"
              setApi={setApi}
              opts={{
                align: 'center',
                loop: true,
              }}
            >
              <CarouselContent>
                {trendingComics.data.body.comics.map((comic, index) => (
                  <CarouselItem
                    key={comic.id}
                    className="max-w-[250px]"
                  >
                    <ComicCard
                      key={comic.id}
                      comic={comic}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="text-black dark:text-white hover:text-primary" />
              <CarouselNext className="text-black dark:text-white hover:text-primary" />
            </Carousel>
          </div>
        </div>
      ) : null}
    </>
  )
}
