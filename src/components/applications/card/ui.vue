<script lang="ts" setup>
import { useAppStore } from '@/stores'
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue'
import type { ApplicationDto } from '@/shared/api/applications'
import { FSection } from '@/shared/ui/base'

interface Props {
  application: ApplicationDto
}

defineProps<Props>()

const appStore = useAppStore()

const getLanguageLabel = (lang: string) => {
  return appStore.langs.find(({ value }) => lang == value)?.label
}

</script>

<template>
  <h1 class="text-xl">{{ application?.name }} {{  application?.surname }}</h1>
  <p class="leading-2 ">{{ application?.phone }} <br> {{ application?.email }}</p>

  <div>
    <h1 class="text-lg">Навыки</h1>
    <div>
      <a-tag color="#108ee9" v-for="skill in application?.skills">{{ skill }}</a-tag>
    </div>
  </div>
  <div class="mt-5">
    <h1 class="text-lg">Знания языков</h1>
    <div>
      <a-tag color="#87d068" v-for="lang in application?.langs">{{ getLanguageLabel(lang) }}</a-tag>
    </div>
  </div>
  <div class="mt-5">
    <h1 class="text-lg">Опыт работы</h1>
    <div class="flex">
      Есть опыт: 
      <h1 class="ml-2">
        {{ application?.hasExpirience ? 'Да' : 'Нет' }}
      </h1>
    </div>
  </div>
  <div class="mt-5" v-if="application?.hasExpirience">
    <h1 class="text-lg">Интересные задачи</h1>
    <div>
      <div v-for="expirience in application?.expiriences">
        <div class="task py-2 pt-4 first:pt-0">
          <p class="text-gray-400 mb-0">задача от {{ expirience.authorName }}</p>
          <p >{{ expirience.task}}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="mt-5">
    <h1 class="text-lg">Образование</h1>
    <div>
      <div>
        <div class="flex">
          <label>Заведение:</label>
          <h1 class="ml-2">
            {{ application.education.name}}
          </h1>
        </div>
        <div class="flex">
          <label>Степень:</label>
          <h1 class="ml-2">
            {{ application.education.grade}}
          </h1>
        </div>
        <div class="flex">
          <label>Специальность:</label>
          <h1 class="ml-2">
            {{ application.education.specialization}}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
@import './style.scss';
</style>