<script lang="ts" setup>
import { useAppStore, useViewerStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { ViewerLogo } from '@/components/viewer-logo'
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue'

const viewerStore = useViewerStore()
const router = useRouter()

const isFreelancer = computed(() => viewerStore.viewer.role === 1)

const onAgree = async () => {
  viewerStore.setNewMode()
  viewerStore.getViewer()
  router.push({ name: 'home' })
}
</script>

<template>
  <div>
    <div>
      <h1 class="text-2xl">
        Новый режим! 
        <font-awesome-icon icon="fa-solid fa-star" class="text-2xl text-yellow-500 ml-2" />
      </h1>
      <h1 class="text-lg mt-5">
        Агрегатор заказов
      </h1>
      <div v-if="isFreelancer">
        <p>
          В данном режиме наша система сможет сама подобрать вам проверенный заказ под ваши достижения!
        </p>
        <h1 class="text-lg mt-4">Что нового?</h1>
        <p>При переходе на режим Агрегатор заказов у вас появятся LP (<b>очки лояльности</b>), которые будут доступны только в этом режиме</p>
        <p>Именно по <b>LP</b> система будет выбирать вас для выполнения заказа. Чем выше <b>LP</b>, тем выше стоимость заказа будет вам предложена.</p>
        <p><b>LP</b> начисляются за каждый выполненный заказ в зависимости от того, как хорошо вы его выполнили.</p>
        <p>Система автоматически будет выбирать в качестве исполнителя заказа, но вы можете отказаться от него. В таком случае у вас спишется <b> 15 LP</b>.</p>
      </div>
      <div v-else>
        <p>
          В данном режиме наша система сможет сама подобрать вам фрилансера под ваши предпочтения!
        </p>
        <h1 class="text-lg mt-4">Что нового?</h1>
        <p>При переходе на режим Агрегатор заказов вы сможете с лёгкостью создавать быстрые заказы и получать результат в самый короткий срок</p>
        <p>Фрилансеры будут определяться системой в зависимости от указанной вами суммы заказа, чем выше сумма, тем опытнее фрилансер вам попадётся.</p>
        <p>После получения результата, не забывайте справедливо оценивать труд фрилансера.</p>
      </div>
    </div>
    <div class="mt-5">
      <a-button type="primary" shape="round" size="large" block @click="onAgree">Переключиться</a-button>
    </div>
  </div>
</template>
