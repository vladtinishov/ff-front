<script lang="ts" setup>
import { ref } from 'vue'
import { FSection } from '@/shared/ui/base'
import type { OrderDto } from '@/shared/api/orders';
import { stripTags } from '@/shared/utils/common'
import { useViewerStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { computed } from 'vue'

const emit = defineEmits(['onSelect'])
const viewerStore = useViewerStore()
const { viewer } = storeToRefs(viewerStore)

const orders = computed(() => viewer.value.orders)

const selectedOrderId = ref<number>(orders.value![0].id!)
const isActive = computed(() => (id: number) => selectedOrderId.value === id)

emit('onSelect', selectedOrderId.value)

const setSelected = (id: number) => {
  selectedOrderId.value = id
  emit('onSelect', id)
}
</script>

<template>
  <div :class="$style.container">
    <div 
      :class="[$style.order, isActive(order.id!) ? $style.isActive : '']" 
      @click="setSelected(order.id!)" 
      v-for="order in orders"
    >
      <h1 class="mb-0">
        {{ order.task }}
      </h1>
    </div>
    <div class="mt-5">
      <router-link :to="{ name: 'order-page', params: { id: 'new' }}">
        <a-button type="dashed" block size="large" shape="round">Добавить новый</a-button>
      </router-link>
    </div>
  </div>
</template>

<style module lang="scss">
@import './style.scss';
</style>
