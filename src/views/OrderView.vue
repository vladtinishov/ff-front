<script setup lang="ts">
import { OrderForm } from '@/components/order';
import { useAppStore } from '@/stores';

const appStore = useAppStore()
appStore.setPageTitle('')
</script>

<template>
  <main>
    <div class="flex mt-5">
      <OrderForm />
    </div>
  </main>
</template>
