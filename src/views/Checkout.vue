<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const cartStore = useCartStore()

const currentStep = ref(1)
const orderPlaced = ref(false)

const shipping = ref({
  firstName: '', lastName: '',
  email: '', phone: '',
  address: '', city: '', state: '', zip: '', country: 'Saudi Arabia',
})

const payment = ref({
  cardNumber: '', cardName: '', expiry: '', cvv: '',
})

const countries = ['Saudi Arabia', 'UAE', 'Kuwait', 'Qatar', 'Bahrain', 'Egypt', 'Jordan']

const subtotal = computed(() => cartStore.totalPrice)
const shippingCost = computed(() => subtotal.value >= 50 ? 0 : 8.99)
const total = computed(() => subtotal.value + shippingCost.value)

const steps = [
  { n: 1, label: 'Shipping' },
  { n: 2, label: 'Payment' },
  { n: 3, label: 'Confirm' },
]

function shippingValid() {
  const s = shipping.value
  return s.firstName && s.lastName && s.email && s.address && s.city && s.country
}

function paymentValid() {
  const p = payment.value
  return p.cardNumber.replace(/\s/g, '').length === 16 && p.cardName && p.expiry && p.cvv.length >= 3
}

function nextStep() {
  if (currentStep.value === 1 && shippingValid()) currentStep.value = 2
  if (currentStep.value === 2 && paymentValid()) currentStep.value = 3
}

function placeOrder() {
  orderPlaced.value = true
  cartStore.clearCart()
}

function formatCard(v) {
  const digits = v.replace(/\D/g, '').slice(0, 16)
  return digits.replace(/(.{4})/g, '$1 ').trim()
}
function formatExpiry(v) {
  const digits = v.replace(/\D/g, '').slice(0, 4)
  if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2)
  return digits
}

function onCardInput(e) {
  payment.value.cardNumber = formatCard(e.target.value)
}
function onExpiryInput(e) {
  payment.value.expiry = formatExpiry(e.target.value)
}
</script>

