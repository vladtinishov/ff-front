<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { MainLayout } from '@/layouts/main'
import { useAppStore } from './stores/app.store';
import { AuthLayout } from './layouts/auth';

const appStore = useAppStore()
appStore.init()
</script>

<template>
  <AuthLayout>
    <RouterView />
  </AuthLayout>
</template>

<style scoped>
</style>
