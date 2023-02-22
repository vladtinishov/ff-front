import { apiFabric } from "../api"
import type { OrderDto } from "./dto"

const URL = 'orders'

const api = apiFabric(URL)

export const orders = {
  getMany: (): Promise<OrderDto[]> => api.get('/').then(d => d.data),
  getOne: (id: number): Promise<OrderDto> => api.get('/' + id).then(d => d.data),
}

export * from './dto'