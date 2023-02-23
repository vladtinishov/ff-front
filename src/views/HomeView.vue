<script setup lang="ts">
import { FreelancersList } from '@/components/freelancers/list';
import { OrderList } from '@/components/order';
import { useViewerStore } from '@/stores';

const viewerStore = useViewerStore()
</script>

<template>
  <main>
    <div class="flex mt-5">
      <FreelancersList v-if="viewerStore.viewer.role === 2" />
      <OrderList v-else />
    </div>
  </main>
</template>
