import { z } from 'zod'

export const Genre = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string()
})
