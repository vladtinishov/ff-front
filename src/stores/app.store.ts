import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ViewerType } from './types/viewer.type'
import { LOCAL } from '@/shared/local'
import * as API from '@/shared/api'
import type { AppType } from './types/app.type'
import { LANGS, SPECIALIZATIONS } from '@/shared/models'
import { useUsersStore } from './users.store'
import { useViewerStore } from './viewer.store'

export const useAppStore = defineStore('app', {
  state: (): AppType => {
    return {
      langs: [],
      specializations: [],
      pageTitle: '',
    }
  },
  getters: {

  },
  actions: {
    init() {
      this.langs = LANGS
      this.specializations = SPECIALIZATIONS
      useViewerStore().getViewer()
      useUsersStore().getFreelancers()
    },
    setPageTitle(title: string) {
      this.pageTitle = title
    }
  },
}
)
