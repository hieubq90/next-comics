import { z } from 'zod'

import { initContract } from '@ts-rest/core'

import { Genre } from './schemas'

const c = initContract()

const genreContact = c.router({
  get: {
    method: 'GET',
    path: '/genres',
    responses: {
      200: z.array(Genre),
    },
    summary: 'Get all genres'
  },
})

export const comicsApi = c.router({
  genres: genreContact
})
