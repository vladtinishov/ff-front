<script lang="ts" setup>
import { FSection } from '@/shared/ui/base';
import { useViewerStore } from '@/stores';
import { InboxOutlined, UserOutlined } from '@ant-design/icons-vue';
import { storeToRefs } from 'pinia';
import { ref, computed, onMounted } from 'vue'

const viewerStore = useViewerStore()

const canShowModal = ref(false)

const fileList = ref([])
const percentage = ref(0)
const showChecking = ref(true)
const canShowOrder = ref(false)
const canShowResult = ref(false)
const canShowStars = ref(false)

const { viewer } = storeToRefs(viewerStore)

const viewerRole = computed(() => {
  if (viewer.value.role === 1) return 'Фрилансер'
  return 'Заказчик'
})

const viewerName = computed(() => {
  if (viewer.value.role === 1) return viewer.value.name
  return viewer.value.companyName
})

const likes = computed(() => {
  return Math.floor((Math.random() * 5) + 1)
})

const closedTasksCount = computed(() => {
  return Math.floor((Math.random() * 15) + 1)
})

const closeModal = () => canShowModal.value = false
const openModal = () => canShowModal.value = true
const handleDrop = () => {
  canShowOrder.value = false
  canShowResult.value = true
}


function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const showStars = () => {
  canShowStars.value = true
}

onMounted(async () => {
  await timeout(5000)
  canShowOrder.value = true
})

</script>

<template>
  <div :class="$style.container">
    <header class="w-full drop-shadow-lg justify-end">
      <div :class="[$style.contentColumn, $style.headerContainer]">
        <div :class="$style.userLogo">
          <div :class="$style.viewerContainer">
            <a-avatar round size="small" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
            <div :class="$style.viewerInfo">
              <h1 class="mb-0">{{ viewerName }}</h1>
              <div :class="$style.specialist">{{ viewerRole }}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div :class="$style.contentColumn" style="margin-top: 20px;">
      <FSection>
        <div class="flex items-start">
          <div class="flex flex-col items-center">
            <a-avatar :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }">
              <template #icon>
                <UserOutlined />
              </template>
            </a-avatar>
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
          <div class="ml-3">
            <div class="flex items-center">
              <h1 class="text-2xl m-0 mr-3">{{ viewer.name }} {{ viewer.surname }}</h1>
              <span
                class="rounded-2xl bg-gradient-to-r from-purple-400 via-pink-600 to-red-500 py-1 px-2 text-white font-bold">
                LP: 1200
              </span>
            </div>
            <div class="mt-2">
              {{ viewer.about }}
            </div>
          </div>
        </div>
      </FSection>
      <FSection class="mt-5" v-if="!canShowOrder && !canShowResult">
        <div class="w-full flex items-center flex-col">
          <h1 class="text-lg ">У вас пока нет заказов</h1>
          <div class="mt-2">
            <font-awesome-icon class="text-8xl mt-5" icon="fa-solid fa-inbox" />
          </div>
        </div>
      </FSection>
      <FSection class="mt-5" v-if="canShowOrder">
        <div>
          <h1 class="text-2xl">У вас появился заказ!</h1>
          <FSection>
            <div class="flex justify-between">
              <h1 class="text-lg mb-0 text-blue-500 cursor-pointer">Нужен лендинг и как можно скорее!</h1>
              <a-button title="Посмотреть" shape="circle" @click="openModal">
                <template #icon><font-awesome-icon icon="fa-solid fa-eye" /></template>
              </a-button>
            </div>
          </FSection>
        </div>
      </FSection>
      <FSection class="mt-5" v-if="canShowOrder">
        <h1 class="text-2xl">Загрузка результата</h1>
        <a-upload-dragger v-model:fileList="fileList" name="file" :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76" @drop="handleDrop">
          <p class="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p class="ant-upload-text">Кликните или перетащите файл</p>
        </a-upload-dragger>
      </FSection>
      <FSection class="my-5" v-if="canShowResult">
        <a-result status="success" title="Поздравляем!"
          sub-title="Заказчик принял ваш заказ и остался доволен результатом">
          <template #extra>
            <div v-if="!canShowStars">
              <a-button size="large" type="primary" shape="round" class="mr-5" @click="showStars">Оценить заказчика</a-button>
              <a-button size="large" shape="round" class="mt-5">Принято</a-button>
            </div>

            <div class="w-full flex items-center flex-col" v-if="canShowStars">
              <div class="flex mt-2">
                <router-link :to="{ name: 'home' }">
                  <div
                    class="rounded-full border-2 flex items-center justify-center text-lg font-bold mx-2 cursor-pointer hover:bg-gray-500 hover:text-white"
                    style="width: 40px; height: 40px;">
                    1
                  </div>
                </router-link>
                <router-link :to="{ name: 'home' }">
                  <div
                    class="rounded-full border-2 flex items-center justify-center text-lg font-bold mx-2 cursor-pointer hover:bg-gray-500 hover:text-white"
                    style="width: 40px; height: 40px;">
                    2
                  </div>
                </router-link>
                <router-link :to="{ name: 'home' }">
                  <div
                    class="rounded-full border-2 flex items-center justify-center text-lg font-bold mx-2 cursor-pointer hover:bg-gray-500 hover:text-white"
                    style="width: 40px; height: 40px;">
                    3
                  </div>
                </router-link>
                <router-link :to="{ name: 'home' }">
                  <div
                    class="rounded-full border-2 flex items-center justify-center text-lg font-bold mx-2 cursor-pointer hover:bg-gray-500 hover:text-white"
                    style="width: 40px; height: 40px;">
                    4
                  </div>
                </router-link>
                <router-link :to="{ name: 'home' }">
                  <div
                    class="rounded-full border-2 flex items-center justify-center text-lg font-bold mx-2 cursor-pointer hover:bg-gray-500 hover:text-white"
                    style="width: 40px; height: 40px;">
                    5
                  </div>
                </router-link>
              </div>
            </div>
          </template>
        </a-result>

      </FSection>
    </div>
  </div>
  <a-modal :footer="null" v-model:visible="canShowModal">
    <div class="flex justify-between">
      <h1 class="text-2xl">Нужен лендинг и как можно скорее!</h1>
    </div>
    <div class="mt-4">
      <h1 class="text-lg">Нужен лендинг и скорость то, что нам важно!</h1>
      <p>
        Для студии звукозаписи в Москве необходимо создать лендинг (одностраничный сайт) с учетом технического задания +
        верстка этого сайта.
        У нас уже был созданный сайт, но он никаких результатов не дал (скрины сайта можем отправить в лс)
      </p>
      <p>
        Главная задача - создать стильный современный дизайн, ПРОДАЮЩИЙ сайт.
        Подчеркнуть статусность, указать преимущества, услуги и цены на услуги, наполнить другой необходимой информацией.
        Есть лого и корпоративные цвета.
      </p>
    </div>
  </a-modal>
</template>

<style lang="scss" module>
@import './style.scss';
</style>