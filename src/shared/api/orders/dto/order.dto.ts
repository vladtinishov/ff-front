import type { UserDto } from "../../users"
import type { OrderUserDto } from "./order-user.dto"

export interface OrderDto {
  id?: number
  customerId: number
  users?: UserDto[]
  ordersUsers?: OrderUserDto[]
  task: string
  price?: number
  specializationId?: number
  isTaked: boolean
  content: string
  createdAt: string
  requiredQualityId?: number
  isClosed: boolean
}