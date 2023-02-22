<script lang="ts" setup>
import { useAppStore } from '@/stores'
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue'
import type { ApplicationDto } from '@/shared/api/applications'
import { FSection } from '@/shared/ui/base'
import { useApplicationsStore } from '@/stores';
import { useRoute } from 'vue-router';
import { copyObject } from '@/shared/utils'
import router from '@/router';
interface Props {
  isCreate?: boolean
}

const props = withDefaults(defineProps<Props>(), { isCreate: false })

const route = useRoute()
const appStore = useAppStore()
const applicationStore = useApplicationsStore()

if (!props.isCreate) {
  applicationStore.getOne(+route.params.id)
} else applicationStore.initForCreation()

const { application, isDeleteLoading } = storeToRefs(applicationStore)

const { langs, specializations } = storeToRefs(appStore)

const skill = ref<string>()
const canShowModal = ref<boolean>()
const taskId = ref<number | boolean>()
const task = ref<{ authorName: string, task: string }>()

const addSkill = () => {
  application.value.skills.push(skill.value!)
  skill.value = ''
}

const deleteSkill = (skillToDelete: string) => {
  application.value.skills = application.value.skills.filter(skill => skill === skillToDelete)
}

const openExistsCase = (index: number) => {
  taskId.value = index
  task.value = copyObject(application.value.expiriences[index])
  canShowModal.value = true
}

const openNewCase = () => {
  taskId.value = false
  task.value = {
    authorName: '',
    task: '',
  }
  canShowModal.value = true
}

const handleOk = () => {
  const index = taskId.value
  if (!index) {
    application.value.expiriences.push(task.value!)
  }
  application.value.expiriences[index as number] = task.value!
  canShowModal.value = false
}

const deleteCase = (index: number) => {
  application.value.expiriences.splice(index, 1)
}

const onSubmit = async () => {
  if (props.isCreate) {
    await applicationStore.create()
  } else {
    await applicationStore.save()
  }

  router.push({ name: 'me' })
}

const onDelete = async () => {
  await applicationStore.delete()
  router.push({ name: 'me' })
}
</script>

