<script lang="ts" setup>
import { useOrdersStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue'
import { OrderCard } from '../card';

const ordersStore = useOrdersStore()

const { orders } = storeToRefs(ordersStore)

onMounted(() => {
  ordersStore.getMany()
})
</script>

<template>
  <div class="w-full">
    <OrderCard :order="order" :key="order.id" v-for="order in orders" />
  </div>
</template>

<style module lang="scss">
@import './style.scss';
</style>