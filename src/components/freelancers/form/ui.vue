<script lang="ts" setup>
import { useUsersStore } from '@/stores'
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue'
import type { ApplicationDto } from '@/shared/api/applications'
import { ApplicationCard } from '@/components/applications';

const usersStore = useUsersStore()

const { freelancer } = storeToRefs(usersStore)

const applications = computed(() => freelancer.value.applications)
const selectedApplication = ref<ApplicationDto>()
const showModal = ref(false)

const likes = computed(() => {
  let likes = 0

  freelancer.value.ordersUsers?.forEach((userOrder) => likes += userOrder.likes)

  return likes / freelancer.value.ordersUsers?.length!
})

const closedTasksCount = computed(() => {
  return freelancer.value.ordersUsers?.filter(userOrder => userOrder.isClosed).length
})

const openApplication = (id: number) => {
  console.log(id)
  selectedApplication.value = applications.value?.find((application) => application.id === id)
  showModal.value = true
}

usersStore.getFreelancer(1)
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
              <h1 class="mb-0 text-xl">{{ freelancer.name }} {{  freelancer.surname }}</h1>
              <p class="mb-0 text-gray-500">Web-design</p>
            </div>
            <div class="mt-4">
              {{ freelancer.about }}
            </div>
            <div class="mt-3">
              <h1>Достижения</h1>
              <div>
                <a-tag color="green" v-for="achievement in freelancer.achievements">
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
      <div :class="$style.section" class="mt-5">
        <div>
          <h1 class="text-xl">Резюме</h1>
          <a-list  :data-source="applications">
            <template #renderItem="{ item }">
              <a-list-item>
                <div class="cursor-pointer flex items-center">
                  <h1 class="text-blue-500" @click="openApplication(item.id)">{{ item.specialization.name }}</h1>
                  <a-tooltip placement="bottom" v-if="item.isFavorite">
                    <template #title>
                      Избранное резюме
                    </template>
                    <div>
                      <font-awesome-icon icon="fa-solid fa-star" class="text-yellow-500 mb-1 ml-2" />
                    </div>
                  </a-tooltip>
                </div>
                <a-button title="Посмотреть" @click="openApplication(item.id)">
                  <template #icon><font-awesome-icon icon="fa-solid fa-eye" /></template>
                  <span class="ml-2 mb-2">Посмотреть</span>
                </a-button>
              </a-list-item>
            </template>
          </a-list>
        </div>
      </div>
    </div>
    <div :class="[$style.section, $style.orderButton]">
      <p class="text-gray-500 leading-5">Ожидание может занять от 1-го до 10-ти дней. Если за то время фрилансер не возьмётся за заказ, ваш заказ будет удалён</p>
      <a-button type="primary" block size="large">Заказать услугу</a-button>
    </div>
  </div>
  <a-modal :footer="null" v-model:visible="showModal" :title="selectedApplication?.specialization!.name">
    <ApplicationCard :application="selectedApplication!" />  
  </a-modal>
</template>

<style module lang="scss">
@import './style.scss';
</style>