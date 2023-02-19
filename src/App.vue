<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { MainLayout } from '@/layouts/main'
import { useAppStore } from './stores/app.store';
import { AuthLayout } from './layouts/auth';
import { computed } from 'vue'
const appStore = useAppStore()
appStore.init()

const route = useRoute()

const isAuthPage = computed(() => {
  const AUTH_PAGES = ['signup', 'login']
  return AUTH_PAGES.includes(<string>route.name!)
})

const isLogin = computed(() => {
  return <string>route.name == 'login'
})
</script>

<template>
  <AuthLayout v-if="isAuthPage" :is-login="isLogin">
    <RouterView />
  </AuthLayout>
  <MainLayout v-else>
    <RouterView />
  </MainLayout>
</template>

<style scoped>
</style>
