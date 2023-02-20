<script lang="ts" setup>
import { ref } from 'vue'
import { useViewerStore } from '@/stores/viewer.store'
import { useRouter } from 'vue-router'

interface LoginData {
	login: string,
	password: string,
}
const viewerStore = useViewerStore()
const router = useRouter()

const formValue = ref<LoginData>({
	login: '',
	password: '',
})



// methods
const onSubmit = async (data: LoginData) => {
	const isValid = await viewerStore.loginUser(data)
	if (isValid) router.push({ name: 'home' })
}
</script>

<template>
	<a-form :label-width="80" :model="formValue" @finish="onSubmit">
		<a-form-item name="login" :rules="[{ required: true, message: $t('errors.emptyField') }]">
			<span>{{ $t('viewer.login') }}</span>
			<a-input v-model:value="formValue.login" placeholder="ivan.ivanych" />
		</a-form-item>
		<a-form-item name="password" :rules="[{ required: true, message: $t('errors.emptyField') }]">
			<span>{{ $t('viewer.password') }}</span>
			<a-input v-model:value="formValue.password" :placeholder="$t('viewer.passwordPlaceholder')" />
		</a-form-item>

		<a-form-item>
			<a-button type="primary" html-type="submit">{{ $t('shared.save') }}</a-button>
		</a-form-item>
	</a-form>
</template>
