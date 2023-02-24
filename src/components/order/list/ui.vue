<script lang="ts" setup>
import { FSection } from '@/shared/ui/base';
import { useOrdersStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { onMounted, computed } from 'vue'
import { OrderCard } from '../card';

const ordersStore = useOrdersStore()

const { orders } = storeToRefs(ordersStore)

const canShowList = computed(() => !!orders.value.length)

onMounted(() => {
  ordersStore.getMany()
})
</script>

<template>
  <div class="w-full mb-5" v-if="canShowList">
    <OrderCard :order="order" :key="order.id" v-for="order in orders" class="mt-5 first:mt-0" />
  </div>
  <div v-else  class="w-full flex justify-center mt-5">
    <FSection>
      <h1 class="text-2xl text-gray-500 text-center">На данный момент нет доступных заказов</h1>
      <div class="flex justify-center">
        <font-awesome-icon icon="fa-solid fa-universal-access" class="text-7xl mt-5" />
      </div>
    </FSection>
  </div>
</template>

<style module lang="scss">
@import './style.scss';
</style>