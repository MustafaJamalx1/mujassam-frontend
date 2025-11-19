<script setup>
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import Button from '@/components/common/Button.vue'
import Card from '@/components/common/Card.vue'

const cartStore = useCartStore()

function updateQuantity(productId, newQuantity) {
  cartStore.updateQuantity(productId, newQuantity)
}

function removeItem(productId) {
  cartStore.removeItem(productId)
}
</script>

<template>
  <div class="bg-gray-50 min-h-screen py-8">
    <div class="container-app">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div v-if="cartStore.items.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          <Card
            v-for="item in cartStore.items"
            :key="item.id"
            padding="md"
          >
            <div class="flex gap-4">
              <!-- Image -->
              <div class="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0" />

              <!-- Info -->
              <div class="flex-1">
                <div class="flex justify-between">
                  <div>
                    <h3 class="font-medium text-gray-900">{{ item.name }}</h3>
                    <p v-if="item.material" class="text-sm text-gray-500">
                      Material: {{ item.material }}
                    </p>
                  </div>
                  <p class="font-semibold text-primary-600">
                    ${{ (item.price * item.quantity).toFixed(2) }}
                  </p>
                </div>

                <div class="flex items-center justify-between mt-4">
                  <!-- Quantity -->
                  <div class="flex items-center gap-2">
                    <button
                      class="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                      @click="updateQuantity(item.id, item.quantity - 1)"
                    >
                      -
                    </button>
                    <span class="w-8 text-center">{{ item.quantity }}</span>
                    <button
                      class="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                      @click="updateQuantity(item.id, item.quantity + 1)"
                    >
                      +
                    </button>
                  </div>

                  <!-- Remove -->
                  <button
                    class="text-sm text-red-600 hover:text-red-700"
                    @click="removeItem(item.id)"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <!-- Order Summary -->
        <div>
          <Card padding="md">
            <h2 class="font-semibold text-lg mb-4">Order Summary</h2>

            <div class="space-y-3 mb-4">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Subtotal</span>
                <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div class="border-t pt-4 mb-6">
              <div class="flex justify-between font-semibold">
                <span>Total</span>
                <span class="text-primary-600">${{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>
            </div>

            <RouterLink to="/checkout">
              <Button variant="primary" size="lg" fullWidth>
                Proceed to Checkout
              </Button>
            </RouterLink>

            <RouterLink
              to="/products"
              class="block text-center text-sm text-primary-600 hover:text-primary-700 mt-4"
            >
              Continue Shopping
            </RouterLink>
          </Card>
        </div>
      </div>

      <!-- Empty Cart -->
      <div v-else class="text-center py-16">
        <div class="text-6xl mb-4">🛒</div>
        <h2 class="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
        <p class="text-gray-600 mb-6">Add some items to get started</p>
        <RouterLink to="/products">
          <Button variant="primary">
            Browse Products
          </Button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
