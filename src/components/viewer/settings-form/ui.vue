<script lang="ts" setup>
import { ref } from 'vue'
import { useViewerStore } from '@/stores/viewer.store'
import { storeToRefs } from 'pinia'
import { ImageLoader } from '@/components/image-loader'
import { useAppStore } from '@/stores/app.store'
import { useRouter } from 'vue-router'
import type { UserDto } from '@/shared/api'
import { FSection } from '@/shared/ui/base'
import { copyObject } from '@/shared/utils'

interface Props {
  role: 1 | 2
}

const props = withDefaults(defineProps<Props>(), { role: 1 })

const viewerStore = useViewerStore()
const appStore = useAppStore()
const router = useRouter()

const { viewer } = storeToRefs(viewerStore)

const formValue = ref<UserDto>(copyObject(viewer.value))

const { langs } = storeToRefs(appStore)
const { isLoading } = storeToRefs(viewerStore)


// methods
const onSubmit = async () => {
  await viewerStore.edit(formValue.value)
  router.push({ name: 'me' })
}
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.sections">
      <FSection>
        <a-form :class="$style.sectionInner" :label-width="80" :model="formValue" @finish="onSubmit">
          <div class="flex mt-5" v-if="role === 1">
            <a-form-item name="name" :rules="[{ required: true, message: $t('errors.emptyField') }]">
              <span>{{ $t('viewer.name') }}</span>
              <a-input v-model:value="formValue.name" placeholder="Ivan" />
            </a-form-item>
            <div class="mx-1"></div>
            <a-form-item name="surname" class="ml-4" :rules="[{ required: true, message: $t('errors.emptyField') }]">
              <span>{{ $t('viewer.surname') }}</span>
              <a-input v-model:value="formValue.surname" placeholder="Ivanov" />
            </a-form-item>
          </div>
          <div class="flex mt-5" v-else="role === 1">
            <a-form-item name="companyName" style="width: 100%"
              :rules="[{ required: true, message: $t('errors.emptyField') }]">
              <span>{{ $t('viewer.companyName') }}</span>
              <a-input v-model:value="formValue.companyName" placeholder="TOO Company" />
            </a-form-item>
          </div>
          <a-form-item name="login" :rules="[{ required: true, message: $t('errors.emptyField') }]">
            <span>{{ $t('viewer.login') }}</span>
            <a-input v-model:value="formValue.login" placeholder="ivan.ivanych" />
          </a-form-item>
          <a-form-item name="password" :rules="[{ required: true, message: $t('errors.emptyField') }]">
            <span>{{ $t('viewer.password') }}</span>
            <a-input type="password" v-model:value="formValue.password" :placeholder="$t('viewer.passwordPlaceholder')" />
          </a-form-item>
          <a-form-item name="lang" :rules="[{ required: true, message: $t('errors.emptyField') }]">
            <span>{{ $t('viewer.lang') }}</span>
            <a-select v-model:value="formValue.lang" :options="langs"></a-select>
          </a-form-item>
          <a-form-item name="about" :rules="[{ required: true, message: $t('errors.emptyField') }]">
            <span v-if="role === 1">{{ $t('viewer.aboutFreelance') }}</span>
            <span v-else>{{ $t('viewer.aboutCompany') }}</span>
            <a-textarea v-model:value="formValue.about" :placeholder="$t('viewer.aboutCompany')"
              :auto-size="{ minRows: 4, maxRows: 4 }" />
          </a-form-item>
        </a-form>
      </FSection>
    </div>

    <FSection :class="$style.orderButton">
      <p class="text-gray-500 leading-5">
        Проверьте введённые данные перед сохранением
      </p>
      <div class="flex items-center">
        <a-button type="primary" :loading="isLoading" block size="large" shape="round" @click="onSubmit">Сохранить</a-button>
      </div>
    </FSection>
  </div>
</template>

<style module lang="scss">
@import './style.scss'
</style>
