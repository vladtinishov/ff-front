<script setup lang="ts">
import { CustomerUserPage } from '@/components/customers';
import { FreelancerUserPage } from '@/components/freelancers';
import { FreelancersList } from '@/components/freelancers/list';
import { NewModeOrderMainPage, OrderList } from '@/components/order';
import { useAppStore, useViewerStore } from '@/stores';
import { computed } from 'vue'

const viewerStore = useViewerStore()
const appStore = useAppStore()

appStore.setPageTitle('')

const isNewMode = computed(() => viewerStore.viewer.isNewMode)
</script>

<template>
  <main>
    <div v-if="isNewMode">
      <NewModeOrderMainPage v-if="viewerStore.viewer.role === 2" />
      <FreelancerUserPage v-else-if="viewerStore.viewer.role === 1" />
    </div>
    <div class="flex mt-5" v-else>
      <FreelancersList v-if="viewerStore.viewer.role === 2" />
      <OrderList v-else />
    </div>
  </main>
</template>
