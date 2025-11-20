<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

const currentStep = ref(1)
const isProcessing = ref(false)

const shippingInfo = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  country: '',
  postalCode: ''
})

const paymentInfo = ref({
  cardNumber: '',
  cardName: '',
  expiry: '',
  cvv: ''
})

const shippingMethod = ref('standard')

const shippingMethods = [
  { id: 'standard', name: 'Standard Shipping', price: 5.99, time: '5-7 business days', icon: 'mdi-truck' },
  { id: 'express', name: 'Express Shipping', price: 12.99, time: '2-3 business days', icon: 'mdi-truck-fast' },
  { id: 'overnight', name: 'Overnight', price: 24.99, time: '1 business day', icon: 'mdi-lightning-bolt' }
]

const selectedShippingPrice = () => {
  return shippingMethods.find(m => m.id === shippingMethod.value)?.price || 0
}

function nextStep() {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

async function processPayment() {
  isProcessing.value = true

  // Simulate payment processing
  await new Promise(resolve => setTimeout(resolve, 2000))

  // TODO: Implement actual payment processing
  alert('Order placed successfully!')
  cartStore.clearCart()

  isProcessing.value = false
}
</script>

<template>
  <v-container class="py-6 py-md-10">
    <h1 class="text-h4 text-md-h3 font-weight-bold mb-6 mb-md-8">Checkout</h1>

    <!-- Progress Steps -->
    <v-stepper
      v-model="currentStep"
      alt-labels
      flat
      class="mb-8 bg-transparent stepper-custom"
    >
      <v-stepper-header>
        <v-stepper-item
          :complete="currentStep > 1"
          :value="1"
          title="Shipping"
          icon="mdi-truck"
        ></v-stepper-item>
        <v-divider></v-divider>
        <v-stepper-item
          :complete="currentStep > 2"
          :value="2"
          title="Payment"
          icon="mdi-credit-card"
        ></v-stepper-item>
        <v-divider></v-divider>
        <v-stepper-item
          :value="3"
          title="Review"
          icon="mdi-check-circle"
        ></v-stepper-item>
      </v-stepper-header>
    </v-stepper>

    <v-row>
      <!-- Form Steps -->
      <v-col cols="12" lg="8">
        <!-- Step 1: Shipping -->
        <v-card v-if="currentStep === 1" rounded="xl" elevation="0" class="step-card">
          <v-card-text class="pa-5 pa-md-6">
            <h2 class="text-h6 font-weight-bold mb-5">
              <v-icon start color="primary">mdi-map-marker</v-icon>
              Shipping Information
            </h2>

            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="shippingInfo.firstName"
                  label="First Name"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="shippingInfo.lastName"
                  label="Last Name"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="shippingInfo.email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="shippingInfo.phone"
                  label="Phone"
                  type="tel"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="shippingInfo.address"
                  label="Address"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="shippingInfo.city"
                  label="City"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="shippingInfo.postalCode"
                  label="Postal Code"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="shippingInfo.country"
                  label="Country"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <h3 class="text-subtitle-1 font-weight-bold mt-6 mb-4">
              <v-icon start color="primary" size="20">mdi-truck-delivery</v-icon>
              Shipping Method
            </h3>
            <v-radio-group v-model="shippingMethod" hide-details>
              <v-card
                v-for="method in shippingMethods"
                :key="method.id"
                :variant="shippingMethod === method.id ? 'tonal' : 'outlined'"
                :color="shippingMethod === method.id ? 'primary' : undefined"
                rounded="lg"
                class="mb-2 shipping-method-card"
                @click="shippingMethod = method.id"
              >
                <v-card-text class="d-flex align-center justify-space-between py-3 px-4">
                  <div class="d-flex align-center">
                    <v-radio :value="method.id" hide-details></v-radio>
                    <v-icon :icon="method.icon" class="ml-2 mr-3" size="20"></v-icon>
                    <div>
                      <p class="text-body-1 font-weight-medium mb-0">{{ method.name }}</p>
                      <p class="text-body-2 text-medium-emphasis mb-0">{{ method.time }}</p>
                    </div>
                  </div>
                  <span class="text-body-1 font-weight-bold">${{ method.price }}</span>
                </v-card-text>
              </v-card>
            </v-radio-group>

            <v-btn
              color="primary"
              size="large"
              block
              rounded="lg"
              class="mt-6 action-btn"
              @click="nextStep"
            >
              Continue to Payment
              <v-icon end>mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>

        <!-- Step 2: Payment -->
        <v-card v-if="currentStep === 2" rounded="xl" elevation="0" class="step-card">
          <v-card-text class="pa-5 pa-md-6">
            <h2 class="text-h6 font-weight-bold mb-5">
              <v-icon start color="primary">mdi-credit-card</v-icon>
              Payment Information
            </h2>

            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="paymentInfo.cardNumber"
                  label="Card Number"
                  placeholder="1234 5678 9012 3456"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  prepend-inner-icon="mdi-credit-card-outline"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="paymentInfo.cardName"
                  label="Name on Card"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  prepend-inner-icon="mdi-account-outline"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="paymentInfo.expiry"
                  label="Expiry Date"
                  placeholder="MM/YY"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  prepend-inner-icon="mdi-calendar"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="paymentInfo.cvv"
                  label="CVV"
                  placeholder="123"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  prepend-inner-icon="mdi-lock-outline"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row class="mt-4">
              <v-col cols="6">
                <v-btn
                  variant="outlined"
                  size="large"
                  block
                  rounded="lg"
                  @click="prevStep"
                >
                  <v-icon start>mdi-arrow-left</v-icon>
                  Back
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn
                  color="primary"
                  size="large"
                  block
                  rounded="lg"
                  class="action-btn"
                  @click="nextStep"
                >
                  Review Order
                  <v-icon end>mdi-arrow-right</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Step 3: Review -->
        <v-card v-if="currentStep === 3" rounded="xl" elevation="0" class="step-card">
          <v-card-text class="pa-5 pa-md-6">
            <h2 class="text-h6 font-weight-bold mb-5">
              <v-icon start color="primary">mdi-clipboard-check</v-icon>
              Review Your Order
            </h2>

            <!-- Shipping Summary -->
            <v-card variant="flat" rounded="lg" class="bg-grey-lighten-4 mb-4">
              <v-card-text class="pa-4">
                <div class="d-flex align-center mb-2">
                  <v-icon size="18" color="primary" class="mr-2">mdi-map-marker</v-icon>
                  <span class="text-body-2 font-weight-bold text-uppercase" style="letter-spacing: 0.5px;">Shipping To</span>
                </div>
                <p class="text-body-1 mb-0">
                  {{ shippingInfo.firstName }} {{ shippingInfo.lastName }}<br />
                  {{ shippingInfo.address }}<br />
                  {{ shippingInfo.city }}, {{ shippingInfo.postalCode }}<br />
                  {{ shippingInfo.country }}
                </p>
              </v-card-text>
            </v-card>

            <!-- Items -->
            <v-card variant="flat" rounded="lg" class="bg-grey-lighten-4 mb-4">
              <v-card-text class="pa-4">
                <div class="d-flex align-center mb-3">
                  <v-icon size="18" color="primary" class="mr-2">mdi-package-variant</v-icon>
                  <span class="text-body-2 font-weight-bold text-uppercase" style="letter-spacing: 0.5px;">Items</span>
                </div>
                <div
                  v-for="item in cartStore.items"
                  :key="item.id"
                  class="d-flex justify-space-between text-body-1 py-2"
                >
                  <span>{{ item.name }} x {{ item.quantity }}</span>
                  <span class="font-weight-medium">${{ (item.price * item.quantity).toFixed(2) }}</span>
                </div>
              </v-card-text>
            </v-card>

            <v-row class="mt-6">
              <v-col cols="6">
                <v-btn
                  variant="outlined"
                  size="large"
                  block
                  rounded="lg"
                  @click="prevStep"
                >
                  <v-icon start>mdi-arrow-left</v-icon>
                  Back
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn
                  color="primary"
                  size="large"
                  block
                  rounded="lg"
                  :loading="isProcessing"
                  class="action-btn"
                  @click="processPayment"
                >
                  <v-icon start>mdi-check</v-icon>
                  Place Order
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Order Summary -->
      <v-col cols="12" lg="4">
        <v-card rounded="xl" elevation="0" class="summary-card sticky-summary">
          <v-card-text class="pa-5">
            <h2 class="text-h6 font-weight-bold mb-5">Order Summary</h2>

            <div class="d-flex flex-column ga-2 mb-4">
              <div
                v-for="item in cartStore.items"
                :key="item.id"
                class="d-flex justify-space-between text-body-2"
              >
                <span class="text-medium-emphasis">{{ item.name }} x {{ item.quantity }}</span>
                <span class="font-weight-medium">${{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
            </div>

            <v-divider class="mb-4"></v-divider>

            <div class="d-flex flex-column ga-2 text-body-1">
              <div class="d-flex justify-space-between">
                <span class="text-medium-emphasis">Subtotal</span>
                <span class="font-weight-medium">${{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>
              <div class="d-flex justify-space-between">
                <span class="text-medium-emphasis">Shipping</span>
                <span class="font-weight-medium">${{ selectedShippingPrice().toFixed(2) }}</span>
              </div>
            </div>

            <v-divider class="my-4"></v-divider>

            <div class="d-flex justify-space-between">
              <span class="text-h6 font-weight-bold">Total</span>
              <span class="text-h5 font-weight-bold text-primary">
                ${{ (cartStore.totalPrice + selectedShippingPrice()).toFixed(2) }}
              </span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.stepper-custom :deep(.v-stepper-item) {
  opacity: 1;
}

.step-card {
  border: 1px solid rgba(var(--v-border-color), 0.08);
}

.shipping-method-card {
  cursor: pointer;
  transition: all 0.2s ease;
}

.summary-card {
  background: rgb(var(--v-theme-surface-variant));
}

.sticky-summary {
  position: sticky;
  top: 80px;
}

.action-btn {
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0;
}
</style>
