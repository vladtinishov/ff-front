<script setup lang="ts">
import { ViewerFrom } from '@/components/viewer/form';
import { FSection } from '@/shared/ui/base';
import { useAppStore, useViewerStore } from '@/stores';
import { SettignsFrom } from '@/components/viewer/settings-form'

const appStore = useAppStore()
const viewerStore = useViewerStore()
appStore.setPageTitle('Настройки пользователя')

</script>

<template>
  <div class="mt-5">
    <SettignsFrom :role="<1 | 2>viewerStore.viewer.role!" />
  </div>
</template>
