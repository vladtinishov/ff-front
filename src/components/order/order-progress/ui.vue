<script lang="ts" setup>
import { FSection } from '@/shared/ui/base';
import { useRoute } from 'vue-router';
import { OrderCard } from '../card';
import { computed, ref } from 'vue'
import { useAppStore, useOrdersStore, useUsersStore, useViewerStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { stripTags } from '@/shared/utils';

const route = useRoute()
const appStore = useAppStore()
const ordersStore = useOrdersStore()
const viewerStore = useViewerStore()
const usersStore = useUsersStore()

const id = route.params.id
const { order } = storeToRefs(ordersStore)
const { viewer, file } = storeToRefs(viewerStore)
const { freelancer } = storeToRefs(usersStore)
const userOrder = computed(() => order.value.ordersUsers?.find(ou => ou.orderId === order.value.id))

appStore.setPageTitle('Просмотр статуса заказа')

const fileList = ref([])

const getData = async () => {
  await ordersStore.getOne(+id!)
  const freelancerId = order.value.ordersUsers!.find(ou => ou.isApproved)?.userId
  await usersStore.getFreelancer(freelancerId!)
  await viewerStore.getOrderFiles(freelancer.value.id!, order.value.id!)
}

const onUpload = async (data: any) => {
  const  formData = new FormData();
  formData.append("file", data.file);      
  formData.append("orderId", '' + order!.value!.id!);      
  viewerStore.uploadFile(formData)
  return true
}

const getFileLink = () => {
  return `http://localhost:3000/files/get-files?orderId=${order.value.id}&userId=${freelancer.value.id}`
}

getData()
</script>

<template>
  <div :class="$style.container">
    <FSection v-if="order?.id" class="w-full">
      <h1 class="text-2xl">Заказ</h1>
      <div :class="$style.container">
        <div :class="$style.header">
          <router-link :to="{ name: 'order', params: { id: order.id } }">
            <h1 class="text-lg text-blue-500">{{ order.task }}</h1>
          </router-link>
          <p class="text-gray-500 text-right mb-2" style="width: 100px">
            {{ order.createdAt }}
          </p>
        </div>
        <div class="line-clamp-3">
          <p class="pb-0 pt-4">{{ stripTags(order.content) }}</p>
        </div>
      </div>
    </FSection>
    <FSection v-if="viewer.role === 2 && freelancer?.id" class="mt-5 w-full">
      <h1 class="text-2xl">Исполнитель</h1>
      <FSection>
        <div class="flex items-center justify-between">
          <div class="flex items-center pb-0">
            <a-avatar src="https://joeschmoe.io/api/v1/random" />
            <div class="ml-2">
              <h1 class="mb-0">
                <RouterLink :to="{ name: 'freelancer-page', params: { id: freelancer.id } }">{{ freelancer.name }} {{ freelancer.surname }}</RouterLink>
              </h1>
            </div>
          </div>
        </div>
      </FSection>
    </FSection>
    <FSection v-if="viewer.role === 2 && freelancer?.id" class="my-5 w-full">
      <h1 class="text-2xl">Результат</h1>
      <FSection v-if="userOrder?.isApprovedByFreelancer">
        <div :class="$style.placeholder" v-if="!file">
          <h1 class="text-lg">Фрилансер ещё не сдал заказ</h1>
          <div>
            <font-awesome-icon class="text-8xl mt-5" icon="fa-solid fa-inbox" />
          </div>
        </div>
        <div :class="$style.placeholder" v-else>
          <h1 class="text-lg">Нажмите чтобы получить файл</h1>
          <div>
            <a href="http://localhost:3000/files/get-files?orderId=3&userId=1">
              <font-awesome-icon class="text-8xl mt-5" icon="fa-solid fa-file" />
            </a>
          </div>
        </div>
      </FSection>
      <FSection v-else>
        <div :class="$style.placeholder">
          <h1 class="text-lg">Фрилансер ещё не принял заказ</h1>
          <div>
            <font-awesome-icon class="text-8xl mt-5" icon="fa-solid fa-user-large-slash" />
          </div>
        </div>
      </FSection>
    </FSection>
    <FSection v-if="viewer.role === 1" class="my-5 w-full">
      <h1 class="text-2xl">Результат</h1>
      <FSection v-if="userOrder?.isApproved">
        <a-upload-dragger
          v-model:fileList="fileList"
          name="file"
          :multiple="true"
          :customRequest="onUpload"
          @change=""
          @drop=""
        >
          <p class="ant-upload-drag-icon">
            <font-awesome-icon icon="fa-solid fa-inbox" class="text-6xl text-blue-500" />
          </p>
          <p class="ant-upload-text">Кликните или перенести файлы</p>
        </a-upload-dragger>
      </FSection>
      <FSection v-else>
        <div :class="$style.placeholder">
          <h1 class="text-lg">Заказчик ещё вас не одобрил</h1>
          <div>
            <font-awesome-icon class="text-8xl mt-5" icon="fa-solid fa-user-large-slash" />
          </div>
        </div>
      </FSection>
    </FSection>
  </div>
</template>

<style module lang="scss">
@import './style.scss';
</style>
