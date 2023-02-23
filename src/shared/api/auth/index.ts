import { apiFabric } from "../api"
import type { UserDto } from "../users"
import type { AuthViewerDto } from "./dto/auth-viewer.dto"

const URL = 'auth'

const api = apiFabric(URL)

export const auth = {
  signup: (dto: UserDto) => api.post('/signup', dto).then(d => d.data),
  login: (dto: AuthViewerDto) => api.post('/login', dto).then(d => d.data),
  get: (accessToken: string) => api.get('/authorized', { params: { accessToken }}).then(d => d.data),
  edit: (dto: UserDto) => api.patch('/', dto).then(d => d.data),
}

export * from './dto'