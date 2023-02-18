import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ViewerType } from './types/viewer.type'
import { LOCAL } from '@/shared/local'
import * as API from '@/shared/api-logic'
import type { AppType } from './types/app.type'

export const useAppStore = defineStore('app', {
    state: (): AppType => {
      return {
        langs: [],
      }
    },
    getters: {
      
    },
    actions: {
        init() {
            this.langs = API.getLangs()
        }
    },
  }
)
