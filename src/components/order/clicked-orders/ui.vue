<script lang="ts" setup>
import type { UserDto } from '@/shared/api';
import { stripTags } from '@/shared/utils';
import { useViewerStore, useOrdersStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue'
import { FSection } from '@/shared/ui/base'
import { ClickedFreelancers } from '@/components/freelancers'

const viewerStore = useViewerStore()
const ordersStore = useOrdersStore()

const { viewer } = storeToRefs(viewerStore)

const orders = computed(() => viewer.value.orders)

const canShowFreelancersModal = ref<boolean>(false)
const selectedOrderId = ref<number>()

const showModal = (id: number) => {
  canShowFreelancersModal.value = true
  selectedOrderId.value = id
}

const onSelect = (id: number) => {
  canShowFreelancersModal.value = false
  ordersStore.setApprove({ id: selectedOrderId.value!, freelancerId: id, fromCustomer: true })

  viewerStore.getViewer()
}

viewerStore.getViewer()
</script>

<template>
  <a-list item-layout="horizontal" :data-source="orders" class="w-full">
    <template #renderItem="{ item }">
      <a-list-item>
        <FSection class="w-full">
          <div :class="$style.container">
            <div :class="$style.header">
              <router-link :to="{ name: 'order', params: { id: item.id } }">
                <h1 class="text-lg text-blue-500">{{ item.task }}</h1>
              </router-link>
              <p class="text-gray-500 text-right mb-2" style="width: 100px">
                {{ item.createdAt }}
              </p>
            </div>
            <div class="line-clamp-3">
              <p class="pb-0 pt-4">{{ stripTags(item.content) }}</p>
            </div>
            <div :class="$style.statusBar">
              <div class="flex mt-2">
                <a-button type="primary" shape="round" @click="showModal(item.id!)" v-if="!item.isTaked">
                  Смотреть отклики
                </a-button>
                <router-link :to="{ name: 'order-progress', params: { id: item.id! }}" v-else>
                  <a-button type="primary" shape="round" @click="showModal(item.id!)">
                    Смотреть прогресс
                  </a-button>
                </router-link>
              </div>
            </div>
          </div>
        </FSection>
      </a-list-item>
    </template>
  </a-list>

  <a-modal 
    v-model:visible="canShowFreelancersModal" 
    title="Выберите фрилансера" 
    :footer="null"
    :destroyOnClose="true"
  >
    <ClickedFreelancers :order-id="selectedOrderId!" @onSelect="onSelect"  />
  </a-modal>
</template>

<style module lang="scss">
@import './style.scss';
</style>