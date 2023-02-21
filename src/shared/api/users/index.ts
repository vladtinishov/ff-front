import { apiFabric } from "../api"
import type { UserDto } from "./dto"

const URL = 'users'

const api = apiFabric(URL)

export const users = {
  getFreelancers: (): Promise<UserDto[]> => api.get('/freelancers').then(d => d.data),
  getFreelancer: (id: number): Promise<UserDto> => api.get('/freelancers/' + id).then(d => d.data),
}

export * from './dto'