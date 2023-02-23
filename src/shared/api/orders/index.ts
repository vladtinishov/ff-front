import { apiFabric } from "../api"
import type { OrderDto } from "./dto"
import type { SendOrderDto } from "./dto/send-order.dto"
import type { SetApproveDto } from "./dto/set-approve.dto"

const URL = 'orders'

const api = apiFabric(URL)

export const orders = {
  getMany: (): Promise<OrderDto[]> => api.get('/').then(d => d.data),
  getOne: (id: number): Promise<OrderDto> => api.get('/' + id).then(d => d.data),
  create: (dto: OrderDto) => api.post('/', dto).then(d => d.data),
  save: (dto: OrderDto) => api.patch('/', dto).then(d => d.data),
  delete: (id: number) => api.delete('/' + id).then(d => d.data),
  setApprove: (dto: SetApproveDto) => api.patch('/set-approve', dto).then(d => d.data),
  sendOrder: (dto: SendOrderDto) => api.post('/set-order-user', dto).then(d => d.data),
}

export * from './dto'