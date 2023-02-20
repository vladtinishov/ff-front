<script lang="ts" setup>
interface Props {
  width?: number
}

const props = withDefaults(defineProps<Props>(), {
  width: 400
})

const style = {
  width: props.width + 'px'
}
</script>

<template>
  <div :class="$style.container" :style="style">
    <div :class="$style.metaSmall">
      <slot name="meta-small"></slot>
    </div>

    <div :class="$style.metaLarge">
      <slot name="meta-large"></slot>
    </div>


    <div :class="$style.mainText">
      <slot name="main-text"></slot>
    </div>
  </div>
</template>

<style module lang="scss">
.container {
  border-radius: 10px;
  background: white;
  padding: 20px;
  border: 1px solid #dbdbdb;
  transition: .2s all;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 10px 20px rgb(0 0 0 / 12%);
  }

  .mainText {
    text-align: center;
    margin-top: 10px;
  }

  .metaSmall {
    display: flex;
    align-items: center;

    div:last-of-type {
      margin-left: 10px;
      p {
        margin-bottom: -6px !important;
        font-size: 14px;
        font-weight: bold;
      }

      span {
        color: #5c5c5c;
      }
    }
  }

  .metaLarge {
    display: flex;
    flex-direction: column;
    justify-content: center;

    width: 100%;

    div:first-of-type {
      display: flex;
      justify-content: center;

      p {
        margin-bottom: -6px !important;
        font-size: 14px;
        font-weight: bold;
      }

      span {
        color: #5c5c5c;
      }
    }

    div:last-of-type {
      display: flex;
      flex-direction: column;
      align-items: center;

      margin-top: 10px;

      p {
        margin-bottom: -6px !important;
        font-size: 14px;
        font-weight: bold;
      }

      span {
        color: #5c5c5c;
      }
    }
  }
}
</style>