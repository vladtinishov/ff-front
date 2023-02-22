<script lang="ts" setup>
import { useUsersStore, useViewerStore } from '@/stores'
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue'
import type { ApplicationDto } from '@/shared/api/applications'
import { ApplicationCard } from '@/components/applications';
import { ApplicationsSection } from '@/components/applications/section';
import { FSection } from '@/shared/ui/base';

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
            <div class="flex justify-between px-5 mt-5" style="width: 150px">
              <a-tooltip placement="bottom">
                <template #title>
                  Рейтинг
                </template>
                <div class="flex items-center">
                  <font-awesome-icon icon="fa-solid fa-star" class="text-gray-500 text-base cursor-pointer" />
                  <span class="ml-2 text-gray-500">{{ likes }}</span>
                </div>
              </a-tooltip>
              <a-tooltip placement="bottom">
                <template #title>
                  Кол-во выполненных заданий
                </template>
                <div class="flex items-center">
                  <font-awesome-icon icon="fa-solid fa-list-check" class="text-gray-500 text-base cursor-pointer" />
                  <span class="ml-2 text-gray-500">{{ closedTasksCount }}</span>
                </div>
              </a-tooltip>
            </div>
          </div>
          <div :class="$style.userInfo">
            <div>
              <h1 class="mb-0 text-xl">{{ viewer.name }} {{  viewer.surname }}</h1>
              <p class="mb-0 text-gray-500">Web-design</p>
            </div>
            <div class="mt-4">
              {{ viewer.about }}
            </div>
            <div class="mt-3">
              <h1>Достижения</h1>
              <div>
                <a-tag color="green" style="margin: 5px 0; margin-right: 5px" v-for="achievement in viewer.achievements">
                  <a-tooltip placement="bottom">
                    <template #title>
                      <h1 class="text-white">{{ achievement.name }}</h1>
                      <p>Достижение даётся когда фрилансер выполняет 15 заказов подряд со средней оценкой 4 балла</p>
                    </template>
                    <span class="p-2">{{ achievement.name }}</span>
                  </a-tooltip>
                </a-tag>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FSection class="mt-5">
        <ApplicationsSection :applications="viewer.applications!" :showEdit="true" />
      </FSection>
    </div>
    <div :class="[$style.section, $style.orderButton]">
      <p class="text-gray-500 leading-5">У вас может быть до 5 резюме разных специальностей. При этом вы можете создать только одно резюме выбранной специальности.</p>
      <RouterLink :to="{ name: 'application', params: { id: 'new' }}">
        <a-button type="primary" block size="large">Создать резюме</a-button>
      </RouterLink>
    </div>
  </div>
</template>

<style module lang="scss">
@import './style.scss';
</style>