<template>
	<header class="bg-indigo-900">
		<nav>
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
	</header>
	<div class="mx-auto max-w-7xl px-4 sm:px-6">
		<slot></slot>
	</div>
</template>

<script lang="ts" setup>
import { ViewerLogo } from '@/components/viewer-logo'
</script>