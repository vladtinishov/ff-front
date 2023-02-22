<script lang="ts" setup>
import { useOrdersStore } from '@/stores'
import { storeToRefs } from 'pinia';
import { ref, onMounted } from 'vue'
import type { ApplicationDto } from '@/shared/api/applications'
import { ApplicationCard } from '@/components/applications';
import { FSection } from '@/shared/ui/base';

const orderStore = useOrdersStore()
orderStore.getOne(1)

const { order } = storeToRefs(orderStore)

const selectedApplication = ref<ApplicationDto>()
const showModal = ref(false)

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
          <a-avatar src="https://joeschmoe.io/api/v1/random" />
          <h1 class="m-0 ml-2">{{ order.users?.[0]?.companyName }}</h1>
        </div>
        <div>
          <p class="pb-0 pt-4" v-html="order.content"></p>
        </div>
      </FSection>
    </div> 
    <FSection :class="$style.orderButton">
      <p class="text-gray-500 leading-5">Ожидание может занять от 1-го до 10-ти дней. Если за то время заказчик не принял вашу заявку, она будет автоматически отклонена</p>
      <a-button type="primary" block size="large">Выполнить заказ</a-button>
    </FSection>
  </div>
  <a-modal :footer="null" v-model:visible="showModal" :title="selectedApplication?.specialization!.name">
    <ApplicationCard :application="selectedApplication!" />
  </a-modal>
</template>

<style module lang="scss">@import './style.scss';</style>