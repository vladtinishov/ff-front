<script lang="ts" setup>
import { ref } from 'vue'
import type { FormInst } from 'naive-ui'
import { useViewerStore } from '@/stores/viewer.store';
import { useI18n } from 'vue-i18n';

const viewerStore = useViewerStore()
const { t } = useI18n()
const formRef = ref<FormInst | null>(null)
const size = ref<'small' | 'medium' | 'large'>('medium')

const formValue = ref({
  login: '',
  password: '',
})

const rules = {
  
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
      <a-form-item>
        <span>{{ $t('viewer.login') }}</span>
        <a-input v-model:value="formValue.login" placeholder="ivan.ivanych" />
      </a-form-item>
      <a-form-item>
        <span>{{  $t('viewer.password')  }}</span>
        <a-input v-model:value="formValue.password" placeholder="" />
      </a-form-item>
      
    </div>
  </a-form>
</template>
