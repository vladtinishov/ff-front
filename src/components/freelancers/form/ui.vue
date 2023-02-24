<script lang="ts" setup>
import { useOrdersStore, useUsersStore } from '@/stores'
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue'
import type { ApplicationDto } from '@/shared/api/applications'
import { ApplicationCard } from '@/components/applications';
import { OrderingForm } from '@/components/order'
import { useRoute } from 'vue-router';
import { UserOutlined } from '@ant-design/icons-vue';

const usersStore = useUsersStore()
const ordersStore = useOrdersStore()
const route = useRoute()

const id = route.params.id
const { freelancer } = storeToRefs(usersStore)

const applications = computed(() => freelancer.value.applications)
const selectedApplication = ref<ApplicationDto>()
const canShowApplicationModal = ref(false)
const canShowOrderModal = ref(false)
const selectedOrderId = ref<number>()

const likes = computed(() => {
  return Math.floor((Math.random() * 5) + 1)
})

const closedTasksCount = computed(() => {
  return Math.floor((Math.random() * 15) + 1)
})

const achievements = [
  {
    name: 'Быстрее всех',
    description: 'Фрилансер сделал более 10 заказов с оценкой не ниже 4'
  },
  {
    name: 'Дружелюбный',
    description: 'Более 15 заказчиков оценили приятное общение с фрилансером'
  },
]

const openApplication = (id: number) => {
  selectedApplication.value = applications.value?.find((application) => application.id === id)
  canShowApplicationModal.value = true
}

const openOrdering = () => {
  canShowOrderModal.value = true
}

const selectedOrder = (id: number) => {
  selectedOrderId.value = id
}

const onSendOrder = () => {
  console.log(selectedOrderId.value)
  canShowOrderModal.value = false
  ordersStore.sendOrder({ orderId: selectedOrderId.value!, freelancerId: freelancer.value.id!, fromCustomer: true })
}

usersStore.getFreelancer(+id!)
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.sections">
      <div :class="$style.section">
        <div :class="$style.userMeta">
          <div class="flex flex-col">
            <div style="width: 150px" class="flex justify-center">
              <a-avatar :size="{ xs: 130, sm: 130, md: 130, lg: 130, xl: 130, xxl: 130 }">
                <template #icon><UserOutlined /></template>
              </a-avatar>
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
            </div>
            <div class="mt-4">
              {{ freelancer.about }}
            </div>
            <div class="mt-3">
              <h1>Достижения</h1>
              <div>
                <a-tag color="green" v-for="achievement in achievements">
                  <a-tooltip placement="bottom">
                    <template #title>
                      <h1 class="text-white">{{ achievement.name }}</h1>
                      <p>{{ achievement.description }}</p>
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
                  <!-- <a-tooltip placement="bottom" v-if="item.isFavorite">
                    <template #title>
                      Избранное резюме
                    </template>
                    <div>
                      <font-awesome-icon icon="fa-solid fa-star" class="text-yellow-500 mb-1 ml-2" />
                    </div>
                  </a-tooltip> -->
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
      <a-button type="primary" block size="large" @click="openOrdering">Заказать услугу</a-button>
    </div>
  </div>
  <a-modal :footer="null" v-model:visible="canShowApplicationModal" :title="selectedApplication?.specialization!.name">
    <ApplicationCard :application="selectedApplication!" />  
  </a-modal>
  <a-modal 
    v-model:visible="canShowOrderModal" 
    title="Выберите заказ" 
    :okButtonProps="{ disabled: !selectedOrderId }" 
    cancelText="Отмена" 
    okText="Заказать"
    :onOk="onSendOrder"
  >
    <OrderingForm :freelancer-id="1" @onSelect="selectedOrder" />  
  </a-modal>
</template>

<style module lang="scss">
@import './style.scss';
</style>