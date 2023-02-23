import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ViewerType } from './types/viewer.type'
import { LOCAL } from '@/shared/local'
import * as API from '@/shared/api'
import type { ViewerDto, AuthViewerDto } from "@/shared/api";
import { useRouter } from 'vue-router'
import { getCookie, setCookie } from '@/shared/utils'
import { ACCESS_TOKEN } from '@/stores/constants'
import type { UserDto } from '@/shared/api/users'

export const useUsersStore = defineStore('users', {
    state: () => {
      return {
        freelancers: [] as UserDto[],
        freelancer: {} as UserDto
      }
    },
    getters: {
    },
    actions: {
      async getFreelancers() {
        this.freelancers = await API.users.getFreelancers()
      },
      async getFreelancer(id: number) {
        this.freelancer = await API.users.getFreelancer(id)
      },
      
      async getFreelancersByOrderId(orderId: number) {
        const ordersUsers = await API.users.getFreelancersByOrderId(orderId)
        this.freelancers = ordersUsers.users!
      }
    },
  }
)
