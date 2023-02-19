<script lang="ts" setup>
import { OrderMessage } from '@/components/order'
import { defineProps } from 'vue';

interface Props {
	isLogin: boolean
}
const props = defineProps<Props>()
</script>

<template>
	<div :class="$style.container">
		<div v-if="!props?.isLogin">
			<div :class="$style.signupContainer">
				<div :class="$style.banner"></div>
				<div :class="$style.form">
					<div>
						<div :class="$style.header">
							<a href="">
								<font-awesome-icon :icon="['fa', 'chevron-left']" class="mr-2" />
								Назад
							</a>
							<img src="@/assets/logo.svg" alt="">
							<a href="">Войти</a>
						</div>
						<slot></slot>
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<div :class="$style.loginContainer">
				<OrderMessage />
				<div :class="$style.form">
					<div :class="$style.header">
						<img src="@/assets/logo.svg" alt="">
						<div :class="$style.text">
							<h1>Freelance <br> Finder</h1>
						</div>
					</div>
					<slot></slot>
				</div>
			</div>
		</div>
	</div>
</template>

<style module lang="scss">
@import './style.scss'
</style>