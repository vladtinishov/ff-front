<script lang="ts" setup>
import type { UserDto } from '@/shared/api';
import { computed } from 'vue'
interface Props {
  freelancer: UserDto
}

const props = defineProps<Props>()

const likes = computed(() => {
  let likes = 0

  props.freelancer.ordersUsers?.forEach((userOrder) => likes += userOrder.likes)

  return likes / props.freelancer.ordersUsers?.length!
})

const closedTasksCount = computed(() => {
  return props.freelancer.ordersUsers?.filter(userOrder => userOrder.isClosed).length
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
          <font-awesome-icon icon="fa-solid fa-chevron-right" />
        </div>
      </a-tooltip>
    </template>
    <div class="flex items-center pb-0">
      <a-avatar src="https://joeschmoe.io/api/v1/random" />
      <div class="ml-2">
        <h1 class="mb-0"><RouterLink :to="{ name: 'freelancer-page', params: { id: freelancer.id } }">{{ freelancer.name }} {{ freelancer.surname }}</RouterLink></h1>
        <p class="mb-0 text-gray-500">Web-design</p>
      </div>
    </div>
    <div class="mt-3">
      {{ freelancer.about }}
    </div>
    <div class="mt-3">
      <h1>Главное достижение:</h1>
      <a-tag color="green">
        <a-tooltip placement="bottom">
          <template #title>
            <h1 class="text-white">Хороший парень</h1>
            <p>Достижение даётся когда фрилансер выполняет 15 заказов подряд со средней оценкой 4 балла</p>
          </template>
          <span class="p-2">Хороший парень</span>
        </a-tooltip>
      </a-tag>
    </div>
  </a-card>
</template>

<style module lang="scss">
@import './style.scss';
</style>