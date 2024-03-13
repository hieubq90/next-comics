import axios from 'axios'

export const httpClient = axios.create({
  baseURL: 'https://comics-api.hieubq.io.vn/v1',
  withCredentials: false,
})