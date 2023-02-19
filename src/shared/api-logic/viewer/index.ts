import type { AuthViewerDto, ViewerDto } from "./types";

export * from './types'

export const useAuthLogic = {
  users: [] as ViewerDto[],
  viewer: {} as ViewerDto,

  async setUser(dto: ViewerDto) {
    this.users.push(dto)
  },
  
  async getViewer(dto: AuthViewerDto) {
    const viewer = this.users.find((user) => {
      const isPasswordMatches = user.password !== dto.password
      const isLoginMatches = user.login !== dto.login

      return isPasswordMatches && isLoginMatches
    })

    if (!viewer) return false
    
    return viewer
  },

}