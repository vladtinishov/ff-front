import { defineStore } from 'pinia'
import * as API from '@/shared/api'

import type { OrderDto, OrderUserDto } from '@/shared/api/orders'
import { useViewerStore } from './viewer.store'
import type { SetApproveDto } from '@/shared/api/orders/dto/set-approve.dto'
import type { SendOrderDto } from '@/shared/api/orders/dto/send-order.dto'

export const useOrdersStore = defineStore('order', {
    state: () => {
      return {
        isDeleteLoading: false,
        orders: [] as OrderDto[],
        order: {} as OrderDto,
        initialOrder: {} as OrderDto,
        isLoading: false,
        isSetApproveLoading: false,
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
        return this.order
      },
      initForCreation() {
        const viewer = useViewerStore().viewer
        this.order = {
          isTaked: false,
          content: '',
          createdAt: '',
          customerId: viewer.id!,
          task: '',
          isClosed: false,
        }
      },

      async create() {
        try {
          this.isLoading = true
          await API.orders.create(this.order)
        } catch {
          return false
        } finally {
          this.isLoading = false
        }
      },
      
      async save() {
        try {
          this.isLoading = true
          await API.orders.save(this.order)
        } catch {
          return false
        } finally {
          this.isLoading = false
        }
      },

      async delete() {
        try {
          this.isDeleteLoading = true
          await API.orders.delete(this.order.id!)
        } catch {
          return false
        } finally {
          this.isDeleteLoading = false
        }
      },

      async setApprove(dto: SetApproveDto) {
        const viewerStore = useViewerStore()
        try {
          await API.orders.setApprove(dto)
          const orderUsers: OrderUserDto = viewerStore.viewer.ordersUsers?.find(({ orderId }) => orderId === dto.id)!
          const order: OrderDto = viewerStore.viewer.orders?.find(({ id }) => id === dto.id)!

          orderUsers.isApproved = true
          order.isTaked = true
        } catch {
          return false
        }
      },

      async sendOrder(dto: SendOrderDto) {
        const viewerStore = useViewerStore()

        try {
          await API.orders.sendOrder(dto)
          const orderUsers: OrderUserDto = viewerStore.viewer.ordersUsers?.find(({ orderId }) => orderId === dto.orderId)!
          const order: OrderDto = viewerStore.viewer.orders?.find(({ id }) => id === dto.orderId)!

          orderUsers.isApproved = true
          order.isTaked = true
        } catch {
          return false
        }
      }
    },
  }
)