<template>
  <div class="checkout-page">
    <div class="container">

      <!-- Order placed confirmation -->
      <div v-if="orderPlaced" class="confirm-screen">
        <div class="confirm-icon">
          <v-icon size="40" style="color:#fff;">mdi-check</v-icon>
        </div>
        <h1 class="confirm-title">Order placed!</h1>
        <p class="confirm-sub">
          Thank you, {{ shipping.firstName }}. We'll email you at <strong>{{ shipping.email }}</strong>
          once your order is confirmed and printing has started.
        </p>
        <div class="confirm-actions">
          <router-link to="/" class="btn-primary">Back to home</router-link>
          <router-link to="/products" class="btn-ghost">Keep shopping</router-link>
        </div>
      </div>

      <!-- Checkout layout -->
      <div v-else class="checkout-layout">

        <!-- ─── Left: steps ──────────────────────────────────────── -->
        <div class="checkout-main">

          <!-- Page title -->
          <div class="page-head">
            <nav class="breadcrumb">
              <router-link to="/cart" class="bc-link">Cart</router-link>
              <v-icon size="14" class="bc-sep">mdi-chevron-right</v-icon>
              <span class="bc-current">Checkout</span>
            </nav>
            <h1 class="page-title">Checkout</h1>
          </div>

          <!-- Step indicator -->
          <div class="steps-indicator">
            <div
              v-for="step in steps"
              :key="step.n"
              class="step-item"
              :class="{
                'step-item--active': currentStep === step.n,
                'step-item--done': currentStep > step.n,
              }"
            >
              <span class="step-num">
                <v-icon v-if="currentStep > step.n" size="13">mdi-check</v-icon>
                <span v-else>{{ step.n }}</span>
              </span>
              <span class="step-label">{{ step.label }}</span>
            </div>
            <div class="step-connector"></div>
          </div>

          <!-- ─── Step 1: Shipping ──────────────────────────────── -->
          <div v-if="currentStep === 1" class="step-form">
            <h2 class="form-section-title">Shipping information</h2>

            <div class="form-row form-row--2">
              <div class="field-wrap">
                <label class="field-label">First name *</label>
                <input v-model="shipping.firstName" class="field-input" placeholder="Ahmed" />
              </div>
              <div class="field-wrap">
                <label class="field-label">Last name *</label>
                <input v-model="shipping.lastName" class="field-input" placeholder="Al-Rashid" />
              </div>
            </div>
            <div class="form-row form-row--2">
              <div class="field-wrap">
                <label class="field-label">Email address *</label>
                <input v-model="shipping.email" type="email" class="field-input" placeholder="you@example.com" />
              </div>
              <div class="field-wrap">
                <label class="field-label">Phone number</label>
                <input v-model="shipping.phone" class="field-input" placeholder="+966 50 000 0000" />
              </div>
            </div>
            <div class="field-wrap">
              <label class="field-label">Street address *</label>
              <input v-model="shipping.address" class="field-input" placeholder="123 King Fahad Road, Apt 4B" />
            </div>
            <div class="form-row form-row--3">
              <div class="field-wrap">
                <label class="field-label">City *</label>
                <input v-model="shipping.city" class="field-input" placeholder="Riyadh" />
              </div>
              <div class="field-wrap">
                <label class="field-label">State / Province</label>
                <input v-model="shipping.state" class="field-input" placeholder="Riyadh Region" />
              </div>
              <div class="field-wrap">
                <label class="field-label">ZIP / Postal code</label>
                <input v-model="shipping.zip" class="field-input" placeholder="11564" />
              </div>
            </div>
            <div class="field-wrap">
              <label class="field-label">Country *</label>
              <select v-model="shipping.country" class="field-select">
                <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>

            <div class="form-actions">
              <button
                class="btn-primary"
                :disabled="!shippingValid()"
                @click="nextStep"
              >
                Continue to payment
                <v-icon size="16">mdi-arrow-right</v-icon>
              </button>
            </div>
          </div>

          <!-- ─── Step 2: Payment ───────────────────────────────── -->
          <div v-if="currentStep === 2" class="step-form">
            <h2 class="form-section-title">Payment details</h2>
            <p class="form-section-sub">
              <v-icon size="14" style="color: var(--color-muted-light);">mdi-lock-outline</v-icon>
              All transactions are encrypted and secure.
            </p>

            <div class="field-wrap">
              <label class="field-label">Card number *</label>
              <div class="card-input-wrap">
                <input
                  :value="payment.cardNumber"
                  @input="onCardInput"
                  class="field-input"
                  placeholder="1234 5678 9012 3456"
                  maxlength="19"
                />
                <v-icon size="22" class="card-icon">mdi-credit-card-outline</v-icon>
              </div>
            </div>
            <div class="field-wrap">
              <label class="field-label">Name on card *</label>
              <input v-model="payment.cardName" class="field-input" placeholder="Ahmed Al-Rashid" />
            </div>
            <div class="form-row form-row--2">
              <div class="field-wrap">
                <label class="field-label">Expiry date *</label>
                <input
                  :value="payment.expiry"
                  @input="onExpiryInput"
                  class="field-input"
                  placeholder="MM/YY"
                  maxlength="5"
                />
              </div>
              <div class="field-wrap">
                <label class="field-label">CVV *</label>
                <input v-model="payment.cvv" type="password" class="field-input" placeholder="•••" maxlength="4" />
              </div>
            </div>

            <div class="form-actions">
              <button class="btn-ghost" @click="currentStep = 1">
                <v-icon size="16">mdi-arrow-left</v-icon>
                Back
              </button>
              <button
                class="btn-primary"
                :disabled="!paymentValid()"
                @click="nextStep"
              >
                Review order
                <v-icon size="16">mdi-arrow-right</v-icon>
              </button>
            </div>
          </div>

          <!-- ─── Step 3: Confirm ───────────────────────────────── -->
          <div v-if="currentStep === 3" class="step-form">
            <h2 class="form-section-title">Review your order</h2>

            <div class="review-block">
              <div class="review-block-head">
                <span class="review-block-label">Shipping to</span>
                <button class="review-edit" @click="currentStep = 1">Edit</button>
              </div>
              <p class="review-content">
                {{ shipping.firstName }} {{ shipping.lastName }}<br />
                {{ shipping.address }}, {{ shipping.city }}, {{ shipping.country }}
              </p>
            </div>

            <div class="review-block">
              <div class="review-block-head">
                <span class="review-block-label">Payment</span>
                <button class="review-edit" @click="currentStep = 2">Edit</button>
              </div>
              <p class="review-content">
                **** **** **** {{ payment.cardNumber.replace(/\s/g, '').slice(-4) }}
                &nbsp;·&nbsp; {{ payment.expiry }}
              </p>
            </div>

            <div class="review-block">
              <div class="review-block-head">
                <span class="review-block-label">Items ({{ cartStore.itemCount }})</span>
              </div>
              <div class="review-items">
                <div v-for="item in cartStore.items" :key="item.id" class="review-item">
                  <span class="ri-name">{{ item.name }}</span>
                  <span class="ri-qty">× {{ item.quantity }}</span>
                  <span class="ri-price">${{ (item.price * item.quantity).toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <div class="form-actions">
              <button class="btn-ghost" @click="currentStep = 2">
                <v-icon size="16">mdi-arrow-left</v-icon>
                Back
              </button>
              <button class="btn-place" @click="placeOrder">
                <v-icon size="18">mdi-check-circle-outline</v-icon>
                Place order — ${{ total.toFixed(2) }}
              </button>
            </div>
          </div>
        </div>

        <!-- ─── Right: summary ───────────────────────────────────── -->
        <aside class="checkout-summary">
          <h3 class="summary-title">Order summary</h3>

          <div class="summary-items">
            <div v-for="item in cartStore.items" :key="item.id" class="s-item">
              <div class="s-item-info">
                <span class="s-item-name">{{ item.name }}</span>
                <span class="s-item-qty">× {{ item.quantity }}</span>
              </div>
              <span class="s-item-price">${{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>

          <div class="summary-divider"></div>

          <div class="summary-lines">
            <div class="summary-line">
              <span>Subtotal</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="summary-line">
              <span>Shipping</span>
              <span v-if="shippingCost === 0" class="free-label">Free</span>
              <span v-else>${{ shippingCost.toFixed(2) }}</span>
            </div>
            <div class="summary-divider" style="margin: 4px 0;"></div>
            <div class="summary-line summary-line--total">
              <span>Total</span>
              <span>${{ total.toFixed(2) }}</span>
            </div>
          </div>
        </aside>

      </div>
    </div>
  </div>
</template>

<style scoped>
.checkout-page {
  background: var(--color-cream);
  min-height: 100vh;
  padding-top: 64px;
}
.container {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 24px 80px;
}

/* Confirmation screen */
.confirm-screen {
  max-width: 520px;
  margin: 80px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
}
.confirm-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #27795B;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(39,121,91,0.3);
}
.confirm-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-ink);
  letter-spacing: -0.04em;
  margin: 0;
}
.confirm-sub { font-size: 0.95rem; color: var(--color-muted); line-height: 1.7; margin: 0; }
.confirm-actions { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 8px; }

/* Layout */
.checkout-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  align-items: start;
}
@media (min-width: 900px) {
  .checkout-layout { grid-template-columns: 1fr 360px; }
}

