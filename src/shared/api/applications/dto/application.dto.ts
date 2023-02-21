export interface ApplicationDto {
  id: number
  userId: number
  specializationid: number
  expiriences: string[],
  hasExpirience: boolean
  specialization?: {
    name: string
    id: number
  }
}