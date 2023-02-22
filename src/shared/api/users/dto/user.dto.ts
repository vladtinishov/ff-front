import type { AchievementsDto } from "../../achievements"
import type { ApplicationDto } from "../../applications"
import type { OrderUserDto } from "../../orders"
import type { OrderDto } from "../../orders"

export interface UserDto {
  id?: number
  companyName: string
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
  applications?: ApplicationDto[]
}