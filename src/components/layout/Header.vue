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
    height="72"
    class="glass-header"
    style="backdrop-filter: blur(20px) saturate(180%); -webkit-backdrop-filter: blur(20px) saturate(180%); border-bottom: 1px solid rgba(203, 213, 225, 0.2);"
  >
    <v-container class="d-flex align-center h-100">
      <!-- Logo with modern 3D effect -->
      <router-link to="/" class="d-flex align-center text-decoration-none logo-link">
        <div class="logo-container position-relative">
          <v-avatar 
            size="44" 
            class="logo-avatar"
            style="background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%); box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);"
          >
            <v-icon color="white" size="28">mdi-cube-outline</v-icon>
          </v-avatar>
        </div>
        <div class="ml-3">
          <div class="text-h5 font-weight-bold" style="font-family: var(--font-display); letter-spacing: -0.02em;">
            <span class="text-gradient">Mujassam</span>
          </div>
          <div class="text-caption" style="color: #64748b; margin-top: -4px; font-weight: 500;">3D Printing</div>
        </div>
      </router-link>

      <v-spacer></v-spacer>

      <!-- Desktop Navigation with modern styling -->
      <div class="d-none d-lg-flex align-center ga-1">
        <v-btn
          v-for="item in navigation"
          :key="item.name"
          :to="item.path"
          variant="text"
          class="nav-btn px-5"
          rounded="lg"
          size="default"
        >
          <v-icon start size="20">{{ item.icon }}</v-icon>
          {{ item.name }}
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <!-- Right side actions -->
      <div class="d-flex align-center ga-1">
        <!-- Search with glass effect -->
        <v-btn 
          icon 
          variant="text" 
          class="action-btn"
          rounded="lg"
          size="default"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <!-- Dark Mode Toggle -->
        <v-btn
          icon
          variant="text"
          class="action-btn"
          rounded="lg"
          size="default"
          @click="toggleTheme"
        >
          <v-icon>{{ isDark ? 'mdi-weather-night' : 'mdi-weather-sunny' }}</v-icon>
        </v-btn>

        <!-- Cart with enhanced badge -->
        <v-btn 
          icon 
          variant="text" 
          to="/cart" 
          class="action-btn"
          rounded="lg"
          size="default"
        >
          <v-badge
            :content="cartStore.itemCount"
            :model-value="cartStore.itemCount > 0"
            color="#a855f7"
            floating
            class="cart-badge"
          >
            <v-icon>mdi-cart-outline</v-icon>
          </v-badge>
        </v-btn>

        <!-- User menu with gradient -->
        <v-menu v-if="userStore.isAuthenticated" offset-y>
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props" class="ml-1" rounded="lg">
              <v-avatar 
                size="36"
                style="background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%);"
              >
                <span class="text-body-2 font-weight-bold text-white">{{ userStore.userInitials }}</span>
              </v-avatar>
            </v-btn>
          </template>
          <v-list rounded="lg" elevation="8" class="mt-2" style="min-width: 200px;">
            <v-list-item to="/profile" rounded="lg">
              <template v-slot:prepend>
                <v-icon color="primary">mdi-account</v-icon>
              </template>
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
            <v-list-item to="/orders" rounded="lg">
              <template v-slot:prepend>
                <v-icon color="primary">mdi-package-variant</v-icon>
              </template>
              <v-list-item-title>Orders</v-list-item-title>
            </v-list-item>
            <v-divider class="my-1"></v-divider>
            <v-list-item @click="userStore.logout" rounded="lg">
              <template v-slot:prepend>
                <v-icon color="error">mdi-logout</v-icon>
              </template>
              <v-list-item-title>Sign Out</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          v-else
          rounded="lg"
          to="/login"
          size="default"
          class="ml-2"
          style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; font-weight: 600; box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);"
        >
          <v-icon start>mdi-login</v-icon>
          Sign In
        </v-btn>

        <!-- Mobile menu button -->
        <v-btn
          icon
          variant="text"
          class="d-lg-none ml-1 action-btn"
          rounded="lg"
          @click="drawer = !drawer"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </div>
    </v-container>
  </v-app-bar>

  <!-- Mobile Navigation Drawer with modern styling -->
  <v-navigation-drawer
    v-model="drawer"
    location="right"
    temporary
    width="300"
    class="mobile-drawer"
  >
    <div class="pa-4" style="background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%);">
      <div class="d-flex align-center mb-2">
        <v-avatar size="48" style="background: rgba(255, 255, 255, 0.2);">
          <v-icon color="white" size="32">mdi-cube-outline</v-icon>
        </v-avatar>
        <div class="ml-3">
          <div class="text-h6 font-weight-bold text-white">Mujassam</div>
          <div class="text-caption text-white" style="opacity: 0.9;">3D Printing Services</div>
        </div>
      </div>
    </div>
    
    <v-list nav class="py-4">
      <v-list-item
        v-for="item in navigation"
        :key="item.name"
        :to="item.path"
        :prepend-icon="item.icon"
        rounded="xl"
        class="mx-2 mb-1"
        @click="drawer = false"
      >
        <v-list-item-title class="font-weight-medium">{{ item.name }}</v-list-item-title>
      </v-list-item>
      
      <v-divider class="my-3 mx-4"></v-divider>
      
      <v-list-item
        :prepend-icon="isDark ? 'mdi-weather-night' : 'mdi-weather-sunny'"
        rounded="xl"
        class="mx-2"
        @click="toggleTheme"
      >
        <v-list-item-title class="font-weight-medium">
          {{ isDark ? 'Dark Mode' : 'Light Mode' }}
        </v-list-item-title>
        <template v-slot:append>
          <v-switch
            :model-value="isDark"
            hide-details
            inset
            color="primary"
            density="compact"
            @click.stop="toggleTheme"
          ></v-switch>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.glass-header {
  background: rgba(255, 255, 255, 0.8) !important;
}

.logo-container {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.logo-link:hover .logo-container {
  transform: translateY(-2px) rotate(5deg);
}

.logo-avatar {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.logo-link:hover .logo-avatar {
  box-shadow: 0 8px 20px rgba(6, 182, 212, 0.4) !important;
}

.nav-btn {
  font-weight: 600 !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: -0.01em;
}

.nav-btn:hover {
  background: rgba(6, 182, 212, 0.08) !important;
  transform: translateY(-1px);
}

.action-btn {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.action-btn:hover {
  background: rgba(6, 182, 212, 0.08) !important;
  transform: scale(1.05);
}

.cart-badge :deep(.v-badge__badge) {
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(168, 85, 247, 0.4);
}

.mobile-drawer {
  border-left: 1px solid rgba(203, 213, 225, 0.2);
}

.text-gradient {
  background: linear-gradient(135deg, #06b6d4 0%, #a855f7 50%, #f43f5e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
