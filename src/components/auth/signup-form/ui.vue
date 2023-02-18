<script lang="ts" setup>
import { ref } from 'vue'
import type { FormInst, UploadFileInfo } from 'naive-ui'
import { useViewerStore } from '@/stores/viewer.store';
import { storeToRefs } from 'pinia';
import { ImageLoader } from '@/components/image-loader'
import { useI18n } from 'vue-i18n';
import { NButton } from 'naive-ui'

const viewerStore = useViewerStore()
const { t } = useI18n()
const formRef = ref<FormInst | null>(null)
const size = ref<'small' | 'medium' | 'large'>('medium')

const formValue = ref({
  name: '',
  surname: '',
  login: '',
  password: '',
  lang: '',
  aboutCompany: '',
})

const rules = {
  name: {
    required: true,
    message: t('errors.emptyField'),
    trigger: ['input', 'blur']
  },
  surname: {
    required: true,
    message: t('errors.emptyField'),
    trigger: ['input', 'blur']
  },
  login: {
    required: true,
    message: t('errors.emptyField'),
    trigger: ['input', 'blur']
  },
  password: {
    required: true,
    message: t('errors.emptyField'),
    trigger: ['input', 'blur']
  },
  lang: {
    required: true,
    message: t('errors.emptyField'),
    trigger: ['input', 'blur']
  },
  aboutCompany: {
    required: true,
    message: t('errors.emptyField'),
    trigger: ['input', 'blur']
  },
}

function handleValidateClick(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log('true')
    } else {
      console.log('false')
    }
  })
}

</script>

<template>
  <a-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" :size="size">
    <div class="ml-4 w-96">
      <div>
        <span>{{ $t("viewer.avatar") }}</span>
        <ImageLoader class="mt-2" />
      </div>
      <div class="flex mt-5">
        <a-form-item>
          <span>{{ $t('viewer.name') }}</span>
          <a-input v-model:value="formValue.name" placeholder="Ivan" />
        </a-form-item>
        <div class="mx-1"></div>
        <a-form-item class="ml-4">
          <span>{{ $t('viewer.surname') }}</span>
          <a-input v-model:value="formValue.surname" placeholder="Ivanov" />
        </a-form-item>
      </div>
      <a-form-item>
        <span>{{ $t('viewer.login') }}</span>
        <a-input v-model:value="formValue.login" placeholder="ivan.ivanych" />
      </a-form-item>
      <a-form-item>
        <span>{{  $t('viewer.password')  }}</span>
        <a-input v-model:value="formValue.password" placeholder="" />
      </a-form-item>
      <a-form-item>
        <span>{{ $t('viewer.lang') }}</span>
        <a-input v-model:value="formValue.lang" placeholder="Phone Number" />
      </a-form-item>
      <a-form-item>
        <span>{{ $t('viewer.aboutCompany') }}</span>
        <a-textarea v-model:value="formValue.aboutCompany" :placeholder="$t('viewer.aboutCompany')" :rows="4" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary">{{ $t('shared.save') }}</a-button>
      </a-form-item>
    </div>
  </a-form>
</template>
