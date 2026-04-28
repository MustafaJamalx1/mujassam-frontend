<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()
const userStore = useUserStore()

const mobileMenuOpen = ref(false)
const searchOpen = ref(false)
const searchQuery = ref('')

const navLinks = [
  { label: 'Products', to: '/products' },
  { label: 'Upload Design', to: '/upload' },
]

const cartCount = computed(() => cartStore.itemCount)
const isActive = (path) => route.path.startsWith(path)

function submitSearch() {
  if (searchQuery.value.trim()) {
    router.push({ path: '/products', query: { q: searchQuery.value } })
    searchOpen.value = false
    searchQuery.value = ''
  }
}

function closeSearch() {
  searchOpen.value = false
  searchQuery.value = ''
}
</script>

<template>
  <header class="site-header">
    <div class="header-inner">
      <!-- Logo -->
      <router-link to="/" class="logo-link" @click="mobileMenuOpen = false">
        <span class="logo-icon">
          <v-icon size="22" color="primary">mdi-cube-scan</v-icon>
        </span>
        <span class="logo-text">Mujassam</span>
      </router-link>

      <!-- Desktop Nav -->
      <nav class="desktop-nav">
        <router-link
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="nav-link"
          :class="{ 'nav-link--active': isActive(link.to) }"
        >
          {{ link.label }}
        </router-link>
      </nav>

      <!-- Right Actions -->
      <div class="header-actions">
        <!-- Search -->
        <Transition name="search-expand">
          <div v-if="searchOpen" class="search-bar">
            <input
              v-model="searchQuery"
              autofocus
              placeholder="Search products…"
              class="search-input"
              @keydown.enter="submitSearch"
              @keydown.escape="closeSearch"
            />
            <button class="search-close" @click="closeSearch">
              <v-icon size="18">mdi-close</v-icon>
            </button>
          </div>
        </Transition>

        <button class="icon-btn" :class="{ 'icon-btn--active': searchOpen }" @click="searchOpen = !searchOpen" aria-label="Search">
          <v-icon size="20">mdi-magnify</v-icon>
        </button>

        <!-- Cart -->
        <router-link to="/cart" class="icon-btn cart-btn" aria-label="Cart">
          <v-icon size="20">mdi-shopping-outline</v-icon>
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </router-link>

        <!-- Account -->
        <button class="icon-btn" aria-label="Account">
          <v-icon size="20">mdi-account-outline</v-icon>
        </button>

        <!-- Mobile Hamburger -->
        <button
          class="icon-btn hamburger d-md-none"
          @click="mobileMenuOpen = !mobileMenuOpen"
          :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'"
        >
          <v-icon size="22">{{ mobileMenuOpen ? 'mdi-close' : 'mdi-menu' }}</v-icon>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div v-if="mobileMenuOpen" class="mobile-menu">
        <nav class="mobile-nav">
          <router-link
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="mobile-nav-link"
            :class="{ 'mobile-nav-link--active': isActive(link.to) }"
            @click="mobileMenuOpen = false"
          >
            {{ link.label }}
          </router-link>
          <router-link to="/cart" class="mobile-nav-link" @click="mobileMenuOpen = false">
            Cart
            <span v-if="cartCount > 0" class="mobile-cart-count">({{ cartCount }})</span>
          </router-link>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(250, 247, 242, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-divider);
}

.header-inner {
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
}

/* Logo */
.logo-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  flex-shrink: 0;
}
.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  background: var(--color-terracotta);
  border-radius: 8px;
}
.logo-icon :deep(.v-icon) {
  color: #fff !important;
}
.logo-text {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-ink);
  letter-spacing: -0.02em;
}

/* Desktop Nav */
.desktop-nav {
  display: none;
  align-items: center;
  gap: 4px;
  margin-left: 16px;
}
@media (min-width: 768px) {
  .desktop-nav { display: flex; }
}

.nav-link {
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-muted);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out),
              background var(--duration-fast) var(--ease-out);
}
.nav-link:hover {
  color: var(--color-ink);
  background: var(--color-cream-dark);
}
.nav-link--active {
  color: var(--color-terracotta);
  background: rgba(184, 92, 56, 0.08);
  font-weight: 600;
}

/* Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
}

.icon-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: none;
  background: transparent;
  border-radius: 8px;
  color: var(--color-muted);
  cursor: pointer;
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out),
              background var(--duration-fast) var(--ease-out);
}
.icon-btn:hover,
.icon-btn--active {
  color: var(--color-ink);
  background: var(--color-cream-dark);
}

.cart-btn { color: var(--color-muted); }
.cart-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  background: var(--color-terracotta);
  color: #fff;
  border-radius: 8px;
  font-size: 0.65rem;
  font-weight: 700;
  line-height: 16px;
  text-align: center;
}

/* Search bar */
.search-bar {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #fff;
  border: 1.5px solid var(--color-divider);
  border-radius: 10px;
  padding: 4px 10px;
  overflow: hidden;
}
.search-input {
  border: none;
  outline: none;
  background: transparent;
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--color-ink);
  width: 200px;
}
.search-input::placeholder { color: var(--color-muted-light); }
.search-close {
  display: flex;
  border: none;
  background: transparent;
  color: var(--color-muted);
  cursor: pointer;
  padding: 2px;
}

/* Search animation */
.search-expand-enter-active,
.search-expand-leave-active {
  transition: all var(--duration-base) var(--ease-out);
  overflow: hidden;
}
.search-expand-enter-from,
.search-expand-leave-to {
  width: 0;
  opacity: 0;
}

/* Mobile menu */
.mobile-menu {
  border-top: 1px solid var(--color-divider);
  background: var(--color-cream);
  padding: 12px 24px 20px;
}
.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.mobile-nav-link {
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-ink);
  text-decoration: none;
  transition: background var(--duration-fast) var(--ease-out);
}
.mobile-nav-link:hover { background: var(--color-cream-dark); }
.mobile-nav-link--active {
  color: var(--color-terracotta);
  background: rgba(184, 92, 56, 0.08);
  font-weight: 600;
}
.mobile-cart-count {
  color: var(--color-terracotta);
  font-weight: 700;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all var(--duration-base) var(--ease-out);
  overflow: hidden;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
