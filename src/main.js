import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import i18n, { applyLocaleToDocument } from './i18n'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

import '@/styles/variables.css'

const savedLocale = localStorage.getItem('mujassam-locale') || 'en'

const vuetify = createVuetify({
  components,
  directives,
  locale: {
    locale: savedLocale,
    rtl: { ar: true },
  },
  defaults: {
    VCard: { elevation: 0, rounded: 'lg' },
    VBtn: { elevation: 0, rounded: 'lg' },
    VTextField: { variant: 'outlined', rounded: 'lg' },
    VSelect: { variant: 'outlined', rounded: 'lg' },
    VTextarea: { variant: 'outlined', rounded: 'lg' },
  },
  theme: {
    defaultTheme: 'warm',
    themes: {
      warm: {
        dark: false,
        colors: {
          primary:            '#B85C38',
          'primary-darken-1': '#8F4227',
          'primary-darken-2': '#6B3120',
          'primary-lighten-1': '#CF7A56',
          'primary-lighten-2': '#E8A98A',

          secondary:            '#3D2314',
          'secondary-darken-1': '#2A160C',
          'secondary-lighten-1': '#6B3A24',
          'secondary-lighten-2': '#9B6347',

          accent:            '#C9933A',
          'accent-lighten-1': '#DFB468',
          'accent-lighten-2': '#F2D49E',

          error:   '#C0392B',
          warning: '#D68910',
          info:    '#1A7A8A',
          success: '#27795B',

          background:        '#FAF7F2',
          surface:           '#FFFFFF',
          'surface-variant': '#F0EAE0',
          'surface-bright':  '#FFFFFF',
          'surface-light':   '#E8DFD3',

          'on-primary':    '#FFFFFF',
          'on-secondary':  '#FAF7F2',
          'on-accent':     '#FFFFFF',
          'on-background': '#1A0F0A',
          'on-surface':    '#1A0F0A',
          'on-error':      '#FFFFFF',
          'on-success':    '#FFFFFF',
          'on-warning':    '#FFFFFF',
          'on-info':       '#FFFFFF',
        },
        variables: {
          'border-color':          '#C8B9A8',
          'border-opacity':        0.5,
          'high-emphasis-opacity': 0.87,
          'medium-emphasis-opacity': 0.6,
          'disabled-opacity':      0.38,
          'hover-opacity':         0.06,
          'focus-opacity':         0.10,
          'selected-opacity':      0.10,
          'activated-opacity':     0.14,
          'pressed-opacity':       0.12,
        },
      },
    },
  },
})

applyLocaleToDocument(savedLocale)

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(vuetify)
app.use(i18n)
app.mount('#app')
