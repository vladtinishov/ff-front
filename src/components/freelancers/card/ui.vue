<script lang="ts" setup>
import { FCard } from '@/shared/ui/base';


</script>

<template>
  <FCard :width="250">
    <template #meta-large>
      <div>
        <a-avatar src="https://joeschmoe.io/api/v1/random" :size="{ xs: 80, sm: 80, md: 80, lg: 80, xl: 80, xxl: 100 }" />
      </div>
      <div>
        <p>Hello</p>
        <span>sub</span>
      </div>
    </template>
    <template #main-text>
      Умный и талантливый фрилансер ищет красивый заказ
    </template>
  </FCard>
</template>