/* Main */
.checkout-main { display: flex; flex-direction: column; gap: 0; }

.page-head { padding: 40px 0 32px; }
.breadcrumb { display: flex; align-items: center; gap: 4px; margin-bottom: 10px; }
.bc-link { font-size: 0.8rem; color: var(--color-muted); text-decoration: none; }
.bc-link:hover { color: var(--color-terracotta); }
.bc-sep { color: var(--color-muted-light); }
.bc-current { font-size: 0.8rem; color: var(--color-ink); font-weight: 500; }
.page-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 700;
  color: var(--color-ink);
  letter-spacing: -0.03em;
  margin: 0;
}

/* Steps */
.steps-indicator {
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 40px;
  position: relative;
}
.step-connector {
  position: absolute;
  top: 18px;
  left: 18px;
  right: 18px;
  height: 2px;
  background: var(--color-divider);
  z-index: 0;
}
.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex: 1;
  z-index: 1;
}
.step-num {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid var(--color-divider);
  background: var(--color-cream);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-muted);
  transition: all var(--duration-base);
}
.step-item--active .step-num {
  border-color: var(--color-terracotta);
  background: var(--color-terracotta);
  color: #fff;
  box-shadow: 0 0 0 4px rgba(184,92,56,0.15);
}
.step-item--done .step-num { border-color: #27795B; background: #27795B; color: #fff; }
.step-label { font-size: 0.75rem; font-weight: 600; color: var(--color-muted); }
.step-item--active .step-label { color: var(--color-terracotta); }
.step-item--done .step-label   { color: #27795B; }

/* Form */
.step-form { display: flex; flex-direction: column; gap: 18px; }
.form-section-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-ink);
  letter-spacing: -0.02em;
  margin: 0 0 4px;
}
.form-section-sub {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
  color: var(--color-muted);
  margin: -10px 0 4px;
}

