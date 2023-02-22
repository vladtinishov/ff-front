import type { UserDto } from "../../users"

export interface OrderDto {
  id: number
  customerId: number
  users: UserDto[]
  task: string
  content: string
  createdAt: string
  requiredQualityId: number
}