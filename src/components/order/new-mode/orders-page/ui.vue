<script lang="ts" setup>
import type { OrderDto } from '@/shared/api';
import { FSection } from '@/shared/ui/base';
import { useAppStore, useViewerStore } from '@/stores';
import { UserOutlined } from '@ant-design/icons-vue';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue'

const viewerStore = useViewerStore()
const appStore = useAppStore()
const specializations = computed(() => appStore.specializations)

const canShowModal = ref(true)
const canShowOrdersModal = ref(false)
const order = ref<OrderDto>({ specializationId: specializations.value[0].value } as OrderDto)
const editor = ref()

const canSave = computed(() => !!order.value.content && !!order.value.task)
const orders = ref<OrderDto[]>([])
const selectedOrderId = ref<string>()
const percentage = ref(0)
const showChecking = ref(true)
const showResult = ref(false)
const showFileUploadedResult = ref(false)
const canShowStars = ref(false)
const canShowSkillsModal = ref(false)

const selectedOrder = computed(() => orders.value?.find((data) => data.task === selectedOrderId.value))

const { viewer } = storeToRefs(viewerStore)

const viewerRole = computed(() => {
  if (viewer.value.role === 1) return 'Фрилансер'
  return 'Заказчик'
})

const viewerName = computed(() => {
  if (viewer.value.role === 1) return viewer.value.name
  return viewer.value.companyName
})

const closeModal = () => canShowModal.value = false
const openModal = () => canShowModal.value = true

const onTextChange = () => {
  const element = editor.value.getEditor()
  const html: HTMLElement = element.getElementsByClassName('ql-editor')[0]
  order.value.content = html.innerHTML
}

function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const uploadFile = async () => {
  await timeout(1500)
  showFileUploadedResult.value = true
}

const onNext = async () => {
  canShowModal.value = false
  canShowSkillsModal.value = true
}

const onSave = async () => {
  canShowSkillsModal.value = false
  orders.value?.push(order.value)
  selectedOrderId.value = order.value.task
  closeModal()
  percentage.value = 0
  showResult.value = false
  showFileUploadedResult.value = false
  showChecking.value = true

  await timeout(1000)
  percentage.value = 10
  await timeout(500)
  percentage.value = 30
  await timeout(1500)
  percentage.value = 50
  await timeout(700)
  percentage.value = 70
  await timeout(300)
  percentage.value = 100
  
  showChecking.value = false
  showResult.value = true
  
  await uploadFile()

}

const onOpenModal = () => {
  order.value = {} as OrderDto
  openModal()
}

const onOpenOrdersModal = () => {
  canShowOrdersModal.value = true
}

const selectOrder = (task: string) => {
  selectedOrderId.value = task
  canShowOrdersModal.value = false
}

const showStars = () => {
  canShowStars.value = true
}
</script>

