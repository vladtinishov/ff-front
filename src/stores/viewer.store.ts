import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ViewerType } from './types/viewer.type'
import { LOCAL } from '@/shared/local'
import * as API from '@/shared/api'
import type { ViewerDto, AuthViewerDto, UserDto } from "@/shared/api";
import { useRouter } from 'vue-router'
import { getCookie, setCookie } from '@/shared/utils'
import { ACCESS_TOKEN } from '@/stores/constants'

export const useViewerStore = defineStore('viewer', {
    state: () => {
      return {
        file: {},
        viewer: {} as UserDto,
        isLoading: false,
      }
    },
    getters: {
      isAccessTokenSet() {
        return !!getCookie(ACCESS_TOKEN)
      }
    },
    actions: {
      async signupUser(dto: UserDto) {
        try {
          this.isLoading = true

          const res = await API.auth.signup(dto)

          if (!res?.accessToken) return false

          setCookie(ACCESS_TOKEN, res.accessToken)

          return true
        }
        catch {
          return false
        } 
        finally {
          this.isLoading = false
        }
      },

      async loginUser(dto: AuthViewerDto) {
        const res= await API.auth.login(dto)
        
        if (!res?.accessToken) return false

        setCookie(ACCESS_TOKEN, res.accessToken)

        return true
      },

      async getViewer() {
        const accessToken = getCookie('ff-access-token')
        const viewer = await API.auth.get(accessToken!)

        if (!viewer) return false

        this.viewer = viewer
      },

      async edit(dto: UserDto) {
        await API.auth.edit(dto)
      },

      async uploadFile(file: FormData) {
        await API.files.uploadFiles(file)
      },

      async getOrderFiles(userId: number, orderId: number) {
        this.file = await API.files.getOrderFiles({ orderId, userId })
      },

      async getFile(userId: number, orderId: number) {
        await API.files.getFiles({ orderId, userId })
      },

      async getAvatar(userId: number, orderId: number) {
        await API.files.getFiles({ orderId, userId })
      },
    },
  }
)
