<script setup lang="ts">
import { OrderProgress } from '@/components/order';
import { useAppStore } from '@/stores';
import { useRoute } from 'vue-router';

const appStore = useAppStore()
appStore.setPageTitle('Заказ такой-то')
</script>

<template>
  <main>
    <div class="flex mt-5">
      <OrderProgress />
    </div>
  </main>
</template>
