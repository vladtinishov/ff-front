<script lang="ts" setup>
import { computed } from 'vue'
import { useViewerStore } from '@/stores/viewer.store'
import { storeToRefs } from 'pinia'

const viewerStore = useViewerStore()
const { viewer } = storeToRefs(viewerStore)

const viewerName = computed(() => {
	if (viewer.value.role === 1) return viewer.value.name
	return viewer.value.companyName
})

const roleName = computed(() => {
	if (viewer.value.role === 1) return 'Фрилансер'
	return 'Заказчик'
})

</script>

<template>
	<a-dropdown>
    <div :class="$style.viewerContainer">
			<div :class="$style.viewerInfo">
				{{ viewerName }}
				<div :class="$style.specialist" class="text-gray-300">{{ roleName }}</div>
			</div>
			<a-avatar
				round
				size="small"
				src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
			/>
		</div>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <router-link :to="{ name: 'me' }">Мой профиль</router-link>
        </a-menu-item>
        <a-menu-item>
          <router-link :to="{ name: 'user-settings' }">Настройки</router-link>
        </a-menu-item>
        <a-menu-item>
          <router-link :to="{ name: 'clicked-orders' }">Мои заказы</router-link>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
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

