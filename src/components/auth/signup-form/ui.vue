<script lang="ts" setup>
import { ref } from 'vue'
import type { FormInst, UploadFileInfo } from 'naive-ui'
import { useViewerStore } from '@/stores/viewer.store';
import { storeToRefs } from 'pinia';
import { ImageLoader } from '@/components/image-loader'
import { useI18n } from 'vue-i18n';

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
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" :size="size">
    <div class="ml-4">
      <div>
        <span>{{ $t("viewer.avatar") }}</span>
        <ImageLoader class="mt-2" />
      </div>
      <div class="flex mt-6">
        <n-form-item :label="$t('viewer.name')" path="name">
          <n-input v-model:value="formValue.name" placeholder="Ivan" />
        </n-form-item>
        <n-form-item class="ml-4" :label="$t('viewer.surname')" path="surname">
          <n-input v-model:value="formValue.surname" placeholder="Ivanov" />
        </n-form-item>
      </div>
      <n-form-item :label="$t('viewer.login')" path="login">
        <n-input v-model:value="formValue.login" placeholder="ivan.ivanych" />
      </n-form-item>
      <n-form-item :label="$t('viewer.password')" path="password">
        <n-input v-model:value="formValue.password" placeholder="" />
      </n-form-item>
      <n-form-item :label="$t('viewer.lang')" path="lang">
        <n-input v-model:value="formValue.lang" placeholder="Phone Number" />
      </n-form-item>
      <n-form-item :label="$t('viewer.aboutCompany')" path="aboutCompany">
        <n-input
          v-model:value="formValue.aboutCompany"
          type="textarea"
          :placeholder="$t('viewer.aboutCompany')"
        />
      </n-form-item>
      <n-form-item>
        <n-button type="primary">{{ $t('shared.save') }}</n-button>
      </n-form-item>
    </div>
  </n-form>
</template>
