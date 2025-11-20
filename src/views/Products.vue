<script setup>
import { ref, onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()

const viewMode = ref('grid')
const drawer = ref(false)
const searchQuery = ref('')
const selectedCategories = ref([])
const priceRange = ref([0, 100])

const categories = ['Figurines', 'Home Decor', 'Gadgets', 'Art', 'Games']

// Placeholder products for development
const placeholderProducts = [
  { id: 1, name: 'Dragon Figurine', price: 29.99, category: 'Figurines', image: '' },
  { id: 2, name: 'Geometric Vase', price: 24.99, category: 'Home Decor', image: '' },
  { id: 3, name: 'Phone Stand', price: 14.99, category: 'Gadgets', image: '' },
  { id: 4, name: 'Abstract Sculpture', price: 49.99, category: 'Art', image: '' },
  { id: 5, name: 'Chess Set', price: 39.99, category: 'Games', image: '' },
  { id: 6, name: 'Desk Organizer', price: 19.99, category: 'Gadgets', image: '' }
]

function clearFilters() {
  selectedCategories.value = []
  priceRange.value = [0, 100]
  searchQuery.value = ''
}

onMounted(() => {
  productsStore.fetchProducts()
})
</script>

<template>
  <div class="products-page">
    <v-container class="py-6 py-md-10">
      <!-- Header -->
      <div class="page-header mb-8 mb-md-10">
        <div class="d-flex flex-column flex-md-row align-md-center justify-space-between ga-4">
          <div>
            <div class="mb-3">
              <div class="d-inline-flex align-center px-4 py-2" style="border: 2px solid black; background: white;">
                <span class="text-body-2 font-weight-bold" style="color: black; text-transform: uppercase; letter-spacing: 1px;">SHOP</span>
              </div>
            </div>
            <h1 class="text-h3 text-md-h2 font-weight-bold mb-2" style="font-family: var(--font-display); letter-spacing: -0.02em; color: black; text-transform: uppercase;">
              3D PRINTED COLLECTION
            </h1>
            <p class="text-body-1" style="color: #404040;">Premium 3D printed designs crafted with precision</p>
          </div>
          
          <div class="d-flex align-center ga-2 ga-md-3 flex-wrap">
            <!-- Search -->
            <div class="search-wrapper">
              <v-text-field
                v-model="searchQuery"
                prepend-inner-icon="mdi-magnify"
                placeholder="SEARCH"
                variant="outlined"
                density="comfortable"
                hide-details
                single-line
                style="min-width: 220px; max-width: 300px; border-radius: 0;"
                :style="{ '--v-field-border-color': 'black', '--v-field-border-width': '2px' }"
              ></v-text-field>
            </div>

            <!-- View toggle -->
            <div class="pa-1" style="border: 2px solid black; background: white;">
              <v-btn-toggle
                v-model="viewMode"
                mandatory
                density="comfortable"
                color="black"
              >
                <v-btn value="grid" icon size="small" style="border-radius: 0;">
                  <v-icon size="20">mdi-view-grid</v-icon>
                </v-btn>
                <v-btn value="list" icon size="small" style="border-radius: 0;">
                  <v-icon size="20">mdi-view-list</v-icon>
                </v-btn>
              </v-btn-toggle>
            </div>

            <!-- Filter toggle (mobile) -->
            <v-btn
              class="d-md-none"
              @click="drawer = true"
              icon
              style="border-radius: 0; border: 2px solid black; color: black;"
            >
              <v-icon>mdi-filter-variant</v-icon>
            </v-btn>
          </div>
        </div>
      </div>

      <v-row>
        <!-- Filters Sidebar (Desktop) -->
        <v-col cols="12" md="3" class="d-none d-md-block">
        <div class="pa-6 sticky-filter" style="border: 3px solid black; background: white; box-shadow: 6px 6px 0 black;">
          <div class="d-flex align-center justify-space-between mb-5">
            <h3 class="text-h6 font-weight-bold" style="font-family: var(--font-display); color: black; text-transform: uppercase; letter-spacing: 1px;">
              FILTERS
            </h3>
          </div>
          
          <v-divider class="mb-5" style="border-color: black; border-width: 2px;"></v-divider>
          
          <!-- Categories -->
          <div class="filter-section mb-6">
            <p class="text-body-2 font-weight-bold mb-4" style="color: black; letter-spacing: 1px; text-transform: uppercase;">
              CATEGORY
            </p>
            <div class="filter-options">
              <div 
                v-for="category in categories" 
                :key="category"
                class="filter-option mb-2"
              >
                <v-checkbox
                  v-model="selectedCategories"
                  :label="category"
                  :value="category"
                  density="comfortable"
                  hide-details
                  color="black"
                ></v-checkbox>
              </div>
            </div>
          </div>

          <!-- Price Range -->
          <div class="filter-section mb-6">
            <p class="text-body-2 font-weight-bold mb-5" style="color: black; letter-spacing: 1px; text-transform: uppercase;">
              PRICE RANGE
            </p>
            <v-range-slider
              v-model="priceRange"
              :min="0"
              :max="100"
              :step="5"
              thumb-label="always"
              color="black"
              track-color="#d0d0d0"
              hide-details
              class="mt-6"
            ></v-range-slider>
            <div class="d-flex justify-space-between mt-4">
              <div class="pa-3" style="border: 2px solid black; background: white;">
                <span class="text-caption font-weight-bold" style="color: black; text-transform: uppercase;">MIN</span>
                <div class="text-body-1 font-weight-bold" style="color: black;">${{ priceRange[0] }}</div>
              </div>
              <div class="pa-3" style="border: 2px solid black; background: white;">
                <span class="text-caption font-weight-bold" style="color: black; text-transform: uppercase;">MAX</span>
                <div class="text-body-1 font-weight-bold" style="color: black;">${{ priceRange[1] }}</div>
              </div>
            </div>
          </div>

          <v-btn
            block
            size="large"
            style="border-radius: 0; background: white; color: black; font-weight: 700; text-transform: uppercase; border: 2px solid black;"
            @click="clearFilters"
          >
            CLEAR FILTERS
          </v-btn>
        </div>
      </v-col>

      <!-- Products Grid -->
      <v-col cols="12" md="9">
        <!-- Results count -->
        <div class="pa-4 mb-5 d-flex align-center justify-space-between" style="border: 2px solid black; background: white;">
          <p class="text-body-2 mb-0" style="color: black; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
            SHOWING <span class="font-weight-bold">{{ placeholderProducts.length }}</span> PRODUCTS
          </p>
          <div class="pa-2 px-3" style="border: 2px solid black; background: white;">
            <span style="color: black; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; font-size: 0.75rem;">IN STOCK</span>
          </div>
        </div>

        <!-- Grid View -->
        <v-row v-if="viewMode === 'grid'">
          <v-col
            v-for="product in placeholderProducts"
            :key="product.id"
            cols="12"
            sm="6"
            lg="4"
          >
            <router-link 
              :to="`/products/${product.id}`"
              class="text-decoration-none"
            >
              <div class="h-100" style="border: 3px solid black; background: white; box-shadow: 6px 6px 0 black;">
                <div class="position-relative">
                  <v-img
                    :src="product.image"
                    height="240"
                    cover
                  >
                    <template v-slot:placeholder>
                      <div class="d-flex align-center justify-center fill-height" style="background: #f0f0f0;">
                        <v-icon size="64" style="color: black; opacity: 0.2;">mdi-cube-outline</v-icon>
                      </div>
                    </template>
                  </v-img>
                  
                  <!-- Category badge -->
                  <div
                    class="pa-2 px-3"
                    style="position: absolute; top: 12px; left: 12px; background: white; border: 2px solid black; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; font-size: 0.688rem;"
                  >
                    {{ product.category }}
                  </div>
                </div>
                
                <div class="pa-5" style="border-top: 3px solid black;">
                  <h3 class="text-subtitle-1 font-weight-bold mb-2" style="color: black; font-family: var(--font-display); line-height: 1.3; text-transform: uppercase; letter-spacing: 1px;">
                    {{ product.name }}
                  </h3>
                  
                  <div class="d-flex align-center justify-space-between mb-4">
                    <div class="text-h6 font-weight-bold" style="color: black;">
                      ${{ product.price }}
                    </div>
                    <div class="pa-1 px-2" style="border: 2px solid black; background: white;">
                      <span style="color: black; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; font-size: 0.625rem;">READY</span>
                    </div>
                  </div>
                  
                  <v-btn
                    block
                    style="border-radius: 0; background: black; color: white; font-weight: 700; text-transform: uppercase; border: 2px solid black;"
                  >
                    ADD TO CART
                  </v-btn>
                </div>
              </div>
            </router-link>
          </v-col>
        </v-row>

        <!-- List View -->
        <div v-else class="d-flex flex-column ga-3">
          <v-hover v-slot="{ isHovering, props }" v-for="product in placeholderProducts" :key="product.id">
            <v-card
              v-bind="props"
              :to="`/products/${product.id}`"
              rounded="xl"
              :elevation="isHovering ? 4 : 1"
            >
              <div class="d-flex">
                <v-img
                  :src="product.image"
                  width="140"
                  height="140"
                  cover
                  class="bg-surface-variant flex-shrink-0 rounded-s-xl"
                >
                  <template v-slot:placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                      <v-icon size="32" color="primary" style="opacity: 0.3;">mdi-cube-outline</v-icon>
                    </div>
                  </template>
                </v-img>
                <v-card-text class="d-flex flex-column justify-center py-4">
                  <v-chip size="x-small" color="primary" variant="tonal" class="align-self-start mb-2">
                    {{ product.category }}
                  </v-chip>
                  <h3 class="text-subtitle-1 font-weight-semibold mb-1">{{ product.name }}</h3>
                  <p class="text-h6 font-weight-bold text-primary mb-0">${{ product.price }}</p>
                </v-card-text>
                <div class="d-flex align-center pr-4">
                  <v-btn
                    color="primary"
                    variant="flat"
                    rounded="lg"
                    size="small"
                  >
                    <v-icon start size="16">mdi-cart-plus</v-icon>
                    Add
                  </v-btn>
                </div>
              </div>
            </v-card>
          </v-hover>
        </div>

        <!-- Empty State -->
        <v-card
          v-if="placeholderProducts.length === 0"
          variant="flat"
          class="text-center py-16 bg-transparent"
        >
          <v-icon icon="mdi-package-variant-closed" size="80" color="grey-lighten-1" class="mb-4"></v-icon>
          <h3 class="text-h6 font-weight-medium mb-2">No products found</h3>
          <p class="text-body-2 text-medium-emphasis mb-4">Try adjusting your filters or search terms</p>
          <v-btn variant="tonal" color="primary" @click="clearFilters">
            Clear Filters
          </v-btn>
        </v-card>
        </v-col>
      </v-row>

    <!-- Mobile Filters Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      location="right"
      temporary
      width="320"
    >
      <div class="d-flex align-center justify-space-between pa-4">
        <span class="text-h6 font-weight-bold">Filters</span>
        <v-btn icon variant="text" size="small" @click="drawer = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <v-divider></v-divider>
      <div class="pa-4">
        <!-- Categories -->
        <div class="mb-6">
          <p class="text-body-2 font-weight-bold text-uppercase mb-3" style="letter-spacing: 0.5px;">
            Category
          </p>
          <v-checkbox
            v-for="category in categories"
            :key="category"
            v-model="selectedCategories"
            :label="category"
            :value="category"
            density="comfortable"
            hide-details
            color="primary"
          ></v-checkbox>
        </div>

        <!-- Price Range -->
        <div class="mb-6">
          <p class="text-body-2 font-weight-bold text-uppercase mb-3" style="letter-spacing: 0.5px;">
            Price Range
          </p>
          <v-range-slider
            v-model="priceRange"
            :min="0"
            :max="100"
            :step="5"
            thumb-label="always"
            color="primary"
            hide-details
            class="mt-6"
          ></v-range-slider>
          <div class="d-flex justify-space-between text-body-2 font-weight-medium mt-2">
            <v-chip size="small" color="primary" variant="tonal">${{ priceRange[0] }}</v-chip>
            <v-chip size="small" color="primary" variant="tonal">${{ priceRange[1] }}</v-chip>
          </div>
        </div>

        <v-btn
          variant="tonal"
          color="primary"
          block
          rounded="lg"
          @click="clearFilters"
        >
          <v-icon start>mdi-refresh</v-icon>
          Clear Filters
        </v-btn>
      </div>
    </v-navigation-drawer>
    </v-container>
  </div>
</template>

<style scoped>
.products-page {
  min-height: 100vh;
  padding-top: 72px;
}

.section-badge {
  border: 1px solid rgba(6, 182, 212, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.search-wrapper {
  animation: fadeIn 0.6s ease-out;
}

.search-field :deep(.v-field) {
  box-shadow: none !important;
}

.search-field :deep(.v-field):hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
}

.view-toggle {
  animation: fadeIn 0.6s ease-out 0.1s backwards;
}

.view-toggle-group :deep(.v-btn) {
  border: none;
}

/* Filters Sidebar */
.filters-sidebar {
  animation: fadeIn 0.6s ease-out 0.2s backwards;
}

.sticky-filter {
  position: sticky;
  top: 88px;
}

.filter-section {
  animation: fadeIn 0.6s ease-out backwards;
}

.custom-checkbox :deep(.v-selection-control__wrapper) {
  transition: transform 0.2s ease;
}

.custom-checkbox:hover :deep(.v-selection-control__wrapper) {
  transform: scale(1.05);
}

.price-badge {
  flex: 1;
  text-align: center;
  border: 1px solid rgba(203, 213, 225, 0.2);
}

.clear-btn:hover {
  background: linear-gradient(135deg, #f43f5e25, #a855f725) !important;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(244, 63, 94, 0.2) !important;
}

/* Results Bar */
.results-bar {
  animation: slideDown 0.6s ease-out;
  border: 1px solid rgba(203, 213, 225, 0.2);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Product Cards */
.product-card {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInUp 0.6s ease-out backwards;
  overflow: hidden;
  cursor: pointer;
  border-radius: 24px;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.15) !important;
}

.product-image-wrapper {
  overflow: hidden;
  border-radius: 24px 24px 0 0;
}

.product-image-container {
  position: relative;
  overflow: hidden;
}

.product-image {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover .product-image {
  transform: scale(1.1);
}

.category-badge {
  backdrop-filter: blur(12px);
  transition: all 0.3s ease;
}

.product-card:hover .category-badge {
  transform: translateX(4px) scale(1.05);
}

.quick-actions {
  position: absolute;
  top: 12px;
  right: 12px;
  opacity: 0;
  transform: translateX(10px);
  transition: all 0.3s ease;
}

.product-card:hover .quick-actions {
  opacity: 1;
  transform: translateX(0);
}

.quick-actions .v-btn {
  backdrop-filter: blur(12px);
}

.product-content {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

.add-to-cart-btn {
  transition: all 0.3s ease;
}

.add-to-cart-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(6, 182, 212, 0.45) !important;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* List view styles */
.list-view-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.list-view-card:hover {
  transform: translateX(8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12) !important;
}

/* Mobile drawer */
:deep(.v-navigation-drawer) {
  border-left: 1px solid rgba(203, 213, 225, 0.2);
}

.search-field :deep(.v-field) {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.sticky-filter {
  position: sticky;
  top: 80px;
  border: 1px solid rgba(var(--v-border-color), 0.08);
}

.product-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  border: 1px solid rgba(var(--v-border-color), 0.08);
}

.product-card:hover {
  border-color: rgb(var(--v-theme-primary));
}

.image-container {
  position: relative;
  overflow: hidden;
  background: rgb(var(--v-theme-surface-variant));
}

.product-image {
  background: rgb(var(--v-theme-surface-variant));
}

.image-zoom {
  transform: scale(1.08);
  transition: transform 0.5s ease;
}

.category-chip {
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.v-btn {
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0;
}

/* Checkbox styling */
:deep(.v-checkbox .v-selection-control) {
  min-height: 32px;
}

/* Range slider styling */
:deep(.v-slider-thumb__label) {
  background: rgb(var(--v-theme-primary)) !important;
}
</style>
