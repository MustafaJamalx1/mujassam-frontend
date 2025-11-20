import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
  defaults: {
    VCard: {
      elevation: 0,
    },
    VBtn: {
      elevation: 0,
    },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          // Primary palette - Modern Cyan Blue (Technology & Innovation)
          primary: '#0ea5e9',
          'primary-darken-1': '#0284c7',
          'primary-darken-2': '#0369a1',
          'primary-lighten-1': '#38bdf8',
          'primary-lighten-2': '#7dd3fc',

          // Secondary palette - Vivid Purple (Creativity & Modern)
          secondary: '#8b5cf6',
          'secondary-darken-1': '#7c3aed',
          'secondary-lighten-1': '#a78bfa',
          'secondary-lighten-2': '#c4b5fd',

          // Accent - Energetic Orange
          accent: '#f97316',
          'accent-lighten-1': '#fb923c',

          // Semantic colors
          error: '#ef4444',
          warning: '#f59e0b',
          info: '#06b6d4',
          success: '#10b981',

          // Surface colors - Clean and bright
          background: '#f8fafc',
          surface: '#ffffff',
          'surface-variant': '#f1f5f9',
          'surface-bright': '#ffffff',
          'surface-light': '#e2e8f0',

          // On colors (text on colored backgrounds)
          'on-primary': '#ffffff',
          'on-secondary': '#ffffff',
          'on-surface': '#0f172a',
          'on-background': '#1e293b',
          'on-error': '#ffffff',
          'on-success': '#ffffff',
          'on-warning': '#ffffff',
          'on-info': '#ffffff',
          'on-accent': '#ffffff',
        },
        variables: {
          'border-color': '#e2e8f0',
          'border-opacity': 0.12,
          'high-emphasis-opacity': 0.87,
          'medium-emphasis-opacity': 0.6,
          'disabled-opacity': 0.38,
          'idle-opacity': 0.04,
          'hover-opacity': 0.08,
          'focus-opacity': 0.12,
          'selected-opacity': 0.12,
          'activated-opacity': 0.16,
          'pressed-opacity': 0.14,
          'dragged-opacity': 0.10,
          'theme-kbd': '#212529',
          'theme-on-kbd': '#FFFFFF',
          'theme-code': '#F1F5F9',
          'theme-on-code': '#0F172A',
        }
      },
      dark: {
        dark: true,
        colors: {
          // Primary palette - Brighter cyan for dark mode visibility
          primary: '#22d3ee',
          'primary-darken-1': '#06b6d4',
          'primary-darken-2': '#0891b2',
          'primary-lighten-1': '#67e8f9',
          'primary-lighten-2': '#a5f3fc',

          // Secondary palette - Vibrant purple
          secondary: '#a78bfa',
          'secondary-darken-1': '#8b5cf6',
          'secondary-lighten-1': '#c4b5fd',
          'secondary-lighten-2': '#ddd6fe',

          // Accent - Warm orange
          accent: '#fb923c',
          'accent-lighten-1': '#fdba74',

          // Semantic colors - Adjusted for dark mode
          error: '#f87171',
          warning: '#fbbf24',
          info: '#22d3ee',
          success: '#34d399',

          // Surface colors - Deep and sophisticated
          background: '#0f172a',
          surface: '#1e293b',
          'surface-variant': '#334155',
          'surface-bright': '#475569',
          'surface-light': '#64748b',

          // On colors
          'on-primary': '#0f172a',
          'on-secondary': '#0f172a',
          'on-surface': '#f1f5f9',
          'on-background': '#e2e8f0',
          'on-error': '#0f172a',
          'on-success': '#0f172a',
          'on-warning': '#0f172a',
          'on-info': '#0f172a',
          'on-accent': '#0f172a',
        },
        variables: {
          'border-color': '#334155',
          'border-opacity': 0.12,
          'high-emphasis-opacity': 0.87,
          'medium-emphasis-opacity': 0.6,
          'disabled-opacity': 0.38,
          'idle-opacity': 0.10,
          'hover-opacity': 0.08,
          'focus-opacity': 0.12,
          'selected-opacity': 0.12,
          'activated-opacity': 0.16,
          'pressed-opacity': 0.14,
          'dragged-opacity': 0.10,
          'theme-kbd': '#e2e8f0',
          'theme-on-kbd': '#0f172a',
          'theme-code': '#334155',
          'theme-on-code': '#f1f5f9',
        }
      }
    }
  }
})

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
