import { apiFabric } from "../api"
import type { ApplicationDto } from "./dto"

const URL = 'applications'

const api = apiFabric(URL)

export const applications = {
  getMany: (): Promise<ApplicationDto[]> => api.get('/').then(d => d.data),
  getOne: (id: number): Promise<ApplicationDto> => api.get('/' + id).then(d => d.data),
  create: (dto: ApplicationDto): Promise<ApplicationDto> => api.post('/', dto).then(d => d.data),
  save: (dto: ApplicationDto): Promise<ApplicationDto> => api.patch('/', dto).then(d => d.data),
  delete: (id: number) => api.delete('/' + id).then(d => d.data),
}

export * from './dto'