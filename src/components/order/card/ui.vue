<script lang="ts" setup>
import { ref } from 'vue'
import { FSection } from '@/shared/ui/base'
import type { OrderDto } from '@/shared/api/orders';
import { stripTags } from '@/shared/utils/common'
type Props = {
  order: OrderDto
}

defineProps<Props>()

const canShowModal = ref(false)

const showModal = () => {
  canShowModal.value = true
}
</script>

<template>
  <FSection>
    <div :class="$style.container">
      <div :class="$style.header">
        <router-link :to="{ name: 'order', params: { id: order.id } }">
          <h1 class="text-lg text-blue-500">{{ order.task }}</h1>
        </router-link>
        <p class="text-gray-500 text-right mb-2" style="width: 100px">
          {{ order.createdAt }}
        </p>
      </div>
      <div class="flex items-center">
        <a-avatar>{{ order?.users?.[0]?.companyName[0] }}</a-avatar>
        <h1 class="m-0 ml-2">{{ order?.users?.[0]?.companyName }}</h1>
      </div>
      <div class="line-clamp-3">
        <p class="pb-0 pt-4">{{ stripTags(order.content) }}</p>
      </div>
      <div class="pt-5">
        <a-button type="primary"><RouterLink :to="{ name: 'order', params: { id: order.id }}">Перейти</RouterLink></a-button>
      </div>
    </div>
  </FSection>
</template>

<style module lang="scss">
@import './style.scss';
</style>
