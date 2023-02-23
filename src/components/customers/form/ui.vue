<script lang="ts" setup>
import { useUsersStore, useViewerStore } from '@/stores'
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue'
import type { ApplicationDto } from '@/shared/api/applications'
import { ApplicationCard } from '@/components/applications';
import { ApplicationsSection } from '@/components/applications/section';
import { FSection } from '@/shared/ui/base';
import { OrdersSection } from '@/components/order';

const viewerStore = useViewerStore()

const { viewer } = storeToRefs(viewerStore)

const likes = computed(() => {
  let likes = 0

  viewer.value.ordersUsers?.forEach((userOrder) => likes += userOrder.likes)

  return likes / viewer.value.ordersUsers?.length!
})

const closedTasksCount = computed(() => {
  return viewer.value.ordersUsers?.filter(userOrder => userOrder.isClosed).length
})

viewerStore.getViewer()
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.sections">
      <div :class="$style.section">
        <div :class="$style.userMeta">
          <div class="flex flex-col">
            <div style="width: 150px" class="flex justify-center">
              <a-avatar :size="{ xs: 130, sm: 130, md: 130, lg: 130, xl: 130, xxl: 130 }"></a-avatar>
            </div>
          </div>
          <div :class="$style.userInfo">
            <div class="flex justify-between w-full">
              <div>
                <h1 class="mb-0 text-xl">{{ viewer.companyName }} {{  viewer.surname }}</h1>
              </div>
              <div>
                <router-link :to="{ name: 'user-settings' }">
                  <a-button title="Посмотреть" shape="circle">
                    <template #icon><font-awesome-icon icon="fa-solid fa-gear" /></template>
                  </a-button>
                </router-link>
              </div>
            </div>
            <div class="mt-4">
              {{ viewer.about }}
            </div>
          </div>
        </div>
      </div>
      <FSection class="mt-5">
        <OrdersSection :orders="viewer.orders!" :showEdit="true" />
      </FSection>
    </div>
    <div :class="[$style.section, $style.orderButton]">
      <p class="text-gray-500 leading-5">Создайте заказ и мы разместим отобразим его у фрилансеров</p>
      <RouterLink :to="{ name: 'order-page', params: { id: 'new' }}">
        <a-button type="primary" block size="large">Создать заказ</a-button>
      </RouterLink>
    </div>
  </div>
</template>

<style module lang="scss">
@import './style.scss';
</style>