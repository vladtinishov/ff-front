import { apiFabric } from "../api"

const URL = 'achievements'

const api = apiFabric(URL)

export const achievements = {
  signup: () => api.post('/').then(d => d.data),
  login: () => api.post('/').then(d => d.data)
}

export * from './dto'