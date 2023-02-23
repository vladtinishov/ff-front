<script setup lang="ts">
import { OrderFormPage } from '@/components/order';
import { useAppStore } from '@/stores';
import { useRoute } from 'vue-router';

const appStore = useAppStore()

const route = useRoute()

const isNew = route.params.id === 'new'

if (isNew) {
  appStore.setPageTitle('Добавление заказа')
} else appStore.setPageTitle('Редактирование заказа')
</script>

<template>
  <main>
    <div class="flex mt-5">
      <OrderFormPage :is-create="isNew" />
    </div>
  </main>
</template>
