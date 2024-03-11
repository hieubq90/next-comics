'use client'

import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import {
    NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList,
    navigationMenuTriggerStyle
} from '~/components/ui/navigation-menu'

import ModeToggle from './ModeToggle'

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full flex-none backdrop-blur transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 supports-backdrop-blur:bg-white/60 bg-white/80 dark:border-slate-50/[0.06] dark:bg-transparent">
      <div className="mx-auto max-w-[90rem]">
        <div className="mx-4 border-b border-slate-900/10 py-2 dark:border-slate-300/10 lg:border-0">
          <div className="relative flex items-center">
            <a
              className="mr-3 w-[2.0625rem] flex items-center overflow-hidden md:w-auto"
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
              <span className="ml-2 font-baloo2 font-semibold text-lg">Next Comics</span>
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
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>Trang Chủ</NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      href="/genres"
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>Thể Loại</NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      href="/menu3"
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>Truyện Mới</NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      href="/menu3"
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>Top Truyện</NavigationMenuLink>
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
