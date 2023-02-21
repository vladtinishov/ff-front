<script lang="ts" setup>
import { useUsersStore } from '@/stores'
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue'
import type { ApplicationDto } from '@/shared/api/applications'
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
  selectedApplication.value = applications.value.find((application) => application.id === id)
  showModal.value = true
}

usersStore.getFreelancer(1)
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.sections">
      <div :class="$style.section">
        <div class="flex">
          <div class="flex flex-col">
            <div style="width: 150px" class="flex justify-center">
              <a-avatar :size="{ xs: 130, sm: 130, md: 130, lg: 130, xl: 130, xxl: 130 }"></a-avatar>
            </div>
            <div class="flex justify-between px-5 mt-5">
              <a-tooltip placement="bottom">
                <template #title>
                  Рейтинг
                </template>
                <div>
                  <font-awesome-icon icon="fa-solid fa-star" class="text-gray-500 text-xl cursor-pointer" />
                  <span class="ml-2 text-gray-500">{{ likes }}</span>
                </div>
              </a-tooltip>
              <a-tooltip placement="bottom">
                <template #title>
                  Кол-во выполненных заданий
                </template>
                <div>
                  <font-awesome-icon icon="fa-solid fa-list-check" class="text-gray-500 text-xl cursor-pointer" />
                  <span class="ml-2 text-gray-500">{{ closedTasksCount }}</span>
                </div>
              </a-tooltip>
            </div>
          </div>
          <div class="ml-5">
            <div>
              <h1 class="mb-0 text-xl"><a href="">{{ freelancer.name }} {{  freelancer.surname }}</a></h1>
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
                <h1 style="width: 200px;">{{ item.specialization.name }}</h1>
                <a-button type="primary" @click="openApplication(item.id)">Открыть</a-button>
                <br>
              </a-list-item>
            </template>
          </a-list>
        </div>
      </div>
    </div>
    <div :class="$style.section" class="ml-5" style="width: 500px; height: 156px">
      <p class="text-gray-500 leading-5">Ожидание может занять от 1-го до 10-ти дней. Если за то время фрилансер не возьмётся за заказ, ваш заказ будет удалён</p>
      <a-button type="primary" block size="large">Сделать заказ</a-button>
    </div>
  </div>
  <a-modal v-model:visible="showModal" :title="selectedApplication?.specialization!.name">
    <p v-for="expirience in selectedApplication?.expiriences">{{ expirience }}</p>    
  </a-modal>
</template>

<style module lang="scss">
@import './style.scss';
</style>