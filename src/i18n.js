import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import ar from './locales/ar.json'

const savedLocale = localStorage.getItem('mujassam-locale') || 'en'

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: { en, ar },
})

export default i18n

export const RTL_LOCALES = ['ar']

export function applyLocaleToDocument(locale) {
  const isRtl = RTL_LOCALES.includes(locale)
  document.documentElement.lang = locale
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr'
  localStorage.setItem('mujassam-locale', locale)
}
