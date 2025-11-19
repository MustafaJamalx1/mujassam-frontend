<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import Button from '@/components/common/Button.vue'
import Card from '@/components/common/Card.vue'
import Input from '@/components/common/Input.vue'

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
  { id: 'standard', name: 'Standard Shipping', price: 5.99, time: '5-7 business days' },
  { id: 'express', name: 'Express Shipping', price: 12.99, time: '2-3 business days' },
  { id: 'overnight', name: 'Overnight', price: 24.99, time: '1 business day' }
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
  <div class="bg-gray-50 min-h-screen py-8">
    <div class="container-app">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <!-- Progress Steps -->
      <div class="flex items-center justify-center mb-8">
        <div
          v-for="step in 3"
          :key="step"
          class="flex items-center"
        >
          <div
            :class="[
              'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
              currentStep >= step
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-600'
            ]"
          >
            {{ step }}
          </div>
          <span
            :class="[
              'ml-2 text-sm',
              currentStep >= step ? 'text-gray-900' : 'text-gray-500'
            ]"
          >
            {{ step === 1 ? 'Shipping' : step === 2 ? 'Payment' : 'Review' }}
          </span>
          <div
            v-if="step < 3"
            :class="[
              'w-16 h-0.5 mx-4',
              currentStep > step ? 'bg-primary-600' : 'bg-gray-200'
            ]"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Form Steps -->
        <div class="lg:col-span-2">
          <!-- Step 1: Shipping -->
          <Card v-if="currentStep === 1" padding="md">
            <h2 class="font-semibold text-lg mb-4">Shipping Information</h2>

            <div class="grid grid-cols-2 gap-4 mb-6">
              <Input
                v-model="shippingInfo.firstName"
                label="First Name"
                required
              />
              <Input
                v-model="shippingInfo.lastName"
                label="Last Name"
                required
              />
              <Input
                v-model="shippingInfo.email"
                label="Email"
                type="email"
                required
              />
              <Input
                v-model="shippingInfo.phone"
                label="Phone"
                type="tel"
              />
              <div class="col-span-2">
                <Input
                  v-model="shippingInfo.address"
                  label="Address"
                  required
                />
              </div>
              <Input
                v-model="shippingInfo.city"
                label="City"
                required
              />
              <Input
                v-model="shippingInfo.postalCode"
                label="Postal Code"
                required
              />
              <div class="col-span-2">
                <Input
                  v-model="shippingInfo.country"
                  label="Country"
                  required
                />
              </div>
            </div>

            <h3 class="font-medium mb-3">Shipping Method</h3>
            <div class="space-y-2 mb-6">
              <label
                v-for="method in shippingMethods"
                :key="method.id"
                :class="[
                  'flex items-center justify-between p-3 border rounded-lg cursor-pointer',
                  shippingMethod === method.id
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200'
                ]"
              >
                <div class="flex items-center">
                  <input
                    v-model="shippingMethod"
                    type="radio"
                    :value="method.id"
                    class="text-primary-600"
                  />
                  <div class="ml-3">
                    <p class="font-medium text-sm">{{ method.name }}</p>
                    <p class="text-xs text-gray-500">{{ method.time }}</p>
                  </div>
                </div>
                <span class="font-medium">${{ method.price }}</span>
              </label>
            </div>

            <Button variant="primary" fullWidth @click="nextStep">
              Continue to Payment
            </Button>
          </Card>

          <!-- Step 2: Payment -->
          <Card v-if="currentStep === 2" padding="md">
            <h2 class="font-semibold text-lg mb-4">Payment Information</h2>

            <div class="space-y-4 mb-6">
              <Input
                v-model="paymentInfo.cardNumber"
                label="Card Number"
                placeholder="1234 5678 9012 3456"
                required
              />
              <Input
                v-model="paymentInfo.cardName"
                label="Name on Card"
                required
              />
              <div class="grid grid-cols-2 gap-4">
                <Input
                  v-model="paymentInfo.expiry"
                  label="Expiry Date"
                  placeholder="MM/YY"
                  required
                />
                <Input
                  v-model="paymentInfo.cvv"
                  label="CVV"
                  placeholder="123"
                  required
                />
              </div>
            </div>

            <div class="flex gap-4">
              <Button variant="outline" fullWidth @click="prevStep">
                Back
              </Button>
              <Button variant="primary" fullWidth @click="nextStep">
                Review Order
              </Button>
            </div>
          </Card>

          <!-- Step 3: Review -->
          <Card v-if="currentStep === 3" padding="md">
            <h2 class="font-semibold text-lg mb-4">Review Your Order</h2>

            <!-- Shipping Summary -->
            <div class="mb-4 pb-4 border-b">
              <h3 class="font-medium text-sm text-gray-500 mb-2">Shipping To</h3>
              <p class="text-sm">
                {{ shippingInfo.firstName }} {{ shippingInfo.lastName }}<br />
                {{ shippingInfo.address }}<br />
                {{ shippingInfo.city }}, {{ shippingInfo.postalCode }}<br />
                {{ shippingInfo.country }}
              </p>
            </div>

            <!-- Items -->
            <div class="mb-4 pb-4 border-b">
              <h3 class="font-medium text-sm text-gray-500 mb-2">Items</h3>
              <div
                v-for="item in cartStore.items"
                :key="item.id"
                class="flex justify-between text-sm py-2"
              >
                <span>{{ item.name }} x {{ item.quantity }}</span>
                <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
            </div>

            <div class="flex gap-4">
              <Button variant="outline" fullWidth @click="prevStep">
                Back
              </Button>
              <Button
                variant="primary"
                fullWidth
                :loading="isProcessing"
                @click="processPayment"
              >
                Place Order
              </Button>
            </div>
          </Card>
        </div>

        <!-- Order Summary -->
        <div>
          <Card padding="md">
            <h2 class="font-semibold text-lg mb-4">Order Summary</h2>

            <div class="space-y-2 mb-4 text-sm">
              <div
                v-for="item in cartStore.items"
                :key="item.id"
                class="flex justify-between"
              >
                <span class="text-gray-600">{{ item.name }} x {{ item.quantity }}</span>
                <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
            </div>

            <div class="border-t pt-4 space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal</span>
                <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Shipping</span>
                <span>${{ selectedShippingPrice().toFixed(2) }}</span>
              </div>
            </div>

            <div class="border-t mt-4 pt-4">
              <div class="flex justify-between font-semibold">
                <span>Total</span>
                <span class="text-primary-600">
                  ${{ (cartStore.totalPrice + selectedShippingPrice()).toFixed(2) }}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
