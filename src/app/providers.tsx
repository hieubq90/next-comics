'use client'

import { AxiosError, isAxiosError, Method } from 'axios'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import { useState } from 'react'
import { httpClient } from '~/lib/axios'
import { comicsApi } from '~/lib/ts-rest'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import { initQueryClient } from '@ts-rest/react-query'

import ThemeProvider from './theme-provider'

export const comicsClient = initQueryClient(comicsApi, {
  baseUrl: 'https://comics-api.hieubq.io.vn/v1',
  baseHeaders: {},
  api: async ({ path, method, headers, body }) => {
    try {
      const result = await httpClient.request({
        method: method as Method,
        url: path,
        headers,
        data: body,
      })
      return { status: result.status, body: result.data, headers: new Headers() }
    } catch (e: Error | AxiosError | any) {
      if (isAxiosError(e)) {
        return { status: 500, body: e.message, headers: new Headers() }
      }
      throw e
    }
  },
  credentials: 'omit',
})

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            staleTime: 5 * 1000,
            retry: 1,
          },
        },
      })
  )
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryStreamedHydration>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ReactQueryStreamedHydration>
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
      <ProgressBar
        height="2px"
        color="#10B981"
        options={{ showSpinner: true }}
        shallowRouting
      />
    </>
  )
}
