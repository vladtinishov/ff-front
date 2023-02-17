<script lang="ts" setup>
import { h } from 'vue'
import { NIcon } from 'naive-ui'
import type { Component } from 'vue'
import {
  PersonCircleOutline as UserIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon
} from '@vicons/ionicons5'
import { useViewerStore } from '@/stores/viewer.store'
import { storeToRefs } from 'pinia'

const viewerStore = useViewerStore()
const { local } = storeToRefs(viewerStore)

const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}

const options = [
	{
		label: local.value.viewer.preferences,
		key: 'profile',
		icon: renderIcon(UserIcon)
	},
	{
		label: local.value.viewer.applications,
		key: 'editProfile',
		icon: renderIcon(EditIcon)
	},
	{
		label: local.value.viewer.exit,
		key: 'logout',
		icon: renderIcon(LogoutIcon)
	}
]

</script>

<template>
	<n-dropdown :options="options" trigger="click">
    <div :class="$style.viewerContainer">
		<div :class="$style.viewerInfo">
			<n-ellipsis :class="$style.name">
				Константин
			</n-ellipsis>
			<div :class="$style.specialist" class="text-gray-300">Фрилансер</div>
		</div>
		<n-avatar
			round
			size="small"
			src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
		/>
		</div>
  </n-dropdown>
</template>

<style lang="scss" module>
.viewerContainer {
	cursor: pointer;
	padding: 8px 20px;
	background: rgb(0, 0, 0, .3);
	border-radius: 30px;
	color: white;
	display: flex;
	align-items: center;

	.viewerInfo {
		margin-right: 15px;
		.name {
			max-width: 80px;
		}

		.specialist {
			margin-top: -4px;
		}	
	}
}
</style>

