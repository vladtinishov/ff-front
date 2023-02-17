<script lang="ts" setup>
import { ref, computed } from 'vue'
import 'vue-advanced-cropper/dist/style.css';
import { CircleStencil, Cropper } from 'vue-advanced-cropper';

const cropper = ref<typeof Cropper>()

const showModal = ref(false)
const files = ref<HTMLInputElement>()

const openPreview = () => {
  showModal.value = true
}

const coordinates = ref({
  width: 0,
  height: 0,
  left: 0,
  top: 0,
})
const avatar = ref<File>()
const avatarSrc = ref<string>('')
const previewAvatarSrc = ref<string>('')

const showPreview = computed(() => !!previewAvatarSrc.value)

const onFileSelect = async () => {
  const images = (files.value as HTMLInputElement).files

  if (!images?.length) return

  avatar.value = images[0]
  avatarSrc.value = URL.createObjectURL(avatar.value!)
  showModal.value = true
}

const onConfirm = () => {
  const { coordinates: coord, canvas, } = cropper?.value?.getResult();
  coordinates.value = coord;
  
  previewAvatarSrc.value = canvas.toDataURL();
  showModal.value = false
}
</script>

<template>
  <div>
    <div>
      <label :class="$style.inputLabel">
        <div>
          <img :src="previewAvatarSrc" alt="" v-if="showPreview">
          <font-awesome-icon :icon="['fa', 'user']" class="text-white text-5xl" v-else />
        </div>
        <input ref="files" @change="onFileSelect()" accept="image/*" class="hidden" type="file"/>
      </label>
    </div>
    <n-modal v-model:show="showModal">
      <n-card
        style="width: 600px"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <Cropper
          ref="cropper"
          style="z-index: 999"
          :stencil-component="CircleStencil"
          :src="avatarSrc"
          :coordinates="coordinates"
        />
        <n-button class="mt-4" @click="onConfirm">{{  $t('avatarLoader.confirm') }}</n-button>
      </n-card>
    </n-modal>
  </div>
</template>

<style module lang="scss">
.inputLabel {
  width: 100px;
  height: 100px;
  border-radius: 3px;
  background: gray;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 3px;
  }
}
</style>