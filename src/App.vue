<script setup lang="ts">
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { MainLayout } from '@/layouts/main'
import { useAppStore } from './stores/app.store';
import { AuthLayout } from './layouts/auth';
import { computed, onMounted } from 'vue'
import { useViewerStore } from './stores/viewer.store';
import { storeToRefs } from 'pinia';
import { NewModeLayout } from './layouts/new-mode';

const appStore = useAppStore()
const viewerStore = useViewerStore()

const route = useRoute()
const router = useRouter()

const { isAccessTokenSet, viewer } = storeToRefs(viewerStore)

const isAuthPage = computed(() => {
  const AUTH_PAGES = ['signup-freelancer', 'signup-customer', 'login']
  return AUTH_PAGES.includes(<string>route.name!)
})

const isLogin = computed(() => {
  return <string>route.name == 'login'
})

const isSignupFreelancer = computed(() => {
  return <string>route.name == 'signup-freelancer'
})

const isNewMode = computed(() => viewer.value.isNewMode)

onMounted(() => {
  if (!isAccessTokenSet.value) router.push({ name: 'login' })
  if (isLogin.value && isAccessTokenSet.value) return router.push({ name: 'home' })

  appStore.init()
})
</script>

<template>
  <NewModeLayout v-if="isNewMode && !isAuthPage">
    <RouterView />
  </NewModeLayout>
  <AuthLayout v-else-if="isAuthPage" :is-login="isLogin" :is-freelancer="isSignupFreelancer">
    <RouterView />
  </AuthLayout>
  <MainLayout v-else>
    <RouterView />
  </MainLayout>
</template>

<style scoped>
</style>
