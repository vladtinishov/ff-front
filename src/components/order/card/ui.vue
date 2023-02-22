<script lang="ts" setup>
import { ref } from 'vue'
import { FSection } from '@/shared/ui/base'
import type { OrderDto } from '@/shared/api/orders';

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
        <router-link :to="{ name: 'home' }">
          <h1 class="text-lg text-blue-500">{{ order.task }}</h1>
        </router-link>
        <p class="text-gray-500 text-right mb-2" style="width: 100px">
          {{ order.createdAt }}
        </p>
      </div>
      <div class="flex items-center">
        <a-avatar src="https://joeschmoe.io/api/v1/random" />
        <h1 class="m-0 ml-2">{{ order.users[0].companyName }}</h1>
      </div>
      <div class="line-clamp-3">
        <p class="pb-0 pt-4">{{ order.content }}</p>
      </div>
      <div class="pt-5">
        <a-button type="primary"><RouterLink :to="{ name: 'order', params: { id: 1 }}">Перейти</RouterLink></a-button>
      </div>
    </div>
  </FSection>
</template>

<style module lang="scss">
@import './style.scss';
</style>