.form-row { display: grid; gap: 14px; }
.form-row--2 { grid-template-columns: repeat(2, 1fr); }
.form-row--3 { grid-template-columns: repeat(3, 1fr); }
@media (max-width: 560px) {
  .form-row--2,
  .form-row--3 { grid-template-columns: 1fr; }
}

.field-wrap { display: flex; flex-direction: column; gap: 6px; }
.field-label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-muted);
}
.field-input,
.field-select {
  padding: 10px 14px;
  border: 1.5px solid var(--color-divider);
  border-radius: var(--radius-lg);
  background: #fff;
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--color-ink);
  outline: none;
  width: 100%;
  transition: border-color var(--duration-fast);
}
.field-input::placeholder { color: var(--color-muted-light); }
.field-input:focus,
.field-select:focus { border-color: var(--color-terracotta); }
.field-select { appearance: none; cursor: pointer; }

.card-input-wrap { position: relative; }
.card-input-wrap .field-input { padding-right: 42px; }
.card-icon { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--color-muted-light); }

.form-actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 4px; }

/* Review */
.review-block {
  background: #fff;
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-lg);
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.review-block-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.review-block-label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--color-muted);
}
.review-edit {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-terracotta);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
.review-content {
  font-size: 0.9rem;
  color: var(--color-ink);
  line-height: 1.6;
  margin: 0;
}
.review-items { display: flex; flex-direction: column; gap: 8px; }
.review-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: var(--color-ink);
}
.ri-name { flex: 1; }
.ri-qty  { color: var(--color-muted); }
.ri-price { font-weight: 600; }

/* Summary sidebar */
.checkout-summary {
  background: #fff;
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-xl);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: sticky;
  top: 88px;
}
.summary-title {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-ink);
  letter-spacing: -0.02em;
  margin: 0;
}
.summary-items { display: flex; flex-direction: column; gap: 10px; }
.s-item { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
.s-item-info { display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 0; }
.s-item-name { font-size: 0.85rem; color: var(--color-ink); font-weight: 500; line-height: 1.3; }
.s-item-qty  { font-size: 0.75rem; color: var(--color-muted); }
.s-item-price { font-size: 0.875rem; font-weight: 600; color: var(--color-ink); white-space: nowrap; }
.summary-divider { height: 1px; background: var(--color-divider); }
.summary-lines { display: flex; flex-direction: column; gap: 0; }
.summary-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 0.875rem;
  color: var(--color-muted);
}
.summary-line span:last-child { color: var(--color-ink); font-weight: 500; }
.free-label { color: #27795B !important; font-weight: 700 !important; }
.summary-line--total {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-ink);
  padding-top: 10px;
}
.summary-line--total span:last-child {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--color-terracotta) !important;
  letter-spacing: -0.04em;
}

/* Buttons */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: var(--color-terracotta);
  color: #fff;
  border: none;
  border-radius: var(--radius-lg);
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: background var(--duration-fast), transform var(--duration-fast);
}
.btn-primary:hover:not(:disabled) { background: var(--color-terra-dark); transform: translateY(-1px); }
.btn-primary:disabled { opacity: 0.45; cursor: not-allowed; }

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #fff;
  color: var(--color-ink);
  border: 1.5px solid var(--color-divider);
  border-radius: var(--radius-lg);
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: border-color var(--duration-fast);
}
.btn-ghost:hover { border-color: var(--color-muted-light); }

.btn-place {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: var(--color-brown);
  color: var(--color-cream);
  border: none;
  border-radius: var(--radius-lg);
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(61,35,20,0.25);
  transition: background var(--duration-fast), transform var(--duration-fast);
}
.btn-place:hover {
  background: var(--color-brown-light);
  transform: translateY(-1px);
}
</style>
