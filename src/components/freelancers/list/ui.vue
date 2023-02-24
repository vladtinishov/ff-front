<script lang="ts" setup>
import { FreelancerCard } from '../card';
import { computed } from 'vue'
import { useUsersStore } from '@/stores';
import { FSection } from '@/shared/ui/base';

const usersStore = useUsersStore()

const canShowList = computed(() => !!usersStore.freelancers.length)
</script>

<template>
  <div :class="$style.container" v-if="canShowList">
    <div :class="$style.item" v-for="freelancer in usersStore.freelancers">
      <FreelancerCard :freelancer="freelancer"  />
    </div>
  </div>
  <div v-else class="w-full flex justify-center mt-5">
    <FSection>
      <h1 class="text-2xl text-gray-500 text-center">На данный момент нет доступных фрилансеров</h1>
      <div class="flex justify-center">
        <font-awesome-icon icon="fa-solid fa-universal-access" class="text-7xl mt-5" />
      </div>
    </FSection>
  </div>
</template>

<style module lang="scss">
@import './style.scss';
</style>