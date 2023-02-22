<script setup lang="ts">
import { ApplicationForm } from '@/components/applications';
import { useAppStore } from '@/stores';
import { useRoute } from 'vue-router';

const appStore = useAppStore()

const route = useRoute()

const isNew = route.params.id === 'new'
if (isNew) {
  appStore.setPageTitle('Добавление резюме')
} appStore.setPageTitle('Редактирование резюме')
</script>

<template>
  <ApplicationForm :is-create="isNew" />
</template>
