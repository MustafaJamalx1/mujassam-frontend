<script setup>
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from 'vuetify'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import { applyLocaleToDocument } from '@/i18n'

const { locale } = useI18n()
const vuetifyLocale = useLocale()

watch(locale, (newLocale) => {
  applyLocaleToDocument(newLocale)
  vuetifyLocale.current.value = newLocale
}, { immediate: false })
</script>

<template>
  <v-app style="background: var(--color-cream); font-family: var(--font-body);">
    <Header />
    <v-main style="background: var(--color-cream);">
      <RouterView />
    </v-main>
    <Footer />
  </v-app>
</template>

<style>
/* ─── Global overrides that Vuetify needs from the root ─── */
.v-application {
  font-family: var(--font-body) !important;
  background-color: var(--color-cream) !important;
}

/* Vuetify field overrides — match warm style */
.v-field {
  border-radius: var(--radius-lg) !important;
}
.v-field--variant-outlined .v-field__outline__start,
.v-field--variant-outlined .v-field__outline__end,
.v-field--variant-outlined .v-field__outline__notch {
  border-color: var(--color-divider) !important;
}
.v-field--focused .v-field__outline__start,
.v-field--focused .v-field__outline__end,
.v-field--focused .v-field__outline__notch {
  border-color: var(--color-terracotta) !important;
}
.v-label { font-family: var(--font-body) !important; }
.v-btn   { font-family: var(--font-body) !important; text-transform: none !important; letter-spacing: 0 !important; }

/* Range slider warm tint */
.v-slider-thumb { color: var(--color-terracotta) !important; }

/* Checkbox warm tint */
.v-selection-control--dirty .v-icon { color: var(--color-terracotta) !important; }

/* Smooth page transition */
.v-main { transition: none; }
</style>
