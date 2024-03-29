type DynamicRoute = {
  path: string
  apiPath: string
  title: string
  icon: string
}

export const dynamicRoutes: DynamicRoute[] = [
  {
    path: '/new',
    apiPath: '/new-comics',
    title: 'New Comics',
    icon: 'clarity:new-solid',
  },
  {
    path: '/popular',
    apiPath: '/trending-comics',
    title: 'Popular Comics',
    icon: 'mdi:fire',
  },
  {
    path: '/completed',
    apiPath: '/completed-comics',
    title: 'Completed Comics',
    icon: 'ph:seal-check-fill',
  },
  {
    path: '/recent',
    apiPath: '/recent-update-comics',
    title: 'Recently Comics',
    icon: 'radix-icons:update',
  },
  {
    path: '/boy',
    apiPath: '/boy-comics',
    title: 'Boy Comics',
    icon: 'tabler:gender-male',
  },
  {
    path: '/girl',
    apiPath: '/girl-comics',
    title: 'Girl Comics',
    icon: 'tabler:gender-female',
  },
]
