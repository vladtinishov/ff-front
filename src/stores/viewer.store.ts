import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ViewerType } from './types/viewer.type'
import { LOCAL } from '@/shared/local'
import * as API from '@/shared/api'
import type { ViewerDto, AuthViewerDto } from "@/shared/api";
import { useRouter } from 'vue-router'
import { getCookie, setCookie } from '@/shared/utils'
import { ACCESS_TOKEN } from '@/stores/constants'

export const useViewerStore = defineStore('viewer', {
    state: (): ViewerType => {
      return {
        viewer: {
          id: 1,
          name: 'Vladislav',
          surname: 'Tinishov',
          login: 'vlad.tinishov',
          password: '1xbet',
          lang: 'ru',
          about: 'Я умею программировать',
          role: 1
        },
      }
    },
    getters: {
      isAccessTokenSet() {
        return !!getCookie(ACCESS_TOKEN)
      }
    },
    actions: {
      async signupUser(dto: ViewerDto) {
        const res = await API.auth.signup(dto)

        if (!res?.accessToken) return false

        setCookie(ACCESS_TOKEN, res.accessToken)

        return true
      },

      async loginUser(dto: AuthViewerDto) {
        const res= await API.auth.login(dto)
        
        if (!res?.accessToken) return false

        setCookie(ACCESS_TOKEN, res.accessToken)

        return true
      },

      async getViewer(dto: AuthViewerDto) {
        console.log('loged')
        // const viewer = await useAuthLogic.getViewer(dto)

        // if (!viewer) return false

        // this.viewer = viewer
      }
    },
  }
)
