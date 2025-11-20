<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { useTheme } from '@/composables/useTheme'

const cartStore = useCartStore()
const userStore = useUserStore()
const { isDark, toggleTheme } = useTheme()

const drawer = ref(false)

const navigation = [
  { name: 'Home', path: '/', icon: 'mdi-home' },
  { name: 'Products', path: '/products', icon: 'mdi-cube-outline' },
  { name: 'Upload', path: '/upload', icon: 'mdi-cloud-upload' }
]
</script>

<template>
  <v-app-bar 
    elevation="0" 
    height="80"
    class="header-bar"
    style="background: white; border-bottom: 2px solid black;"
  >
    <v-container class="d-flex align-center h-100">
      <!-- Logo with brutalist design -->
      <router-link to="/" class="d-flex align-center text-decoration-none logo-link">
        <div class="logo-wrapper">
          <div class="logo-square">
            <v-icon size="32" style="color: white;">mdi-cube-outline</v-icon>
          </div>
          <div class="ml-3">
            <div class="text-h5 font-weight-black" style="font-family: var(--font-display); letter-spacing: -0.02em; color: black;">
              MUJASSAM
            </div>
            <div class="text-caption font-weight-medium" style="color: #404040; margin-top: -2px; letter-spacing: 2px;">3D PRINTING</div>
          </div>
        </div>
      </router-link>

      <v-spacer></v-spacer>

      <!-- Desktop Navigation -->
      <div class="d-none d-lg-flex align-center ga-2">
        <v-btn
          v-for="item in navigation"
          :key="item.name"
          :to="item.path"
          variant="text"
          class="nav-btn px-4"
          style="border-radius: 0; font-weight: 600; color: black; text-transform: uppercase; letter-spacing: 1px; font-size: 0.813rem;"
        >
          {{ item.name }}
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <!-- Right side actions -->
      <div class="d-flex align-center ga-2">
        <!-- Search -->
        <v-btn 
          icon 
          variant="text" 
          class="action-icon"
          style="border-radius: 0;"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <!-- Cart -->
        <v-btn 
          icon 
          variant="text" 
          to="/cart" 
          class="action-icon"
          style="border-radius: 0;"
        >
          <v-badge
            :content="cartStore.itemCount"
            :model-value="cartStore.itemCount > 0"
            color="black"
            class="cart-badge"
          >
            <v-icon>mdi-cart-outline</v-icon>
          </v-badge>
        </v-btn>

        <!-- User menu -->
        <v-menu v-if="userStore.isAuthenticated" offset-y>
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props" class="ml-1" style="border-radius: 0;">
              <v-avatar 
                size="36"
                style="background: black; border: 2px solid black;"
              >
                <span class="text-body-2 font-weight-bold text-white">{{ userStore.userInitials }}</span>
              </v-avatar>
            </v-btn>
          </template>
          <v-list style="border: 2px solid black; border-radius: 0; min-width: 200px;">
            <v-list-item to="/profile">
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
            <v-list-item to="/orders">
              <v-list-item-title>Orders</v-list-item-title>
            </v-list-item>
            <v-divider style="border-color: black;"></v-divider>
            <v-list-item @click="userStore.logout">
              <v-list-item-title>Sign Out</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          v-else
          to="/login"
          size="default"
          class="ml-2 sign-in-btn"
          style="border-radius: 0; background: black; color: white; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; border: 2px solid black; padding: 0 24px;"
        >
          SIGN IN
        </v-btn>

        <!-- Mobile menu button -->
        <v-btn
          icon
          variant="text"
          class="d-lg-none ml-1"
          style="border-radius: 0;"
          @click="drawer = !drawer"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </div>
    </v-container>
  </v-app-bar>

  <!-- Mobile Navigation Drawer -->
  <v-navigation-drawer
    v-model="drawer"
    location="right"
    temporary
    width="300"
    style="border-left: 2px solid black;"
  >
    <div class="pa-4" style="background: black; border-bottom: 2px solid black;">
      <div class="d-flex align-center mb-2">
        <div class="logo-square" style="width: 48px; height: 48px;">
          <v-icon color="white" size="32">mdi-cube-outline</v-icon>
        </div>
        <div class="ml-3">
          <div class="text-h6 font-weight-bold text-white" style="text-transform: uppercase; letter-spacing: 1px;">MUJASSAM</div>
          <div class="text-caption text-white" style="opacity: 0.8;">3D PRINTING</div>
        </div>
      </div>
    </div>
    
    <v-list nav class="py-4">
      <v-list-item
        v-for="item in navigation"
        :key="item.name"
        :to="item.path"
        class="mx-3 mb-2"
        style="border: 2px solid black; background: white;"
        @click="drawer = false"
      >
        <v-list-item-title class="font-weight-bold" style="text-transform: uppercase; letter-spacing: 1px;">{{ item.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.logo-square {
  background: black;
  border: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-btn:hover {
  background: rgba(0, 0, 0, 0.05) !important;
}

.action-icon:hover {
  background: rgba(0, 0, 0, 0.05) !important;
}

.sign-in-btn:hover {
  box-shadow: 4px 4px 0 black;
  transform: translate(-2px, -2px);
  transition: all 0.1s ease;
}

.cart-badge :deep(.v-badge__badge) {
  font-weight: 700;
  font-size: 0.688rem;
}
</style>