<template>
  <div :class="$style.container"  class="mt-5">
    <div :class="$style.sections">
      <FSection>
        <div :class="$style.sectionInner">
          <h1 class="text-2xl">О себе</h1>
          <a-form :label-width="80" :model="application">
            <div class="flex mt-5">
              <a-form-item name="name" :rules="[{ required: true, message: $t('errors.emptyField') }]">
                <span>{{ $t('application.name') }}</span>
                <a-input v-model:value="application.name" placeholder="Ivan" />
              </a-form-item>
              <div class="mx-1"></div>
              <a-form-item name="surname" class="ml-4" :rules="[{ required: true, message: $t('errors.emptyField') }]">
                <span>{{ $t('application.surname') }}</span>
                <a-input v-model:value="application.surname" placeholder="Ivanov" />
              </a-form-item>
            </div>
            <a-form-item name="phone" :rules="[{ required: true, message: $t('errors.emptyField') }]">
              <span>{{ $t('application.phone') }}</span>
              <a-input v-model:value="application.phone" placeholder="ivan.ivanych" />
            </a-form-item>
            <a-form-item name="email" :rules="[{ required: true, message: $t('errors.emptyField') }]">
              <span>{{ $t('application.email') }}</span>
              <a-input v-model:value="application.email" :placeholder="$t('viewer.passwordPlaceholder')" />
            </a-form-item>
            <a-form-item name="langs" :rules="[{ required: true, message: $t('errors.emptyField') }]">
              <span>{{ $t('application.langs') }}</span>
              <a-select v-model:value="application.langs" mode="multiple" style="width: 100%"
                :placeholder="$t('application.langs')" :max-tag-count="20" :options="langs">
                <template #maxTagPlaceholder="omittedValues">
                  <span style="color: red">+ {{ omittedValues.length }} ...</span>
                </template>
              </a-select>
            </a-form-item>
            <a-form-item name="skills" :rules="[{ required: true, message: $t('errors.emptyField') }]">
              <span>{{ $t('application.skills') }}</span>
              <a-input-search v-model:value="skill" :placeholder="$t('application.skills')" enter-button="Добавить"
                @search="addSkill" />
            </a-form-item>
            <div>
              <a-tag closable @close="deleteSkill(skill)" v-for="skill in application.skills" color="blue">
                <span>{{ skill }}</span>
              </a-tag>
            </div>
          </a-form>
        </div>
      </FSection>

      <FSection class="mt-5">
        <div :class="$style.sectionInner">
          <h1 class="text-2xl">Опыт работы</h1>
          <a-form :label-width="80" :model="application">
            <a-form-item name="langs" :rules="[{ required: true, message: $t('errors.emptyField') }]">
              <span>{{ $t('application.langs') }}</span>
              <a-select v-model:value="application.specializationid" :placeholder="$t('application.langs')"
                :options="specializations">
              </a-select>
            </a-form-item>
            <a-form-item name="langs" :rules="[{ required: true, message: $t('errors.emptyField') }]">
              <span>{{ $t('application.langs') }}</span>
              <a-switch style="margin-left: 10px;" v-model:checked="application.hasExpirience" />
            </a-form-item>
            <div>
              <div class="mt-5" v-if="application?.hasExpirience">
                <h1 class="text-lg">Интересные задачи</h1>
                <div>
                  <div v-for="(expirience, index) of application?.expiriences">
                    <div class="task py-2 pt-4 first:pt-0 flex justify-between items-center">
                      <div>
                        <p class="text-gray-400 mb-0">задача от {{ expirience.authorName }}</p>
                        <p>{{ expirience.task }}</p>
                      </div>
                      <div class="flex ml-1">
                        <a-button shape="circle" type="danger" @click="deleteCase(index)">
                          <template #icon><font-awesome-icon icon="fa-solid fa-trash" /></template>
                        </a-button>
                        <a-button shape="circle" @click="openExistsCase(index)" class="ml-2">
                          <template #icon><font-awesome-icon icon="fa-solid fa-pen" /></template>
                        </a-button>
                      </div>
                    </div>
                  </div>
                </div>
                <a-button type="dashed" size="large" @click="openNewCase">
                  <template #icon>
                    <font-awesome-icon icon="fa-solid fa-plus" class="mr-2 text-gray-500" />
                  </template>
                  Добавить
                </a-button>
              </div>
            </div>
          </a-form>
        </div>
      </FSection>

      <FSection class="my-5"  v-if="application?.education">
        <div  :class="$style.sectionInner">
          <h1 class="text-2xl">Образование</h1>
          <a-form :label-width="80" :model="application">
            <a-form-item name="name" :rules="[{ required: true, message: $t('errors.emptyField') }]">
              <span>{{ $t('application.name') }}</span>
              <a-input v-model:value="application.education.name" placeholder="OOO Keremet" />
            </a-form-item>
            <a-form-item name="education.grade" :rules="[{ required: true, message: $t('errors.emptyField') }]">
              <span>{{ $t('application.name') }}</span>
              <a-input v-model:value="application.education.grade" placeholder="OOO Keremet" />
            </a-form-item>
            <a-form-item name="education.specialization" :rules="[{ required: true, message: $t('errors.emptyField') }]">
              <span>{{ $t('application.name') }}</span>
              <a-input v-model:value="application.education.specialization" placeholder="OOO Keremet" />
            </a-form-item>
          </a-form>
        </div>
      </FSection>
    </div>

    <FSection :class="$style.orderButton">
      <p class="text-gray-500 leading-5" v-if="!isCreate">
        Вы не сможете восстановить резюме после удаления!
      </p>
      <p class="text-gray-500 leading-5" v-else>
        Проверьте введённые данные перед сохранением
      </p>
      <div class="flex items-center">
        <a-button type="primary" block size="large" shape="round" @click="onSubmit">Сохранить</a-button>
        <h1 class="text-gray-500 mx-4 text-lg" v-if="!isCreate">или</h1>
        <a-button shape="circle" type="danger" @click="onDelete" v-if="!isCreate">
          <template #icon><font-awesome-icon icon="fa-solid fa-trash" /></template>
        </a-button>
      </div>
    </FSection>
  </div>
  <div class="p-5"></div>

  <a-modal v-model:visible="canShowModal" :title="taskId ? 'Редактирование кейса' : 'Добавление кейса'" @ok="handleOk">
    <a-form :label-width="80" :model="task">
      <a-form-item name="authorName" :rules="[{ required: true, message: $t('errors.emptyField') }]">
        <span>{{ $t('application.name') }}</span>
        <a-input v-model:value="task!.authorName" placeholder="OOO Keremet" />
      </a-form-item>
      <a-form-item name="task" :rules="[{ required: true, message: $t('errors.emptyField') }]">
        <span>{{ $t('application.langs') }}</span>
        <a-textarea v-model:value="task!.task" placeholder="Очень интересный случай"
          :auto-size="{ minRows: 2, maxRows: 5 }" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style module lang="scss">
@import './style.scss';
</style>