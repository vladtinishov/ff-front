import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ViewerType } from './types/viewer.type'
import { LOCAL } from '@/shared/local'
import { useAuthLogic } from '@/shared/api-logic'
import type { ViewerDto, AuthViewerDto } from "@/shared/api-logic";
import { useRouter } from 'vue-router'

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
    },
    actions: {
      async signupUser(data: ViewerDto) {
        useAuthLogic.setUser(data)

        this.getViewer(data)
      },
      async getViewer(dto: AuthViewerDto) {
        const viewer = await useAuthLogic.getViewer(dto)

        if (!viewer) return false

        this.viewer = viewer
      }
    },
  }
)
