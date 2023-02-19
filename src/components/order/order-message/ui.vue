<template>
  <div :class="$style.card">
    <div class="flex items-center">
      <a-avatar src="https://joeschmoe.io/api/v1/random" />
      <h1>ООО Заказчик</h1>
    </div>
  </div>
</template>

<style module lang="scss">
.card {
  width: 400px;
  background: white;
  border-radius: 20px;
  padding: 20px;
  cursor: pointer;
  z-index: 999;
  &:hover {
    box-shadow: 0px 0px 15px rgb(0 0 0 / 50%), 0px 10px 15px rgb(0 0 0 / 12%);
  }
}
</style>