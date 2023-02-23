<script lang="ts" setup>
import { useOrdersStore, useViewerStore } from '@/stores'
import { storeToRefs } from 'pinia';
import { ref, onMounted } from 'vue'
import { FSection } from '@/shared/ui/base'
import { useRoute } from 'vue-router';
import router from '@/router';
import { QuillEditor } from '@vueup/vue-quill'

interface Props {
  isCreate?: boolean
}
const route = useRoute()
const props = withDefaults(defineProps<Props>(), { isCreate: false })

const ordersStore = useOrdersStore()
const viewerStore = useViewerStore()

const { order, isDeleteLoading } = storeToRefs(ordersStore)
const editor = ref()


const onSubmit = async () => {
  if (props.isCreate) {
    await ordersStore.create()
  } else {
    await ordersStore.save()
  }

  viewerStore.getViewer()

  router.go(-1) 
}

const onDelete = async () => {
  await ordersStore.delete()
  router.push({ name: 'me' })
}

const onTextChange = () => {
  const element = editor.value.getEditor()
  const html: HTMLElement = element.getElementsByClassName('ql-editor')[0]
  order.value.content = html.innerHTML
}

async function getOrder(id: number) {
  return ordersStore.getOne(+route.params.id)
}
function initForCreate() {
  ordersStore.initForCreation()
  editor.value.setHTML(order.value.content)
}

onMounted(async () => {
  if (!props.isCreate) {
    const orderGot = await getOrder(+route.params.id)
    editor.value.setHTML(orderGot.content)
  } else initForCreate()
})
</script>

<template>
  <div :class="$style.container"  class="mt-5">
    <div :class="$style.sections">
      <FSection>
        <div  :class="$style.sectionInner">
          <a-form :label-width="80" :model="order">
            <a-form-item name="name" :rules="[{ required: true, message: $t('errors.emptyField') }]">
              <span>{{ $t('application.name') }}</span>
              <a-input v-model:value="order.task" placeholder="OOO Keremet" />
            </a-form-item>
            <a-form-item name="education.grade" :rules="[{ required: true, message: $t('errors.emptyField') }]">
              <span>{{ $t('application.name') }}</span>
              <QuillEditor ref="editor" theme="snow" style="height: 500px" @update:content="onTextChange" />
            </a-form-item>
          </a-form>
        </div>
      </FSection>
    </div>

    <FSection :class="$style.orderButton">
      <p class="text-gray-500 leading-5" v-if="!isCreate">
        Вы не сможете восстановить заказ после удаления!
      </p>
      <p class="text-gray-500 leading-5" v-else>
        Проверьте введённые данные перед сохранением
      </p>
      <div class="flex items-center">
        <a-button type="primary" block size="large" shape="round" @click="onSubmit">Сохранить</a-button>
        <h1 class="text-gray-500 mx-4 text-lg" v-if="!isCreate">или</h1>
        <a-button :loading="isDeleteLoading" shape="circle" type="danger" @click="onDelete" v-if="!isCreate">
          <template #icon><font-awesome-icon icon="fa-solid fa-trash" /></template>
        </a-button>
      </div>
    </FSection>
  </div>
  <div class="p-5"></div>
</template>

<style module lang="scss">
@import './style.scss';
</style>