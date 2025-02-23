import { createI18n } from 'vue-i18n'
import { messages } from '@/i18n/locales'

const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'es',
  messages,
})

export default i18n
