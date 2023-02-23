<script lang="ts" setup>
import { useUsersStore } from '@/stores'
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue'
import type { ApplicationDto } from '@/shared/api/applications'
import { ApplicationCard } from '@/components/applications';
import type { OrderDto } from '@/shared/api';

interface Props {
  orders: OrderDto[],
  showEdit?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showEdit: false
})

const selectedOrder = ref<OrderDto>()
const showModal = ref(false)

const openApplication = (id: number) => {
  selectedOrder.value = props.orders?.find((order) => order.id === id)
  showModal.value = true
}
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.section">
      <div>
        <h1 class="text-xl">Ваши заказы</h1>
        <a-list :data-source="orders">
          <template #renderItem="{ item }">
            <a-list-item>
              <div class="cursor-pointer flex items-center">
                <RouterLink :to="{ name: 'order', params: { id: item.id } }">
                  <h1 class="text-blue-500">{{ item.task }}</h1>
                </RouterLink>
                <!-- <a-tooltip placement="bottom">
                  <template #title>
                    Избранное резюме
                  </template>
                  <div>
                    <font-awesome-icon icon="fa-solid fa-star" class="text-yellow-500 mb-1 ml-2" />
                  </div>
                </a-tooltip> -->
              </div>
              <div v-if="showEdit">
                <RouterLink :to="{ name: 'order-page', params: { id: item.id } }">
                  <a-button title="Посмотреть" shape="circle" class="mr-4">
                    <template #icon><font-awesome-icon icon="fa-solid fa-pen" /></template>
                  </a-button>
                </RouterLink>
              </div>
              <a-button v-else title="Посмотреть" @click="openApplication(item.id)">
                <template #icon><font-awesome-icon icon="fa-solid fa-eye" /></template>
                <span class="ml-2 mb-2">Посмотреть</span>
              </a-button>
            </a-list-item>
          </template>
        </a-list>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
@import './style.scss';
</style>