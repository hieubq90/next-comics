import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { cn } from '~/lib/utils'

export default function TopNav({ currentTab, onChange }: { currentTab: string; onChange: (value: string) => void }) {
  return (
    <Tabs
      className="my-2"
      defaultValue="all"
      value={currentTab}
      onValueChange={onChange}
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
