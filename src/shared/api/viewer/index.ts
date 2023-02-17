import { apiFabric } from "../api"

const URL = 'viewer'

const api = apiFabric(URL)

export const viewer = {
  get: () => api.get('/').then(d => d.data),
  edit: () => api.post('/').then(d => d.data)
}

export * from './dto'