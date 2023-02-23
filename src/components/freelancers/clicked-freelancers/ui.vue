<script lang="ts" setup>
import type { UserDto } from '@/shared/api';
import { FSection } from '@/shared/ui/base';
import { useUsersStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { ref } from 'vue'

interface Props {
  orderId: number
}

const props = defineProps<Props>()
const emit = defineEmits(['onSelect'])

const usersStore = useUsersStore()

const { freelancers } = storeToRefs(usersStore)
const selectedId = ref<number>()

usersStore.getFreelancersByOrderId(props.orderId)

const onSelect = (id: number) => {
  selectedId.value = id
  emit('onSelect', id)
}
</script>

<template>
  <a-list item-layout="horizontal" :data-source="freelancers">
    <template #renderItem="{ item }">
      <a-list-item>
        <FSection class="w-full">
          <div class="flex items-center justify-between">
            <div class="flex items-center pb-0">
              <a-avatar src="https://joeschmoe.io/api/v1/random" />
              <div class="ml-2">
                <h1 class="mb-0">
                  <RouterLink :to="{ name: 'freelancer-page', params: { id: item.id } }">{{ item.name }} {{ item.surname }}</RouterLink>
                </h1>
              </div>
            </div>
            <div>
              <a-button shape="rounded" type="primary" @click="onSelect(item.id!)">
                Выбрать
              </a-button>
            </div>
          </div>
        </FSection>
      </a-list-item>
    </template>
  </a-list>
</template>

<style module lang="scss">
@import './style.scss';
</style>