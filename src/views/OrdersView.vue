<script setup lang="ts">
import { OrderList } from '@/components/order';
import { useAppStore } from '@/stores';


const appStore = useAppStore()
appStore.setPageTitle('')
</script>

<template>
  <main>
    <div class="flex mt-5">
      <OrderList />
    </div>
  </main>
</template>
