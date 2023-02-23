<script setup lang="ts">
import { CustomerClickedOrders } from '@/components/order';
import { FreelancerClickedOrders } from '@/components/freelancers/clicked-orders';
import { useAppStore, useViewerStore } from '@/stores';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

const appStore = useAppStore()
const viewerStore = useViewerStore()

appStore.setPageTitle('Статус заказов')

const { viewer } = storeToRefs(viewerStore)
</script>

<template>
  <main>
    <div class="flex mt-5">
      <FreelancerClickedOrders v-if="viewer.role === 1" />
      <CustomerClickedOrders v-else />
    </div>
  </main>
</template>
