<script setup lang="ts">
import { FreelancerForm } from '@/components/freelancers/form';
import { useAppStore } from '@/stores';


const appStore = useAppStore()
appStore.setPageTitle('')
</script>

<template>
  <div class="mt-5">
    <FreelancerForm />
  </div>
</template>
