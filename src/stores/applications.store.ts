import { defineStore } from 'pinia'
import * as API from '@/shared/api'

import type { OrderDto } from '@/shared/api/orders'
import type { ApplicationDto } from '@/shared/api/applications'
import { useViewerStore } from './viewer.store'

export const useApplicationsStore = defineStore('application', {
    state: () => {
      return {
        isLoading: false,
        isDeleteLoading: false,
        applications: [] as ApplicationDto[],
        application: {} as ApplicationDto
      }
    },
    getters: {
    },
    actions: {
      async getMany() {
        this.applications = await API.applications.getMany()
      },
      async getOne(id: number) {
        this.application = await API.applications.getOne(id)
      },
      initForCreation() {
        this.application = {
          name: '',
          surname: '',
          education: {
            grade: '',
            name: '',
            specialization: ''
          },
          email: '',
          expiriences: [],
          hasExpirience: false,
          isActive: true,
          isFavorite: false,
          langs: [],
          phone: '',
          skills: [],
          specializationid: 0,
        }
      },
      async create() {
        try {
          this.isLoading = true
          await API.applications.create(this.application)
        } catch {
          return false
        } finally {
          this.isLoading = false
        }
      },
      async save() {
        try {
          this.isLoading = true
          await API.applications.save(this.application)
        } catch {
          return false
        } finally {
          this.isLoading = false
        }
      },
      async delete() {
        try {
          this.isDeleteLoading = true
          await API.applications.delete(this.application.id!)
        } catch {
          return false
        } finally {
          this.isDeleteLoading = false
        }
      },
      
    },
  }
)
