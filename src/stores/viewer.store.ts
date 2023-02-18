import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ViewerType } from './types/viewer.type'
import { LOCAL } from '@/shared/local'

export const useViewerStore = defineStore('viewer', {
    state: (): ViewerType => {
      return {
        viewer: {
          id: 1,
          name: 'Констанин',
          surname: 'Фрилансеров',
          about: 'Молодой и успешный фрилансер ищет не занятые заказы',
          lang: 'ru',
          login: 'kostya',
          password: 'test',
          role: 1,
        },
      }
    },
    getters: {
      local: (state) => {
        return LOCAL[state.viewer.lang]
      }
    },
    actions: {

    },
  }
)
