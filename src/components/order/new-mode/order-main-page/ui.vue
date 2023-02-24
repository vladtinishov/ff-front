<script lang="ts" setup>
import { useViewerStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { computed } from 'vue'

const viewerStore = useViewerStore()

const { viewer } = storeToRefs(viewerStore)

const viewerRole = computed(() => {
  if (viewer.value.role === 1) return 'Фрилансер'
  return 'Заказчик'
})

const viewerName = computed(() => {
  if (viewer.value.role === 1) return viewer.value.name
  return viewer.value.companyName

})
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.info">
      <div :class="$style.userLogo">
        <div :class="$style.viewerContainer">
          <a-avatar
            round
            size="small"
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
          <div :class="$style.viewerInfo">
            {{ viewerName }}
            <div :class="$style.specialist" class="text-gray-300">{{ viewerRole }}</div>
          </div>
        </div>
      </div>
      <div :class="$style.textContainer">
        <div :class="$style.text">
          <h1 class="text-5xl font-bold text-white">Быстрый заказ под ваши критерии</h1>
          <p class="text-3xl">
            Вы указываете, кто вам нужен и указываете цену, а система сама подберёт вам фрилансера.
          </p>
          <div :class="$style.button">
            <router-link :to="{ name: 'new-mode-order' }">
              <p class="text-3xl font-bold text-white">
                Создать заказ в FF-Agregator 
                <font-awesome-icon icon="fa-solid fa-chevron-right" class="ml-2"/>
              </p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.banner">
    </div>
  </div>
</template>

<style module lang="scss">
@import './style.scss';
</style>