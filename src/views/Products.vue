<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import ProductCard from '@/components/common/ProductCard.vue'

const route = useRoute()
const { t } = useI18n()

const mobileFilterOpen = ref(false)
const searchQuery = ref(route.query.q || '')
const selectedCategories = ref([])
const priceRange = ref([0, 150])
const sortBy = ref('featured')

const categoryKeys = ['Figurines', 'Home Decor', 'Gadgets', 'Art', 'Games']

const sortOptions = computed(() => [
  { label: t('products.sortFeatured'), value: 'featured' },
  { label: t('products.sortNewest'),   value: 'newest' },
  { label: t('products.sortPriceLow'), value: 'price-asc' },
  { label: t('products.sortPriceHigh'),value: 'price-desc' },
])

const allProducts = [
  { id: 1, name: 'Dragon Figurine',     price: 29.99, category: 'Figurines', image: '' },
  { id: 2, name: 'Geometric Vase',      price: 24.99, category: 'Home Decor', image: '' },
  { id: 3, name: 'Modular Phone Stand', price: 14.99, category: 'Gadgets',   image: '' },
  { id: 4, name: 'Abstract Sculpture',  price: 49.99, category: 'Art',       image: '' },
  { id: 5, name: 'Chess Set',           price: 39.99, category: 'Games',     image: '' },
  { id: 6, name: 'Desk Organiser',      price: 19.99, category: 'Gadgets',   image: '' },
  { id: 7, name: 'Bonsai Pot',          price: 22.50, category: 'Home Decor', image: '' },
  { id: 8, name: 'Articulated Hand',    price: 34.99, category: 'Art',       image: '' },
]

const filtered = computed(() => {
  let list = allProducts

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
  }
  if (selectedCategories.value.length) {
    list = list.filter(p => selectedCategories.value.includes(p.category))
  }
  const [min, max] = priceRange.value
  list = list.filter(p => p.price >= min && p.price <= max)

  if (sortBy.value === 'price-asc')  list = [...list].sort((a, b) => a.price - b.price)
  if (sortBy.value === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)

  return list
})

const activeFilterCount = computed(
  () => selectedCategories.value.length + (priceRange.value[0] > 0 || priceRange.value[1] < 150 ? 1 : 0)
)

function clearFilters() {
  selectedCategories.value = []
  priceRange.value = [0, 150]
  searchQuery.value = ''
}

function toggleCategory(cat) {
  const idx = selectedCategories.value.indexOf(cat)
  if (idx > -1) selectedCategories.value.splice(idx, 1)
  else selectedCategories.value.push(cat)
}

onMounted(() => {
  if (route.query.category) {
    const cat = categoryKeys.find(c => c.toLowerCase() === route.query.category)
    if (cat) selectedCategories.value = [cat]
  }
})
</script>

