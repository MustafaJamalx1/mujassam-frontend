import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const loading = ref(false)

  const isAuthenticated = computed(() => !!token.value)

  const userInitials = computed(() => {
    if (!user.value?.name) return ''
    return user.value.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
  })

  async function login(credentials) {
    loading.value = true
    try {
      // TODO: Replace with actual API call
      // const response = await api.post('/auth/login', credentials)
      // token.value = response.data.token
      // user.value = response.data.user
      // localStorage.setItem('token', token.value)
    } catch (err) {
      throw err
    } finally {
      loading.value = false
    }
  }

  async function register(userData) {
    loading.value = true
    try {
      // TODO: Replace with actual API call
    } catch (err) {
      throw err
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }

  async function fetchProfile() {
    if (!token.value) return

    loading.value = true
    try {
      // TODO: Replace with actual API call
      // const response = await api.get('/auth/profile')
      // user.value = response.data
    } catch (err) {
      logout()
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    token,
    loading,
    isAuthenticated,
    userInitials,
    login,
    register,
    logout,
    fetchProfile
  }
})
