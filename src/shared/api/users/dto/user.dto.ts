import type { AchievementsDto } from "../../achievements"
import type { ApplicationDto } from "../../applications"
import type { OrderUserDto } from "../../orders"
import type { OrderDto } from "../../orders copy/dto/order.dto"

export interface UserDto {
  id?: number
  name: string
  surname: string
  login: string
  password: string
  lang: string
  about: string
  role: number
  likes: number
  achievements?: AchievementsDto[]
  orders?: OrderDto[]
  ordersUsers?: OrderUserDto[]
  applications: ApplicationDto[]
}