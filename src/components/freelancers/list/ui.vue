<script lang="ts" setup>
import { FreelancerCard } from '../card';

import { useUsersStore } from '@/stores';

const usersStore = useUsersStore()
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.item" v-for="freelancer in usersStore.freelancers">
      <FreelancerCard :freelancer="freelancer"  />
    </div>
  </div>
</template>

<style module lang="scss">
@import './style.scss';
</style>