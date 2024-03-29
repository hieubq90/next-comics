'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import * as React from 'react'
import {
    NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList,
    navigationMenuTriggerStyle
} from '~/components/ui/navigation-menu'
import { cn } from '~/lib/utils'

import ModeToggle from './ModeToggle'

const Header: React.FC = () => {
  const pathname = usePathname()
  const { comic_id, chapter_id } = useParams<{ comic_id: string; chapter_id: string }>()

  const isReading = React.useMemo(() => !!chapter_id, [chapter_id])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full flex-none backdrop-blur transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 supports-backdrop-blur:bg-white/60 bg-white/80 dark:border-slate-50/[0.06] dark:bg-transparent',
        isReading && 'hidden'
      )}
    >
      <div className="mx-auto max-w-[90rem]">
        <div className="mx-4 border-b border-slate-900/10 py-2 dark:border-slate-300/10 lg:border-0">
          <div className="relative flex items-center">
            <a
              className="mr-3 flex items-center overflow-hidden w-auto"
              title="Trang chủ Dư Thanh Được"
              href="/"
            >
              <Image
                alt="Dư Thanh Được logo"
                loading="lazy"
                width="48"
                height="48"
                decoding="async"
                data-nimg="1"
                src="/comic.svg"
              />
              <span className="ml-2 font-baloo2 font-semibold text-xl text-primary">Next Comics</span>
            </a>
            <div className="relative ml-auto hidden items-center lg:flex">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link
                      href="/"
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                        active={pathname === '/'}
                      >
                        Trang Chủ
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      href="/new"
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                        active={pathname === '/new'}
                      >
                        Truyện Mới
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      href="/genres"
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                        active={pathname === '/genres'}
                      >
                        Thể Loại
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      href="/top"
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                        active={pathname === '/top'}
                      >
                        Top Truyện
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <div className="ml-6 flex items-center border-l border-slate-200 pl-6 dark:border-slate-800">
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