<template>
  <div :class="$style.container">
    <header class="w-full drop-shadow-lg justify-end">
      <div :class="[$style.contentColumn, $style.headerContainer]">
        <div>
          <a-button size="large" type="primary" shape="round" @click="onOpenModal">Создать ещё</a-button>
          <a-button class="ml-5" size="large" shape="round" @click="onOpenOrdersModal">Заказы</a-button>
        </div>
        <div :class="$style.userLogo">
          <div :class="$style.viewerContainer">
            <a-avatar
              round
              size="small"
              src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
            />
            <div :class="$style.viewerInfo">
              <h1 class="mb-0">{{ viewerName }}</h1>
              <div :class="$style.specialist">{{ viewerRole }}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div :class="$style.contentColumn" style="margin-top: 20px;">
      <FSection v-if="showChecking">
        <div class="w-full flex items-center flex-col">
          <h1 class="text-lg ">Проверяем заказ</h1>
          <div class="mt-2">
            <a-progress status="active" type="circle" :percent="percentage" />
          </div>
        </div>
      </FSection>
      <FSection style="margin-bottom: 20px" v-if="showResult">
        <div class="w-full">
          <h1 class="text-lg ">Ваш заказ принял</h1>
          <div class="mt-2">
            <FSection class="w-full">
              <div class="flex">
                <div class="flex align-items">
                  <a-avatar :size="64">
                    <template #icon><UserOutlined /></template>
                  </a-avatar>
                  <div class="ml-3">
                    <h1 class="text-lg mb-0">Хомяков Леонид</h1>
                    <a-tag color="#108ee9">Быстрее всех</a-tag>
                  </div>
                </div>
              </div>
            </FSection>
          </div>
        </div>
      </FSection>
      <FSection v-if="showResult && !showFileUploadedResult">
        <div class="w-full flex items-center flex-col">
          <h1 class="text-lg ">Ожидаем результат от фрилансера</h1>
          <div class="mt-2">
            <font-awesome-icon class="text-8xl mt-5" icon="fa-solid fa-inbox" />
          </div>
        </div>
      </FSection>
      <FSection v-if="showFileUploadedResult">
        <div class="w-full flex items-center flex-col">
          <div class="w-full flex items-center flex-col"  v-if="!canShowStars">
            <h1 class="text-lg">Пользователь добавил результат</h1>
            <div class="mt-2">
              <a href="">
                <font-awesome-icon class="text-8xl mt-5" icon="fa-solid fa-cloud-arrow-down" />
              </a>
            </div>
            <div>
              <a-button size="large" shape="round" class="mt-5">Есть правки?</a-button>
              <span class="mx-5 mb-0 font-bold">или</span>
              <a-button size="large" type="primary" shape="round" class="mt-5" @click="showStars">Всё устраивает?</a-button>
            </div>
          </div>
          <div class="w-full flex items-center flex-col" v-else>
            <h1 class="text-lg">Оцените результат</h1>
            <div class="flex mt-2">
              <router-link :to="{ name: 'home' }">
                <div 
                  class="rounded-full border-2 flex items-center justify-center text-lg font-bold mx-2 cursor-pointer hover:bg-gray-500 hover:text-white" 
                  style="width: 40px; height: 40px;"
                >
                  1
                </div>
              </router-link>
              <router-link :to="{ name: 'home' }">
                <div 
                  class="rounded-full border-2 flex items-center justify-center text-lg font-bold mx-2 cursor-pointer hover:bg-gray-500 hover:text-white" 
                  style="width: 40px; height: 40px;"
                >
                  2
                </div>
              </router-link>
              <router-link :to="{ name: 'home' }">
                <div 
                  class="rounded-full border-2 flex items-center justify-center text-lg font-bold mx-2 cursor-pointer hover:bg-gray-500 hover:text-white" 
                  style="width: 40px; height: 40px;"
                >
                  3
                </div>
              </router-link>
              <router-link :to="{ name: 'home' }">
                <div 
                  class="rounded-full border-2 flex items-center justify-center text-lg font-bold mx-2 cursor-pointer hover:bg-gray-500 hover:text-white" 
                  style="width: 40px; height: 40px;"
                >
                  4
                </div>
              </router-link>
              <router-link :to="{ name: 'home' }">
                <div 
                  class="rounded-full border-2 flex items-center justify-center text-lg font-bold mx-2 cursor-pointer hover:bg-gray-500 hover:text-white" 
                  style="width: 40px; height: 40px;"
                >
                  5
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </FSection>
    </div>
  </div>
  <a-modal :width="1000" :footer="null" :closable="false" v-model:visible="canShowModal">
    <div class="flex justify-between">
      <h1 class="text-2xl">Создание заказа</h1>
      <a-button 
        type="primary" 
        shape="round" 
        size="large" 
        :disabled="!canSave"
        @click="onNext"
      >Далее</a-button>
    </div>
    <div class="mt-4">
      <a-form :label-width="80" :model="order">
        <a-form-item name="task">
          <span>{{ $t('order.title') }}</span>
          <a-input v-model:value="order.task" placeholder="Сделать лендинг" />
        </a-form-item>
        <a-form-item name="specializationId">
          <span>{{ $t('order.specialization') }}</span>
          <a-select v-model:value="order.specializationId" :options="specializations"></a-select>
        </a-form-item>
        <a-form-item name="price">
          <span>Оплата</span>
          <a-input type="number" v-model:value="order.price" prefix="₸" suffix="KZT" />
        </a-form-item>
        <a-form-item name="content">
          <span>{{ $t('order.task') }}</span>
          <QuillEditor ref="editor" theme="snow" style="height: 400px" @update:content="onTextChange" />
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
  <a-modal :footer="null" v-model:visible="canShowOrdersModal">
    <div class="flex justify-between">
      <h1 class="text-2xl">Ваши заказы</h1>
    </div>
    <div class="mt-4">
      <a-list size="small" :data-source="orders">
        <template #renderItem="{ item }">
          <a-list-item>
            <h1 class="text-blue-500 cursor-pointer" @click="selectOrder(item.task)">{{ item.task }}</h1>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </a-modal>
  <a-modal :footer="null" v-model:visible="canShowSkillsModal">
    <div class="flex justify-between">
      <h1 class="text-2xl">Что вам важнее в заказе?</h1>
    </div>
    <div class="mt-4">
      <div class="w-full flex items-center flex-col">
        <div>
          <a-button size="large" shape="round" class="mt-5">Быстрота</a-button>
          <span class="mx-5 mb-0 font-bold">или</span>
          <a-button size="large" type="primary" shape="round" class="mt-5" @click="onSave">Качество</a-button>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<style lang="scss" module>
@import './style.scss';
</style>