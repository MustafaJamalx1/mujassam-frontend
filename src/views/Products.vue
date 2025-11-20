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
              <div class="section-badge glass d-inline-flex align-center px-4 py-2 rounded-pill">
                <v-icon size="18" class="mr-2" style="color: #06b6d4;">mdi-cube-outline</v-icon>
                <span class="text-body-2 font-weight-bold" style="color: #0f172a;">Shop</span>
              </div>
            </div>
            <h1 class="text-h3 text-md-h2 font-weight-bold mb-2" style="font-family: var(--font-display); letter-spacing: -0.02em; color: #0f172a;">
              3D Printed <span class="text-gradient">Collection</span>
            </h1>
            <p class="text-body-1" style="color: #64748b;">Discover premium 3D printed designs crafted with precision</p>
          </div>
          
          <div class="d-flex align-center ga-2 ga-md-3 flex-wrap">
            <!-- Search -->
            <div class="search-wrapper">
              <v-text-field
                v-model="searchQuery"
                prepend-inner-icon="mdi-magnify"
                placeholder="Search products..."
                variant="solo"
                density="comfortable"
                hide-details
                rounded="xl"
                single-line
                class="search-field glass-card"
                style="min-width: 220px; max-width: 300px;"
              ></v-text-field>
            </div>

            <!-- View toggle -->
            <div class="view-toggle glass-card pa-1 rounded-xl">
              <v-btn-toggle
                v-model="viewMode"
                mandatory
                density="comfortable"
                color="primary"
                class="view-toggle-group"
              >
                <v-btn value="grid" icon size="small" rounded="lg">
                  <v-icon size="20">mdi-view-grid</v-icon>
                </v-btn>
                <v-btn value="list" icon size="small" rounded="lg">
                  <v-icon size="20">mdi-view-list</v-icon>
                </v-btn>
              </v-btn-toggle>
            </div>

            <!-- Filter toggle (mobile) -->
            <v-btn
              class="d-md-none glass-card"
              @click="drawer = true"
              icon
              rounded="xl"
              style="border: 2px solid #06b6d4; color: #0891b2;"
            >
              <v-icon>mdi-filter-variant</v-icon>
            </v-btn>
          </div>
        </div>
      </div>

      <v-row>
        <!-- Filters Sidebar (Desktop) -->
        <v-col cols="12" md="3" class="d-none d-md-block">
        <div class="filters-sidebar glass-card pa-6 rounded-xl sticky-filter">
          <div class="d-flex align-center justify-space-between mb-5">
            <h3 class="text-h6 font-weight-bold" style="font-family: var(--font-display); color: #0f172a;">
              <v-icon start size="22" style="color: #06b6d4;">mdi-filter-variant</v-icon>
              Filters
            </h3>
          </div>
          
          <v-divider class="mb-5" style="border-color: rgba(203, 213, 225, 0.3);"></v-divider>
          
          <!-- Categories -->
          <div class="filter-section mb-6">
            <p class="text-body-2 font-weight-bold mb-4" style="color: #475569; letter-spacing: 0.5px; text-transform: uppercase;">
              Category
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
                  color="#06b6d4"
                  class="custom-checkbox"
                ></v-checkbox>
              </div>
            </div>
          </div>

          <!-- Price Range -->
          <div class="filter-section mb-6">
            <p class="text-body-2 font-weight-bold mb-5" style="color: #475569; letter-spacing: 0.5px; text-transform: uppercase;">
              Price Range
            </p>
            <v-range-slider
              v-model="priceRange"
              :min="0"
              :max="100"
              :step="5"
              thumb-label="always"
              color="#06b6d4"
              track-color="#e2e8f0"
              hide-details
              class="mt-6 custom-slider"
            ></v-range-slider>
            <div class="d-flex justify-space-between mt-4">
              <div class="price-badge glass pa-3 rounded-lg">
                <span class="text-caption font-weight-medium" style="color: #64748b;">Min</span>
                <div class="text-body-1 font-weight-bold text-gradient-primary">${{ priceRange[0] }}</div>
              </div>
              <div class="price-badge glass pa-3 rounded-lg">
                <span class="text-caption font-weight-medium" style="color: #64748b;">Max</span>
                <div class="text-body-1 font-weight-bold text-gradient-primary">${{ priceRange[1] }}</div>
              </div>
            </div>
          </div>

          <v-btn
            block
            rounded="xl"
            size="large"
            class="clear-btn"
            style="background: linear-gradient(135deg, #f43f5e15, #a855f715); color: #f43f5e; font-weight: 700; text-transform: none; border: 2px solid #f43f5e20;"
            @click="clearFilters"
          >
            <v-icon start>mdi-refresh</v-icon>
            Clear Filters
          </v-btn>
        </div>
      </v-col>

      <!-- Products Grid -->
      <v-col cols="12" md="9">
        <!-- Results count -->
        <div class="results-bar glass pa-4 rounded-xl mb-5 d-flex align-center justify-space-between">
          <p class="text-body-2 mb-0" style="color: #64748b;">
            Showing <span class="font-weight-bold text-gradient-primary">{{ placeholderProducts.length }}</span> products
          </p>
          <v-chip 
            size="small" 
            class="glass"
            style="border: 1px solid rgba(6, 182, 212, 0.2);"
          >
            <v-icon start size="16" style="color: #06b6d4;">mdi-check-circle</v-icon>
            <span style="color: #0f172a; font-weight: 600;">In Stock</span>
          </v-chip>
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
              <div class="product-card glass-card h-100">
                <div class="product-image-wrapper position-relative">
                  <div class="product-image-container">
                    <v-img
                      :src="product.image"
                      height="240"
                      cover
                      class="product-image"
                    >
                      <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height gradient-mesh">
                          <v-icon size="64" style="color: #06b6d4; opacity: 0.3;">mdi-cube-outline</v-icon>
                        </div>
                      </template>
                    </v-img>
                  </div>
                  
                  <!-- Category badge -->
                  <v-chip
                    class="category-badge glass"
                    size="small"
                    style="position: absolute; top: 12px; left: 12px; font-weight: 700; border: 1px solid rgba(255, 255, 255, 0.3);"
                  >
                    {{ product.category }}
                  </v-chip>
                  
                  <!-- Quick actions -->
                  <div class="quick-actions">
                    <v-btn
                      icon
                      size="small"
                      class="glass"
                      style="border: 1px solid rgba(255, 255, 255, 0.3);"
                    >
                      <v-icon size="18" style="color: #06b6d4;">mdi-heart-outline</v-icon>
                    </v-btn>
                  </div>
                </div>
                
                <div class="product-content pa-5">
                  <h3 class="text-subtitle-1 font-weight-bold mb-2" style="color: #0f172a; font-family: var(--font-display); line-height: 1.3;">
                    {{ product.name }}
                  </h3>
                  
                  <div class="d-flex align-center justify-space-between mb-4">
                    <div class="text-h6 font-weight-bold text-gradient-primary">
                      ${{ product.price }}
                    </div>
                    <v-chip size="x-small" class="glass" style="border: 1px solid rgba(16, 185, 129, 0.2);">
                      <v-icon start size="12" style="color: #10b981;">mdi-check-circle</v-icon>
                      <span style="color: #10b981; font-weight: 700;">Ready</span>
                    </v-chip>
                  </div>
                  
                  <v-btn
                    block
                    rounded="xl"
                    class="add-to-cart-btn"
                    style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; font-weight: 700; text-transform: none; box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);"
                  >
                    <v-icon start size="20">mdi-cart-plus</v-icon>
                    Add to Cart
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
