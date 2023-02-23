<script setup lang="ts">
import { CustomerForm } from '@/components/customers';
import { ViewerForm } from '@/components/viewer/viewer-form';
import { FSection } from '@/shared/ui/base';
import { useAppStore, useViewerStore } from '@/stores';
import { storeToRefs } from 'pinia'

const viewerStore = useViewerStore()

const { viewer } = storeToRefs(viewerStore)

const appStore = useAppStore()
appStore.setPageTitle('')
</script>

<template>
  <div class="mt-5">
    <ViewerForm v-if="viewer.role === 1" />
    <CustomerForm v-else />
  </div>
</template>

<style module lang="scss">
.userForm {
  width: 500px;
}
</style>