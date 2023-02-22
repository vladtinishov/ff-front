<script lang="ts" setup>
import { useAppStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { ViewerLogo } from '@/components/viewer-logo'

const appStore = useAppStore()

const { pageTitle } = storeToRefs(appStore)
</script>

<template>
	<header>
		<nav class="bg-indigo-900">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-50 flex justify-between py-4">
				<div class="relative z-10 flex items-center gap-16">
					<a aria-label="Home" href="/">
						<img src="@/assets/logo.svg" alt="" />
					</a>
				</div>
				<div class="flex items-center gap-6">
					<font-awesome-icon :icon="['fa', 'message']" class="text-white text-xl" />
					<font-awesome-icon :icon="['fa', 'bell']" class="text-white text-xl" />
					<font-awesome-icon :icon="['fa', 'magnifying-glass']" class="text-white text-xl" />
					<ViewerLogo />
				</div>
			</div>
		</nav>
		<div class="bg-white drop-shadow-md" v-if="!!pageTitle">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-50 flex justify-between py-4 max-w-7x1">
				<h1 class="text-2xl mb-1">
					{{ pageTitle }}
				</h1>
			</div>
		</div>
	</header>
	<div class="mx-auto max-w-7xl px-4 sm:px-6">
		<slot></slot>
	</div>
</template>