<template>
  <div class="products-page">
    <div class="container">

      <!-- Page header -->
      <div class="page-head">
        <div>
          <nav class="breadcrumb" aria-label="Breadcrumb">
            <router-link to="/" class="bc-link">{{ $t('products.home') }}</router-link>
            <v-icon size="14" class="bc-sep">mdi-chevron-right</v-icon>
            <span class="bc-current">{{ $t('products.products') }}</span>
          </nav>
          <h1 class="page-title">{{ $t('products.ourCollection') }}</h1>
          <p class="page-sub">{{ $t('products.readyToShip', { count: filtered.length }) }}</p>
        </div>

        <!-- Search + Sort -->
        <div class="page-controls">
          <div class="search-wrap">
            <v-icon size="16" class="search-icon">mdi-magnify</v-icon>
            <input
              v-model="searchQuery"
              :placeholder="$t('products.searchPlaceholder')"
              class="search-input"
            />
          </div>

          <select v-model="sortBy" class="sort-select">
            <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </option>
          </select>

          <!-- Mobile filter toggle -->
          <button class="filter-toggle d-md-none" @click="mobileFilterOpen = true">
            <v-icon size="18">mdi-tune-variant</v-icon>
            {{ $t('products.filters') }}
            <span v-if="activeFilterCount" class="filter-badge">{{ activeFilterCount }}</span>
          </button>
        </div>
      </div>

      <!-- Layout -->
      <div class="products-layout">

        <!-- ─── Sidebar ───────────────────────────────────────────── -->
        <aside class="filters-sidebar d-none d-md-flex">
          <div class="filters-header">
            <span class="filters-title">{{ $t('products.filters') }}</span>
            <button v-if="activeFilterCount" class="filters-clear" @click="clearFilters">
              {{ $t('products.clearAll') }}
            </button>
          </div>

          <!-- Category -->
          <div class="filter-group">
            <h4 class="filter-group-label">{{ $t('products.category') }}</h4>
            <div class="filter-options">
              <label
                v-for="cat in categoryKeys"
                :key="cat"
                class="filter-chip"
                :class="{ 'filter-chip--active': selectedCategories.includes(cat) }"
              >
                <input
                  type="checkbox"
                  :checked="selectedCategories.includes(cat)"
                  @change="toggleCategory(cat)"
                  class="sr-only"
                />
                {{ $t(`products.categories.${cat}`) }}
              </label>
            </div>
          </div>

          <!-- Price -->
          <div class="filter-group">
            <h4 class="filter-group-label">
              {{ $t('products.price') }}
              <span class="filter-group-range">${{ priceRange[0] }} – ${{ priceRange[1] }}</span>
            </h4>
            <v-range-slider
              v-model="priceRange"
              :min="0"
              :max="150"
              :step="5"
              color="primary"
              track-color="#E8DFD3"
              hide-details
              class="price-slider"
            />
          </div>
        </aside>

        <!-- ─── Grid ─────────────────────────────────────────────── -->
        <div class="products-col">
          <!-- Results info -->
          <div v-if="activeFilterCount" class="active-filters">
            <span class="active-filters-label">{{ $t('products.activeFilters') }}</span>
            <span
              v-for="cat in selectedCategories"
              :key="cat"
              class="filter-tag"
            >
              {{ $t(`products.categories.${cat}`) }}
              <button @click="toggleCategory(cat)" class="filter-tag-remove">
                <v-icon size="12">mdi-close</v-icon>
              </button>
            </span>
            <button class="clear-link" @click="clearFilters">{{ $t('products.clearAll') }}</button>
          </div>

          <div v-if="filtered.length" class="product-grid">
            <ProductCard
              v-for="product in filtered"
              :key="product.id"
              :product="product"
            />
          </div>

          <!-- Empty state -->
          <div v-else class="empty-state">
            <v-icon size="56" style="color: var(--color-muted-light);">mdi-package-variant</v-icon>
            <h3 class="empty-title">{{ $t('products.noProducts') }}</h3>
            <p class="empty-sub">{{ $t('products.noProductsSub') }}</p>
            <button class="btn-primary" @click="clearFilters">{{ $t('products.clearFilters') }}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile filter drawer -->
    <Transition name="drawer">
      <div v-if="mobileFilterOpen" class="mobile-drawer-overlay" @click.self="mobileFilterOpen = false">
        <div class="mobile-drawer">
          <div class="mobile-drawer-head">
            <span class="filters-title">{{ $t('products.filters') }}</span>
            <button class="drawer-close" @click="mobileFilterOpen = false">
              <v-icon size="20">mdi-close</v-icon>
            </button>
          </div>

          <div class="filter-group">
            <h4 class="filter-group-label">{{ $t('products.category') }}</h4>
            <div class="filter-options">
              <label
                v-for="cat in categoryKeys"
                :key="cat"
                class="filter-chip"
                :class="{ 'filter-chip--active': selectedCategories.includes(cat) }"
              >
                <input type="checkbox" :checked="selectedCategories.includes(cat)" @change="toggleCategory(cat)" class="sr-only" />
                {{ $t(`products.categories.${cat}`) }}
              </label>
            </div>
          </div>

          <div class="filter-group">
            <h4 class="filter-group-label">
              {{ $t('products.price') }}
              <span class="filter-group-range">${{ priceRange[0] }} – ${{ priceRange[1] }}</span>
            </h4>
            <v-range-slider v-model="priceRange" :min="0" :max="150" :step="5" color="primary" track-color="#E8DFD3" hide-details class="price-slider" />
          </div>

          <div class="mobile-drawer-footer">
            <button class="btn-ghost" @click="clearFilters">{{ $t('products.clearAll') }}</button>
            <button class="btn-primary" @click="mobileFilterOpen = false">
              {{ $t('products.showResults', { count: filtered.length }) }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.products-page {
  min-height: 100vh;
  background: var(--color-cream);
  padding-top: 64px;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Page header */
.page-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  padding: 40px 0 32px;
  border-bottom: 1px solid var(--color-divider);
  margin-bottom: 32px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 12px;
}
.bc-link {
  font-size: 0.8rem;
  color: var(--color-muted);
  text-decoration: none;
}
.bc-link:hover { color: var(--color-terracotta); }
.bc-sep { color: var(--color-muted-light); }
.bc-current {
  font-size: 0.8rem;
  color: var(--color-ink);
  font-weight: 500;
}

.page-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 700;
  color: var(--color-ink);
  letter-spacing: -0.03em;
  margin: 0 0 4px;
}
.page-sub {
  font-size: 0.875rem;
  color: var(--color-muted);
  margin: 0;
}

/* Controls */
.page-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.search-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.search-icon {
  position: absolute;
  inset-inline-start: 12px;
  color: var(--color-muted-light);
  pointer-events: none;
}
.search-input {
  padding: 9px 14px 9px 36px;
  border: 1.5px solid var(--color-divider);
  border-radius: var(--radius-lg);
  background: #fff;
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--color-ink);
  outline: none;
  width: 220px;
  transition: border-color var(--duration-fast);
}
.search-input::placeholder { color: var(--color-muted-light); }
.search-input:focus { border-color: var(--color-terracotta); }

