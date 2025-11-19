<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import Button from '@/components/common/Button.vue'
import Card from '@/components/common/Card.vue'

const route = useRoute()
const cartStore = useCartStore()

const quantity = ref(1)
const selectedMaterial = ref('PLA')

// Placeholder product data
const product = ref({
  id: route.params.id,
  name: 'Dragon Figurine',
  price: 29.99,
  description: 'A beautifully detailed dragon figurine, perfect for display or as a unique gift. Printed with high precision for intricate details.',
  category: 'Figurines',
  materials: ['PLA', 'ABS', 'PETG'],
  dimensions: { width: 10, height: 15, depth: 8 },
  printTime: '8 hours',
  images: []
})

const materials = [
  { name: 'PLA', price: 0, description: 'Eco-friendly, good for display' },
  { name: 'ABS', price: 5, description: 'Durable, heat resistant' },
  { name: 'PETG', price: 8, description: 'Strong and flexible' }
]

function addToCart() {
  const materialExtra = materials.find(m => m.name === selectedMaterial.value)?.price || 0
  cartStore.addItem({
    ...product.value,
    price: product.value.price + materialExtra,
    material: selectedMaterial.value
  }, quantity.value)
}

function incrementQuantity() {
  quantity.value++
}

function decrementQuantity() {
  if (quantity.value > 1) {
    quantity.value--
  }
}
</script>

<template>
  <div class="bg-gray-50 min-h-screen py-8">
    <div class="container-app">
      <!-- Breadcrumb -->
      <nav class="mb-6 text-sm">
        <RouterLink to="/products" class="text-gray-500 hover:text-primary-600">
          Products
        </RouterLink>
        <span class="mx-2 text-gray-400">/</span>
        <span class="text-gray-900">{{ product.name }}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Image Gallery -->
        <div>
          <Card padding="none">
            <div class="aspect-square bg-gray-200 flex items-center justify-center">
              <span class="text-gray-400">3D Preview</span>
            </div>
          </Card>
          <!-- Thumbnails -->
          <div class="grid grid-cols-4 gap-2 mt-4">
            <div v-for="i in 4" :key="i" class="aspect-square bg-gray-200 rounded-lg cursor-pointer hover:ring-2 ring-primary-500" />
          </div>
        </div>

        <!-- Product Info -->
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ product.name }}</h1>
          <p class="text-2xl font-semibold text-primary-600 mb-4">${{ product.price }}</p>
          <p class="text-gray-600 mb-6">{{ product.description }}</p>

          <!-- Specifications -->
          <Card padding="sm" class="mb-6">
            <h3 class="font-semibold mb-3">Specifications</h3>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-gray-500">Dimensions</span>
                <p class="font-medium">{{ product.dimensions.width }} x {{ product.dimensions.height }} x {{ product.dimensions.depth }} cm</p>
              </div>
              <div>
                <span class="text-gray-500">Print Time</span>
                <p class="font-medium">{{ product.printTime }}</p>
              </div>
            </div>
          </Card>

          <!-- Material Selection -->
          <div class="mb-6">
            <h3 class="font-semibold mb-3">Material</h3>
            <div class="space-y-2">
              <label
                v-for="material in materials"
                :key="material.name"
                :class="[
                  'flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors',
                  selectedMaterial === material.name
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                ]"
              >
                <div class="flex items-center">
                  <input
                    v-model="selectedMaterial"
                    type="radio"
                    :value="material.name"
                    class="text-primary-600 focus:ring-primary-500"
                  />
                  <div class="ml-3">
                    <p class="font-medium">{{ material.name }}</p>
                    <p class="text-sm text-gray-500">{{ material.description }}</p>
                  </div>
                </div>
                <span v-if="material.price > 0" class="text-sm font-medium text-gray-600">
                  +${{ material.price }}
                </span>
              </label>
            </div>
          </div>

          <!-- Quantity -->
          <div class="mb-6">
            <h3 class="font-semibold mb-3">Quantity</h3>
            <div class="flex items-center gap-3">
              <button
                class="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                @click="decrementQuantity"
              >
                -
              </button>
              <span class="w-12 text-center font-medium">{{ quantity }}</span>
              <button
                class="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                @click="incrementQuantity"
              >
                +
              </button>
            </div>
          </div>

          <!-- Add to Cart -->
          <Button variant="primary" size="lg" fullWidth @click="addToCart">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
