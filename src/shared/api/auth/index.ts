import { apiFabric } from "../api"
import type { ViewerDto } from "../viewer"
import type { AuthViewerDto } from "./dto/auth-viewer.dto"

const URL = 'auth'

const api = apiFabric(URL)

export const auth = {
  signup: (dto: ViewerDto) => api.post('/signup', dto).then(d => d.data),
  login: (dto: AuthViewerDto) => api.post('/login', dto).then(d => d.data)
}

export * from './dto'