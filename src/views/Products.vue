<script setup>
import { ref, onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import Card from '@/components/common/Card.vue'
import Input from '@/components/common/Input.vue'
import Button from '@/components/common/Button.vue'

const productsStore = useProductsStore()

const viewMode = ref('grid')
const showFilters = ref(false)

// Placeholder products for development
const placeholderProducts = [
  { id: 1, name: 'Dragon Figurine', price: 29.99, category: 'Figurines', image: '' },
  { id: 2, name: 'Geometric Vase', price: 24.99, category: 'Home Decor', image: '' },
  { id: 3, name: 'Phone Stand', price: 14.99, category: 'Gadgets', image: '' },
  { id: 4, name: 'Abstract Sculpture', price: 49.99, category: 'Art', image: '' },
  { id: 5, name: 'Chess Set', price: 39.99, category: 'Games', image: '' },
  { id: 6, name: 'Desk Organizer', price: 19.99, category: 'Gadgets', image: '' }
]

onMounted(() => {
  productsStore.fetchProducts()
})
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="container-app py-8">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Products</h1>
          <p class="text-gray-600">Browse our collection of 3D printed items</p>
        </div>
        <div class="flex items-center gap-4">
          <!-- Search -->
          <div class="w-64">
            <Input
              v-model="productsStore.filters.searchQuery"
              placeholder="Search products..."
              type="search"
            />
          </div>
          <!-- View toggle -->
          <div class="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              :class="[
                'p-2',
                viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600'
              ]"
              @click="viewMode = 'grid'"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              :class="[
                'p-2',
                viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600'
              ]"
              @click="viewMode = 'list'"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
          <!-- Filter toggle (mobile) -->
          <Button
            variant="outline"
            class="md:hidden"
            @click="showFilters = !showFilters"
          >
            Filters
          </Button>
        </div>
      </div>

      <div class="flex gap-8">
        <!-- Filters Sidebar -->
        <aside
          :class="[
            'w-64 flex-shrink-0',
            showFilters ? 'block' : 'hidden md:block'
          ]"
        >
          <Card padding="md">
            <h3 class="font-semibold mb-4">Filters</h3>

            <!-- Categories -->
            <div class="mb-6">
              <h4 class="text-sm font-medium text-gray-700 mb-2">Category</h4>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="checkbox" class="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  <span class="ml-2 text-sm text-gray-600">Figurines</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" class="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  <span class="ml-2 text-sm text-gray-600">Home Decor</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" class="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  <span class="ml-2 text-sm text-gray-600">Gadgets</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" class="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  <span class="ml-2 text-sm text-gray-600">Art</span>
                </label>
              </div>
            </div>

            <!-- Price Range -->
            <div class="mb-6">
              <h4 class="text-sm font-medium text-gray-700 mb-2">Price Range</h4>
              <div class="flex gap-2">
                <Input placeholder="Min" type="number" />
                <Input placeholder="Max" type="number" />
              </div>
            </div>

            <Button variant="outline" fullWidth @click="productsStore.clearFilters">
              Clear Filters
            </Button>
          </Card>
        </aside>

        <!-- Products Grid -->
        <div class="flex-1">
          <div
            :class="[
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            ]"
          >
            <RouterLink
              v-for="product in placeholderProducts"
              :key="product.id"
              :to="`/products/${product.id}`"
            >
              <Card padding="none" hoverable>
                <div
                  :class="[
                    viewMode === 'grid' ? 'flex-col' : 'flex-row',
                    'flex'
                  ]"
                >
                  <!-- Image -->
                  <div
                    :class="[
                      'bg-gray-200',
                      viewMode === 'grid' ? 'aspect-square' : 'w-32 h-32 flex-shrink-0'
                    ]"
                  />
                  <!-- Info -->
                  <div class="p-4">
                    <h3 class="font-medium text-gray-900">{{ product.name }}</h3>
                    <p class="text-sm text-gray-500 mb-2">{{ product.category }}</p>
                    <p class="font-semibold text-primary-600">${{ product.price }}</p>
                  </div>
                </div>
              </Card>
            </RouterLink>
          </div>

          <!-- Empty State -->
          <div v-if="placeholderProducts.length === 0" class="text-center py-12">
            <p class="text-gray-500">No products found</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
