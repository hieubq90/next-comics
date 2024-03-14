import { z } from 'zod'

export const Genre = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
})

export const SuggestedItem = z.object({
  id: z.string(),
  title: z.string(),
  thumbnail: z.string(),
  lastest_chapter: z.string(),
  genres: z.array(z.string()),
  authors: z.union([z.array(z.string()), z.string()]),
})

export const RecommendComic = z.object({
  id: z.string(),
  title: z.string(),
  thumbnail: z.string(),
  updated_at: z.string(),
  lastest_chapter: z.object({
    id: z.number(),
    name: z.string(),
  }),
})

export const Comic = z.object({
  id: z.string(),
  title: z.string(),
  thumbnail: z.string(),
  is_trending: z.boolean(),
  short_description: z.string(),
  lastest_chapters: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      updated_at: z.string(),
    })
  ),
  genres: z.array(
    z.object({
      id: z.string().optional(),
      name: z.string().optional(),
    })
  ),
  other_names: z.union([z.array(z.string()), z.string()]),
  status: z.string(),
  total_views: z.string(),
  total_comments: z.string(),
  followers: z.string(),
  updated_at: z.string(),
  authors: z.union([z.array(z.string()), z.string()]),
})

export const GetComicsResult = z.object({
  comics: z.array(Comic),
  total_pages: z.number(),
  current_page: z.number(),
})