[dir="rtl"] .search-input {
  padding: 9px 36px 9px 14px;
}

.sort-select {
  padding: 9px 14px;
  border: 1.5px solid var(--color-divider);
  border-radius: var(--radius-lg);
  background: #fff;
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--color-ink);
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238C7B6B' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 32px;
  transition: border-color var(--duration-fast);
}
.sort-select:focus { border-color: var(--color-terracotta); }

.filter-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 16px;
  border: 1.5px solid var(--color-divider);
  border-radius: var(--radius-lg);
  background: #fff;
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-ink);
  cursor: pointer;
  position: relative;
}
.filter-badge {
  width: 18px;
  height: 18px;
  background: var(--color-terracotta);
  color: #fff;
  border-radius: 50%;
  font-size: 0.65rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Layout */
.products-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  padding-bottom: 64px;
}
@media (min-width: 768px) {
  .products-layout { grid-template-columns: 220px 1fr; }
}
@media (min-width: 1024px) {
  .products-layout { grid-template-columns: 240px 1fr; }
}

/* Sidebar */
.filters-sidebar {
  flex-direction: column;
  gap: 28px;
  position: sticky;
  top: 88px;
  align-self: start;
}

.filters-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.filters-title {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-ink);
  letter-spacing: -0.02em;
}
.filters-clear {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-terracotta);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.filter-group { display: flex; flex-direction: column; gap: 12px; }
.filter-group-label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--color-muted);
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
}
.filter-group-range {
  font-weight: 600;
  color: var(--color-ink);
  letter-spacing: 0;
  text-transform: none;
  font-size: 0.8rem;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.filter-chip {
  display: inline-flex;
  align-items: center;
  padding: 5px 12px;
  border-radius: var(--radius-pill);
  border: 1.5px solid var(--color-divider);
  background: #fff;
  font-size: 0.83rem;
  font-weight: 500;
  color: var(--color-ink);
  cursor: pointer;
  user-select: none;
  transition: border-color var(--duration-fast), background var(--duration-fast), color var(--duration-fast);
}
.filter-chip:hover { border-color: var(--color-muted-light); }
.filter-chip--active {
  border-color: var(--color-terracotta);
  background: rgba(184,92,56,0.07);
  color: var(--color-terracotta);
  font-weight: 600;
}

.price-slider {
  margin: 0 4px;
}

/* Active filters row */
.active-filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}
.active-filters-label {
  font-size: 0.8rem;
  color: var(--color-muted);
  font-weight: 500;
}
.filter-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  background: rgba(184,92,56,0.08);
  border: 1px solid rgba(184,92,56,0.2);
  border-radius: var(--radius-pill);
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-terracotta);
}
.filter-tag-remove {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-terracotta);
  padding: 0;
  display: flex;
  align-items: center;
}
.clear-link {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-muted);
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
}

/* Grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
@media (min-width: 768px)  { .product-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1200px) { .product-grid { grid-template-columns: repeat(4, 1fr); } }

/* Empty state */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 80px 24px;
  text-align: center;
}
.empty-title {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-ink);
  margin: 0;
}
.empty-sub {
  font-size: 0.9rem;
  color: var(--color-muted);
  margin: 0 0 8px;
}

/* Buttons */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 22px;
  background: var(--color-terracotta);
  color: #fff;
  border-radius: var(--radius-lg);
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: background var(--duration-fast);
}
.btn-primary:hover { background: var(--color-terra-dark); }

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 22px;
  background: #fff;
  color: var(--color-ink);
  border-radius: var(--radius-lg);
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  border: 1.5px solid var(--color-divider);
  cursor: pointer;
  text-decoration: none;
  transition: border-color var(--duration-fast);
}
.btn-ghost:hover { border-color: var(--color-muted-light); }

/* Mobile Drawer */
.mobile-drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(26,15,10,0.5);
  z-index: 200;
  display: flex;
  align-items: flex-end;
}
.mobile-drawer {
  background: var(--color-cream);
  border-radius: 20px 20px 0 0;
  padding: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-height: 85vh;
  overflow-y: auto;
}
.mobile-drawer-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.drawer-close {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-muted);
  display: flex;
  padding: 4px;
}
.mobile-drawer-footer {
  display: flex;
  gap: 10px;
  padding-top: 8px;
  border-top: 1px solid var(--color-divider);
}
.mobile-drawer-footer .btn-ghost,
.mobile-drawer-footer .btn-primary {
  flex: 1;
  justify-content: center;
}

/* Drawer animation */
.drawer-enter-active,
.drawer-leave-active { transition: opacity var(--duration-base) var(--ease-out); }
.drawer-enter-active .mobile-drawer,
.drawer-leave-active .mobile-drawer { transition: transform var(--duration-base) var(--ease-out); }
.drawer-enter-from,
.drawer-leave-to { opacity: 0; }
.drawer-enter-from .mobile-drawer,
.drawer-leave-to .mobile-drawer { transform: translateY(100%); }

/* Utility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border-width: 0;
}
</style>
