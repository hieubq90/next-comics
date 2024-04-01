'use client'

import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { cn } from '~/lib/utils'

export default function TopNav() {
  const params = useParams<{ top_type: string }>()
  const { top_type } = params
  const router = useRouter()
  const handleChangeTab = React.useCallback(
    (tab: string) => {
      router.push(`/top/${tab}`)
    },
    [router]
  )

  const currentTab = React.useMemo(() => {
    if (!top_type) return 'all'
    return top_type
  }, [top_type])

  return (
    <Tabs
      className="my-2"
      defaultValue="all"
      value={currentTab}
      onValueChange={handleChangeTab}
    >
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger
          value="all"
          className={cn('uppercase data-[state=active]:bg-primary data-[state=active]:text-white')}
        >
          Tất cả
        </TabsTrigger>
        <TabsTrigger
          value="daily"
          className={cn('uppercase data-[state=active]:bg-primary data-[state=active]:text-white')}
        >
          Top Ngày
        </TabsTrigger>
        <TabsTrigger
          value="weekly"
          className={cn('uppercase data-[state=active]:bg-primary data-[state=active]:text-white')}
        >
          Top Tuần
        </TabsTrigger>
        <TabsTrigger
          value="monthly"
          className={cn('uppercase data-[state=active]:bg-primary data-[state=active]:text-white')}
        >
          Top Tháng
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
