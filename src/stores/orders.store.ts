import { defineStore } from 'pinia'
import * as API from '@/shared/api'

import type { OrderDto } from '@/shared/api/orders'

export const useOrdersStore = defineStore('order', {
    state: () => {
      return {
        orders: [] as OrderDto[],
        order: {} as OrderDto
      }
    },
    getters: {
    },
    actions: {
      async getMany() {
        this.orders = await API.orders.getMany()
      },
      async getOne(id: number) {
        this.order = await API.orders.getOne(id)
      }
    },
  }
)
