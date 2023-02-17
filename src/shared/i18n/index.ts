import { messages } from './locale'
import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  locale: 'ru',
  legacy: false,
  fallbackLocale: 'ru',
  messages,
})