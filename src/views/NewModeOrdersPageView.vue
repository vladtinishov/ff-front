<script setup lang="ts">
import { OrdersPage } from '@/components/order/new-mode/orders-page';
import { useAppStore, useViewerStore } from '@/stores';
import { computed } from 'vue'

const appStore = useAppStore()

appStore.setPageTitle('')

</script>

<template>
  <main>
    <OrdersPage />
  </main>
</template>
