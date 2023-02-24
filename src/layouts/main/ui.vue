<script lang="ts" setup>
import { useAppStore, useViewerStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { ViewerLogo } from '@/components/viewer-logo'
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue'
import { NewModeModal } from '@/components/newmode'

const appStore = useAppStore()
const viewerStore = useViewerStore()
const { pageTitle } = storeToRefs(appStore)

const router = useRouter()

const onBackClick = () => router.go(-1)

const canShowNewModeModal = ref(false) 
const canShowNewModeButton = computed(() => !viewerStore.viewer.isNewMode)

const openModal = () => {
	canShowNewModeModal.value = true
}
</script>

<template>
	<header>
		<nav class="bg-indigo-900">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-50 flex justify-between py-4">
				<div class="relative z-10 flex items-center gap-16">
					<router-link aria-label="Home" :to="{ name: 'home' }">
						<img src="@/assets/logo.svg" alt="" />
					</router-link>
				</div>
				<div class="flex items-center gap-6">
					<font-awesome-icon 
						icon="fa-solid fa-hand-sparkles" 
						@click="openModal" 
						class="text-white text-2xl text-yellow-500 cursor-pointer" 
						v-if="canShowNewModeButton"
					/>
					<ViewerLogo />
				</div>
			</div>
		</nav>
		<div class="bg-white drop-shadow-md" v-if="!!pageTitle">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-50 flex justify-between py-4 max-w-7x1">
				<h1 class="text-2xl mb-1">
					<font-awesome-icon icon="fa-solid fa-chevron-left" class="mr-2 cursor-pointer text-blue-500" @click="onBackClick" />
					{{ pageTitle }}
				</h1>
			</div>
		</div>
	</header>
	<div class="mx-auto max-w-7xl px-4 sm:px-6">
		<slot></slot>
	</div>
	<a-modal :footer="null" v-model:visible="canShowNewModeModal">
		<NewModeModal />
	</a-modal>
</template>
