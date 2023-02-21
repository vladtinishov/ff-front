import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ViewerType } from './types/viewer.type'
import { LOCAL } from '@/shared/local'
import * as API from '@/shared/api'
import type { AppType } from './types/app.type'
import { LANGS } from '@/shared/models'
import { useUsersStore } from './users.store'

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
      this.langs = LANGS
      useUsersStore().getFreelancers()
    }
  },
}
)
