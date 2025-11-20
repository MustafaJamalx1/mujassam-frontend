import { ref, watch } from 'vue'
import { useTheme as useVuetifyTheme } from 'vuetify'

const isDark = ref(false)

// Load theme preference from localStorage
if (typeof window !== 'undefined') {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  } else {
    // Check system preference
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
}

export function useTheme() {
  const vuetifyTheme = useVuetifyTheme()

  // Sync with Vuetify theme
  if (vuetifyTheme) {
    vuetifyTheme.global.name.value = isDark.value ? 'dark' : 'light'
  }

  // Watch for changes and persist to localStorage
  watch(isDark, (newValue) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newValue ? 'dark' : 'light')
      if (vuetifyTheme) {
        vuetifyTheme.global.name.value = newValue ? 'dark' : 'light'
      }
    }
  })

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  return {
    isDark,
    toggleTheme
  }
}
