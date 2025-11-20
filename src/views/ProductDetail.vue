<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'

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
  <v-container class="py-6 py-md-10">
    <!-- Breadcrumb -->
    <v-breadcrumbs class="px-0 mb-4">
      <v-breadcrumbs-item to="/products" class="text-primary">
        <v-icon start size="16">mdi-arrow-left</v-icon>
        Products
      </v-breadcrumbs-item>
      <v-breadcrumbs-divider>/</v-breadcrumbs-divider>
      <v-breadcrumbs-item disabled>{{ product.name }}</v-breadcrumbs-item>
    </v-breadcrumbs>

    <v-row>
      <!-- Image Gallery -->
      <v-col cols="12" lg="6">
        <v-card rounded="xl" elevation="2" class="image-card mb-4">
          <v-img
            height="450"
            class="bg-surface-variant"
          >
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-icon size="80" color="primary" style="opacity: 0.3;">mdi-cube-outline</v-icon>
              </div>
            </template>
          </v-img>
        </v-card>
        <!-- Thumbnails -->
        <v-row dense>
          <v-col v-for="i in 4" :key="i" cols="3">
            <v-card
              rounded="lg"
              elevation="1"
              class="thumbnail-card"
            >
              <v-img
                height="80"
                class="bg-surface-variant"
              >
                <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-icon size="24" color="primary" style="opacity: 0.3;">mdi-cube-outline</v-icon>
                  </div>
                </template>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <!-- Product Info -->
      <v-col cols="12" lg="6">
        <v-chip color="primary" variant="tonal" size="small" class="mb-3">
          {{ product.category }}
        </v-chip>
        <h1 class="text-h4 text-md-h3 font-weight-bold mb-2">{{ product.name }}</h1>
        <p class="text-h4 font-weight-bold text-primary mb-4">${{ product.price }}</p>
        <p class="text-body-1 text-medium-emphasis mb-6" style="line-height: 1.7;">
          {{ product.description }}
        </p>

        <!-- Specifications -->
        <v-card rounded="xl" elevation="1" class="spec-card mb-6">
          <v-card-text class="pa-5">
            <div class="d-flex align-center mb-4">
              <v-icon color="primary" class="mr-2">mdi-ruler</v-icon>
              <h3 class="text-h6 font-weight-bold">Specifications</h3>
            </div>
            <v-row dense>
              <v-col cols="6">
                <p class="text-body-2 text-medium-emphasis mb-1">Dimensions</p>
                <p class="text-body-1 font-weight-medium mb-0">
                  {{ product.dimensions.width }} x {{ product.dimensions.height }} x {{ product.dimensions.depth }} cm
                </p>
              </v-col>
              <v-col cols="6">
                <p class="text-body-2 text-medium-emphasis mb-1">Print Time</p>
                <p class="text-body-1 font-weight-medium mb-0">{{ product.printTime }}</p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Material Selection -->
        <div class="mb-6">
          <h3 class="text-subtitle-1 font-weight-bold mb-3">
            <v-icon start size="20" color="primary">mdi-palette-swatch</v-icon>
            Material
          </h3>
          <v-radio-group v-model="selectedMaterial" hide-details>
            <v-card
              v-for="material in materials"
              :key="material.name"
              :variant="selectedMaterial === material.name ? 'tonal' : 'outlined'"
              :color="selectedMaterial === material.name ? 'primary' : undefined"
              rounded="lg"
              class="mb-2 material-card"
              @click="selectedMaterial = material.name"
            >
              <v-card-text class="d-flex align-center justify-space-between py-3 px-4">
                <div class="d-flex align-center">
                  <v-radio :value="material.name" hide-details></v-radio>
                  <div class="ml-2">
                    <p class="text-body-1 font-weight-medium mb-0">{{ material.name }}</p>
                    <p class="text-body-2 text-medium-emphasis mb-0">{{ material.description }}</p>
                  </div>
                </div>
                <v-chip
                  v-if="material.price > 0"
                  size="small"
                  variant="tonal"
                  color="secondary"
                >
                  +${{ material.price }}
                </v-chip>
              </v-card-text>
            </v-card>
          </v-radio-group>
        </div>

        <!-- Quantity -->
        <div class="mb-6">
          <h3 class="text-subtitle-1 font-weight-bold mb-3">
            <v-icon start size="20" color="primary">mdi-numeric</v-icon>
            Quantity
          </h3>
          <div class="d-flex align-center ga-3">
            <v-btn
              icon
              variant="tonal"
              color="primary"
              size="small"
              @click="decrementQuantity"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <span class="text-h5 font-weight-bold" style="min-width: 48px; text-align: center;">
              {{ quantity }}
            </span>
            <v-btn
              icon
              variant="tonal"
              color="primary"
              size="small"
              @click="incrementQuantity"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
        </div>

        <!-- Add to Cart -->
        <v-btn
          color="primary"
          size="x-large"
          block
          rounded="lg"
          elevation="4"
          class="add-to-cart-btn"
          @click="addToCart"
        >
          <v-icon start size="24">mdi-cart-plus</v-icon>
          Add to Cart
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.image-card {
  border: 1px solid rgba(var(--v-border-color), 0.08);
  overflow: hidden;
}

.thumbnail-card {
  border: 2px solid rgba(var(--v-border-color), 0.12);
  cursor: pointer;
  transition: all 0.3s ease;
}

.thumbnail-card:hover {
  border-color: rgb(var(--v-theme-primary));
  transform: translateY(-2px);
}

.spec-card {
  border: 1px solid rgba(var(--v-border-color), 0.08);
}

.material-card {
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid rgba(var(--v-border-color), 0.12);
}

.material-card:hover {
  transform: translateY(-1px);
}

.add-to-cart-btn {
  text-transform: none;
  font-weight: 700;
  letter-spacing: 0.5px;
  transition: transform 0.2s ease;
}

.add-to-cart-btn:hover {
  transform: translateY(-2px);
}

:deep(.v-btn) {
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0;
}
</style>
