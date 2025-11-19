<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'

const cartStore = useCartStore()
const userStore = useUserStore()

const isMobileMenuOpen = ref(false)

const navigation = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'Upload', path: '/upload' }
]

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <nav class="container-app">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">M</span>
          </div>
          <span class="font-display font-bold text-xl text-gray-900">Mujassam</span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <RouterLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.path"
            class="text-gray-600 hover:text-primary-600 font-medium transition-colors"
          >
            {{ item.name }}
          </RouterLink>
        </div>

        <!-- Right side actions -->
        <div class="flex items-center space-x-4">
          <!-- Search button -->
          <button class="p-2 text-gray-600 hover:text-primary-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <!-- Cart -->
          <RouterLink to="/cart" class="relative p-2 text-gray-600 hover:text-primary-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span
              v-if="cartStore.itemCount > 0"
              class="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
            >
              {{ cartStore.itemCount }}
            </span>
          </RouterLink>

          <!-- User menu -->
          <button
            v-if="userStore.isAuthenticated"
            class="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-medium"
          >
            {{ userStore.userInitials }}
          </button>
          <RouterLink
            v-else
            to="/login"
            class="btn-primary text-sm"
          >
            Sign In
          </RouterLink>

          <!-- Mobile menu button -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 text-gray-600 hover:text-primary-600"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                v-if="!isMobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden py-4 border-t border-gray-100"
      >
        <div class="flex flex-col space-y-3">
          <RouterLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.path"
            class="text-gray-600 hover:text-primary-600 font-medium py-2"
            @click="isMobileMenuOpen = false"
          >
            {{ item.name }}
          </RouterLink>
        </div>
      </div>
    </nav>
  </header>
</template>
