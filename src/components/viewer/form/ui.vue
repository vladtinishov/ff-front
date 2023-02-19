<script lang="ts" setup>
import { ref } from 'vue'
import type { FormInst, UploadFileInfo } from 'naive-ui'
import { useViewerStore } from '@/stores/viewer.store';
import { storeToRefs } from 'pinia';
import { ImageLoader } from '@/components/image-loader'
import { useI18n } from 'vue-i18n';
import { NButton } from 'naive-ui'
import { useAppStore } from '@/stores/app.store';

const viewerStore = useViewerStore()
const appStore = useAppStore()

const formValue = ref({
	name: '',
	surname: '',
	login: '',
	password: '',
	lang: 'ru',
	aboutCompany: '',
})

const { langs } = storeToRefs(appStore)

</script>

<template>
	<a-form :label-width="80" :model="formValue">
		<div>
			<span>{{ $t("viewer.avatar") }}</span>
			<ImageLoader class="mt-2" />
		</div>
		<div class="flex mt-5">
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
		<a-form-item name="login" :rules="[{ required: true, message: $t('errors.emptyField') }]">
			<span>{{ $t('viewer.login') }}</span>
			<a-input v-model:value="formValue.login" placeholder="ivan.ivanych" />
		</a-form-item>
		<a-form-item name="password" :rules="[{ required: true, message: $t('errors.emptyField') }]">
			<span>{{ $t('viewer.password') }}</span>
			<a-input v-model:value="formValue.password" :placeholder="$t('viewer.passwordPlaceholder')" />
		</a-form-item>
		<a-form-item name="lang" :rules="[{ required: true, message: $t('errors.emptyField') }]">
			<span>{{ $t('viewer.lang') }}</span>
			<a-select v-model:value="formValue.lang" :options="langs"></a-select>
		</a-form-item>
		<a-form-item name="aboutCompany" :rules="[{ required: true, message: $t('errors.emptyField') }]">
			<span>{{ $t('viewer.aboutCompany') }}</span>
			<a-textarea v-model:value="formValue.aboutCompany" :placeholder="$t('viewer.aboutCompany')" :rows="4" />
		</a-form-item>
		<a-form-item>
			<a-button type="primary" html-type="submit">{{ $t('shared.save') }}</a-button>
		</a-form-item>
	</a-form>
</template>
