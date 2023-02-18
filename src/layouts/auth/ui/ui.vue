<template>
	<div :class="$style.container">
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
</template>

<style module lang="scss">
@import './style.scss'
</style>