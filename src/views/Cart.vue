<script setup>
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

function updateQuantity(productId, newQuantity) {
  cartStore.updateQuantity(productId, newQuantity)
}

function removeItem(productId) {
  cartStore.removeItem(productId)
}
</script>

<template>
  <v-container class="py-6 py-md-10">
    <h1 class="text-h4 text-md-h3 font-weight-bold mb-6 mb-md-8">Shopping Cart</h1>

    <div v-if="cartStore.items.length > 0">
      <v-row>
        <!-- Cart Items -->
        <v-col cols="12" lg="8">
          <div class="d-flex flex-column ga-3">
            <v-card
              v-for="item in cartStore.items"
              :key="item.id"
              rounded="xl"
              elevation="0"
              class="cart-item-card"
            >
              <v-card-text class="pa-4">
                <div class="d-flex ga-4">
                  <!-- Image -->
                  <v-img
                    width="100"
                    height="100"
                    class="bg-surface-variant rounded-lg flex-shrink-0"
                  >
                    <template v-slot:placeholder>
                      <div class="d-flex align-center justify-center fill-height">
                        <v-icon size="32" color="primary" style="opacity: 0.3;">mdi-cube-outline</v-icon>
                      </div>
                    </template>
                  </v-img>

                  <!-- Info -->
                  <div class="flex-grow-1">
                    <div class="d-flex justify-space-between align-start">
                      <div>
                        <h3 class="text-subtitle-1 font-weight-semibold mb-1">{{ item.name }}</h3>
                        <v-chip
                          v-if="item.material"
                          size="x-small"
                          variant="tonal"
                          color="primary"
                        >
                          {{ item.material }}
                        </v-chip>
                      </div>
                      <p class="text-h6 font-weight-bold text-primary">
                        ${{ (item.price * item.quantity).toFixed(2) }}
                      </p>
                    </div>

                    <div class="d-flex align-center justify-space-between mt-4">
                      <!-- Quantity -->
                      <div class="d-flex align-center ga-2">
                        <v-btn
                          icon
                          variant="tonal"
                          size="x-small"
                          @click="updateQuantity(item.id, item.quantity - 1)"
                        >
                          <v-icon size="16">mdi-minus</v-icon>
                        </v-btn>
                        <span class="text-body-1 font-weight-medium" style="min-width: 32px; text-align: center;">
                          {{ item.quantity }}
                        </span>
                        <v-btn
                          icon
                          variant="tonal"
                          size="x-small"
                          @click="updateQuantity(item.id, item.quantity + 1)"
                        >
                          <v-icon size="16">mdi-plus</v-icon>
                        </v-btn>
                      </div>

                      <!-- Remove -->
                      <v-btn
                        variant="text"
                        color="error"
                        size="small"
                        class="text-none"
                        @click="removeItem(item.id)"
                      >
                        <v-icon start size="16">mdi-delete-outline</v-icon>
                        Remove
                      </v-btn>
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </v-col>

        <!-- Order Summary -->
        <v-col cols="12" lg="4">
          <v-card rounded="xl" elevation="0" class="summary-card sticky-summary">
            <v-card-text class="pa-5">
              <h2 class="text-h6 font-weight-bold mb-5">Order Summary</h2>

              <div class="d-flex flex-column ga-3 mb-4">
                <div class="d-flex justify-space-between text-body-1">
                  <span class="text-medium-emphasis">Subtotal</span>
                  <span class="font-weight-medium">${{ cartStore.totalPrice.toFixed(2) }}</span>
                </div>
                <div class="d-flex justify-space-between text-body-1">
                  <span class="text-medium-emphasis">Shipping</span>
                  <span class="text-body-2">Calculated at checkout</span>
                </div>
              </div>

              <v-divider class="mb-4"></v-divider>

              <div class="d-flex justify-space-between mb-6">
                <span class="text-h6 font-weight-bold">Total</span>
                <span class="text-h5 font-weight-bold text-primary">${{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>

              <v-btn
                color="primary"
                size="x-large"
                block
                rounded="lg"
                to="/checkout"
                elevation="4"
                class="checkout-btn mb-3"
              >
                <v-icon start>mdi-lock</v-icon>
                Proceed to Checkout
              </v-btn>

              <v-btn
                variant="text"
                color="primary"
                block
                to="/products"
                class="text-none"
              >
                <v-icon start size="18">mdi-arrow-left</v-icon>
                Continue Shopping
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Empty Cart -->
    <v-card v-else variant="flat" class="text-center py-16 bg-transparent">
      <v-avatar color="surface-variant" size="120" class="mb-6">
        <v-icon icon="mdi-cart-outline" size="64" color="primary" style="opacity: 0.5;"></v-icon>
      </v-avatar>
      <h2 class="text-h5 font-weight-bold mb-2">Your cart is empty</h2>
      <p class="text-body-1 text-medium-emphasis mb-6">Add some items to get started</p>
      <v-btn color="primary" size="x-large" rounded="lg" to="/products" class="text-none" elevation="2">
        <v-icon start>mdi-shopping</v-icon>
        Browse Products
      </v-btn>
    </v-card>
  </v-container>
</template>

<style scoped>
.cart-item-card {
  border: 1px solid rgba(var(--v-border-color), 0.08);
  transition: all 0.3s ease;
}

.cart-item-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-color: rgb(var(--v-theme-primary));
}

.summary-card {
  border: 1px solid rgba(var(--v-border-color), 0.08);
}

.sticky-summary {
  position: sticky;
  top: 80px;
}

.checkout-btn {
  text-transform: none;
  font-weight: 700;
  letter-spacing: 0.5px;
  transition: transform 0.2s ease;
}

.checkout-btn:hover {
  transform: translateY(-2px);
}

:deep(.v-btn) {
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0;
}
</style>
