<script lang="ts" setup>
import type { UserDto } from '@/shared/api';
import { computed } from 'vue'
interface Props {
  freelancer: UserDto
}

const props = defineProps<Props>()

const likes = computed(() => {
  return Math.floor((Math.random() * 5) + 1)
})

const closedTasksCount = computed(() => {
  return Math.floor((Math.random() * 15) + 1)
})

</script>

<template>
  <a-card hoverable style="width: 100%">
    <template #actions>
      <a-tooltip placement="bottom">
        <template #title>
          Рейтинг
        </template>
        <div>
          <font-awesome-icon icon="fa-solid fa-star" />
          <span class="ml-2">{{ likes }}</span>
        </div>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>
          Кол-во выполненных заданий
        </template>
        <div>
          <font-awesome-icon icon="fa-solid fa-list-check" />
          <span class="ml-2">{{ closedTasksCount }}</span>
        </div>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>
          Перейти на страницу
        </template>
        <div>
          <RouterLink :to="{ name: 'freelancer-page', params: { id: freelancer.id } }">
            <font-awesome-icon icon="fa-solid fa-chevron-right" />
          </RouterLink>
        </div>
      </a-tooltip>
    </template>
    <div class="flex items-center pb-0">
      <a-avatar>{{ freelancer.name[0] }}</a-avatar>
      <div class="ml-2">
        <h1 class="mb-0"><RouterLink :to="{ name: 'freelancer-page', params: { id: freelancer.id } }">{{ freelancer.name }} {{ freelancer.surname }}</RouterLink></h1>
      </div>
    </div>
    <div class="mt-3 line-clamp-3" style="height: 60px">
      {{ freelancer.about }}
    </div>
    <div class="mt-3">
      <h1>Главное достижение:</h1>
      <a-tag color="green">
        <a-tooltip placement="bottom">
          <template #title>
            <h1 class="text-white">Дружелюбный</h1>
            <p>Более 15 заказчиков оценили приятное общение с фрилансером</p>
          </template>
          <span class="p-2">Дружелюбный</span>
        </a-tooltip>
      </a-tag>
    </div>
  </a-card>
</template>

<style module lang="scss">
@import './style.scss';
</style>