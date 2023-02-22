<script lang="ts" setup>
import { useUsersStore } from '@/stores'
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue'
import type { ApplicationDto } from '@/shared/api/applications'
import { ApplicationCard } from '@/components/applications';

interface Props {
  applications: ApplicationDto[],
  showEdit?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showEdit: false
})


const selectedApplication = ref<ApplicationDto>()
const showModal = ref(false)

const openApplication = (id: number) => {
  selectedApplication.value = props.applications?.find((application) => application.id === id)
  showModal.value = true
}
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.section">
      <div>
        <h1 class="text-xl">Резюме</h1>
        <a-list :data-source="applications">
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
              <div v-if="showEdit">
                <RouterLink :to="{ name: 'application', params: { id: item.id } }">
                  <a-button title="Посмотреть" shape="circle" class="mr-4">
                    <template #icon><font-awesome-icon icon="fa-solid fa-pen" /></template>
                  </a-button>
                </RouterLink>
                <a-button title="Посмотреть" shape="circle" @click="openApplication(item.id)">
                  <template #icon><font-awesome-icon icon="fa-solid fa-eye" /></template>
                </a-button>
              </div>
              <a-button v-else title="Посмотреть" @click="openApplication(item.id)">
                <template #icon><font-awesome-icon icon="fa-solid fa-eye" /></template>
                <span class="ml-2 mb-2">Посмотреть</span>
              </a-button>
            </a-list-item>
          </template>
        </a-list>
      </div>
    </div>
  </div>
  <a-modal :footer="null" v-model:visible="showModal" :title="selectedApplication?.specialization!.name">
    <ApplicationCard :application="selectedApplication!" />  
  </a-modal>
</template>

<style module lang="scss">
@import './style.scss';
</style>