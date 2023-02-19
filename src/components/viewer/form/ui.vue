<script lang="ts" setup>
import { ref } from 'vue'
import { useViewerStore } from '@/stores/viewer.store'
import { storeToRefs } from 'pinia'
import { ImageLoader } from '@/components/image-loader'
import { useAppStore } from '@/stores/app.store'
import { useRouter } from 'vue-router'

interface ViewerData {
	name: string,
	surname: string,
	login: string,
	password: string,
	lang: string,
	about: string
	role: number
}
const viewerStore = useViewerStore()
const appStore = useAppStore()
const router = useRouter()

const formValue = ref<ViewerData>({
	name: '',
	surname: '',
	login: '',
	password: '',
	lang: 'ru',
	about: '',
	role: 1
})

const { langs } = storeToRefs(appStore)


// methods
const onSubmit = async (data: ViewerData) => {
	console.log('asdfasdf')
	await viewerStore.signupUser(data)
	router.push({ name: 'home' })

}
</script>

<template>
	<a-form :label-width="80" :model="formValue" @finish="onSubmit">
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
		<a-form-item name="about" :rules="[{ required: true, message: $t('errors.emptyField') }]">
			<span>{{ $t('viewer.aboutCompany') }}</span>
			<a-textarea v-model:value="formValue.about" :placeholder="$t('viewer.aboutCompany')" :auto-size="{ minRows: 4, maxRows: 4 }" />
		</a-form-item>
		<a-form-item>
			<a-button type="primary" html-type="submit">{{ $t('shared.save') }}</a-button>
		</a-form-item>
	</a-form>
</template>
