import type { UserDto } from "../../users"

export interface OrderUserDto {
  id: number
  orderId: number
  userId: number
  isApproved: boolean
  isApprovedByFreelancer: boolean
  isClosed: number
  likes: number
}