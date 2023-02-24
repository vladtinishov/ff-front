<script lang="ts" setup>
import { useOrdersStore, useViewerStore } from '@/stores'
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue'
import type { ApplicationDto } from '@/shared/api/applications'
import { ApplicationCard } from '@/components/applications';
import { FSection } from '@/shared/ui/base';
import { useRoute } from 'vue-router';

const route = useRoute()
const id = route.params.id

const orderStore = useOrdersStore()
const viewerStore = useViewerStore()

orderStore.getOne(+id)

const { order } = storeToRefs(orderStore)
const { viewer } = storeToRefs(viewerStore)

const selectedApplication = ref<ApplicationDto>()
const showModal = ref(false)

const openModal = () => {
  orderStore.sendOrder({ freelancerId: viewer.value.id!, orderId: order.value.id!, fromCustomer: false })
  showModal.value = true
}

const isTaked = computed(() => viewer.value.ordersUsers?.find(ou => ou.orderId === order.value.id)?.isApprovedByFreelancer)
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.sections">
      <FSection>
        <div :class="$style.header">
          <h1 class="text-lg">{{ order.task }}</h1>
          <p class="text-gray-500 text-right mb-2" style="width: 100px">
            {{ order.createdAt }}
          </p>
        </div>
        <div class="flex items-center">
          <a-avatar>{{ order.users?.[0]?.companyName[0] }}</a-avatar>
          <h1 class="m-0 ml-2">{{ order.users?.[0]?.companyName }}</h1>
        </div>
        <div>
          <p class="pb-0 pt-4" v-html="order.content"></p>
        </div>
      </FSection>
    </div> 
    <FSection :class="$style.orderButton" v-if="!isTaked && viewer.role === 1">
      <p class="text-gray-500 leading-5">Ожидание может занять от 1-го до 10-ти дней. Если за то время заказчик не принял вашу заявку, она будет автоматически отклонена</p>
      <a-button type="primary" block size="large" @click="openModal">Выполнить заказ</a-button>
    </FSection>
    <FSection :class="$style.orderButton" v-else-if="viewer.role === 2">
      <p class="text-gray-500 leading-5">Вы не можете выполнить заказ, так как являетесь Заказчиком. Войдите как Фрилансер, чтобы отправить отклик</p>
      <a-button type="primary" block size="large" disabled>Выполнить заказ</a-button>
    </FSection>
    <FSection :class="$style.orderButton" v-else>
      <p class="text-gray-500 leading-5">Ожидание может занять от 1-го до 10-ти дней. Если за то время заказчик не принял вашу заявку, она будет автоматически отклонена</p>
      <router-link :to="{ name: 'order-progress', params: { id: order.id } }">
        <a-button type="primary" block size="large" @click="openModal">Посмотреть статус</a-button>
      </router-link>
    </FSection>
  </div>
  <a-modal :footer="null" v-model:visible="showModal" :title="selectedApplication?.specialization!.name">
    <h1 class="text-lg">
      Ваш отклик отправлен заказчику!
    </h1>
    <p class="text-gray-500">Ожидайте его ответ, либо посмотрите другие заказы</p>
    <router-link :to="{ name: 'home' }">
      <div class="flex items-center mt-5">
        <font-awesome-icon icon="fa-solid fa-chevron-left" class="mr-2" />
        <span>Смотреть другие заказы</span>
      </div>
    </router-link>
  </a-modal>
</template>

<style module lang="scss">@import './style.scss';</style>