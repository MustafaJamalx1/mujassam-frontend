<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCartStore } from '@/stores/cart'

const { t } = useI18n()
const cartStore = useCartStore()

const items = computed(() => cartStore.items)
const subtotal = computed(() => cartStore.totalPrice)
const shipping = computed(() => subtotal.value >= 50 ? 0 : 8.99)
const total = computed(() => subtotal.value + shipping.value)

const placeholderColors = ['#E8D5C4', '#D4C5B2', '#C9B8A8', '#DDD0C4', '#E6DACC']
const bgFor = (id) => placeholderColors[(id ?? 0) % placeholderColors.length]
</script>

<template>
  <div class="cart-page">
    <div class="container">

      <!-- Header -->
      <div class="page-head">
        <div>
          <nav class="breadcrumb">
            <router-link to="/" class="bc-link">{{ $t('cart.home') }}</router-link>
            <v-icon size="14" class="bc-sep">mdi-chevron-right</v-icon>
            <span class="bc-current">{{ $t('cart.cart') }}</span>
          </nav>
          <h1 class="page-title">{{ $t('cart.yourCart') }}</h1>
        </div>
        <router-link to="/products" class="continue-link">
          <v-icon size="16">mdi-arrow-left</v-icon>
          {{ $t('cart.continueShopping') }}
        </router-link>
      </div>

      <!-- Empty state -->
      <div v-if="!items.length" class="empty-cart">
        <div class="empty-icon-wrap">
          <v-icon size="48" style="color: var(--color-muted-light);">mdi-shopping-outline</v-icon>
        </div>
        <h2 class="empty-title">{{ $t('cart.emptyTitle') }}</h2>
        <p class="empty-sub">{{ $t('cart.emptySub') }}</p>
        <div class="empty-actions">
          <router-link to="/products" class="btn-primary">{{ $t('cart.browseProducts') }}</router-link>
          <router-link to="/upload"   class="btn-ghost">{{ $t('cart.uploadDesign') }}</router-link>
        </div>
      </div>

      <!-- Cart with items -->
      <div v-else class="cart-layout">

        <!-- ─── Line items ───────────────────────────────────────── -->
        <div class="cart-items">
          <div class="cart-items-header">
            <span>{{ $t('cart.product') }}</span>
            <span class="header-qty">{{ $t('cart.qty') }}</span>
            <span class="header-price">{{ $t('cart.price') }}</span>
          </div>

          <div class="item-list">
            <div v-for="item in items" :key="item.id" class="cart-item">
              <!-- Thumbnail -->
              <div class="item-thumb" :style="{ background: bgFor(item.id) }">
                <v-icon size="24" style="color: rgba(58,30,15,0.2);">mdi-cube-outline</v-icon>
              </div>

              <!-- Info -->
              <div class="item-info">
                <span class="item-name">{{ item.name }}</span>
                <div class="item-meta">
                  <span v-if="item.material" class="item-attr">{{ item.material }}</span>
                  <span v-if="item.color"    class="item-attr">{{ item.color }}</span>
                </div>
              </div>

              <!-- Quantity stepper -->
              <div class="item-qty">
                <button class="qty-btn" @click="cartStore.updateQuantity(item.id, item.quantity - 1)">
                  <v-icon size="14">mdi-minus</v-icon>
                </button>
                <span class="qty-value">{{ item.quantity }}</span>
                <button class="qty-btn" @click="cartStore.updateQuantity(item.id, item.quantity + 1)">
                  <v-icon size="14">mdi-plus</v-icon>
                </button>
              </div>

              <!-- Price -->
              <div class="item-price">
                ${{ (item.price * item.quantity).toFixed(2) }}
              </div>

              <!-- Remove -->
              <button class="item-remove" @click="cartStore.removeItem(item.id)" :aria-label="$t('cart.remove')">
                <v-icon size="16">mdi-close</v-icon>
              </button>
            </div>
          </div>

          <!-- Clear cart -->
          <div class="cart-actions">
            <button class="clear-btn" @click="cartStore.clearCart">
              <v-icon size="14">mdi-trash-can-outline</v-icon>
              {{ $t('cart.clearCart') }}
            </button>
          </div>
        </div>

        <!-- ─── Order summary ─────────────────────────────────────── -->
        <aside class="order-summary">
          <h2 class="summary-title">{{ $t('cart.orderSummary') }}</h2>

          <div class="summary-lines">
            <div class="summary-line">
              <span>{{
                $t('cart.subtotal', {
                  count: cartStore.itemCount,
                  itemLabel: cartStore.itemCount === 1 ? $t('cart.item') : $t('cart.items')
                })
              }}</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="summary-line">
              <span>{{ $t('cart.shipping') }}</span>
              <span v-if="shipping === 0" class="free-label">{{ $t('cart.free') }}</span>
              <span v-else>${{ shipping.toFixed(2) }}</span>
            </div>
            <div v-if="shipping > 0" class="summary-free-note">
              {{ $t('cart.freeShippingNote', { amount: (50 - subtotal).toFixed(2) }) }}
            </div>
            <div class="summary-divider"></div>
            <div class="summary-line summary-line--total">
              <span>{{ $t('cart.total') }}</span>
              <span>${{ total.toFixed(2) }}</span>
            </div>
          </div>

          <router-link to="/checkout" class="checkout-btn">
            <v-icon size="18">mdi-lock-outline</v-icon>
            {{ $t('cart.proceedCheckout') }}
          </router-link>

          <div class="summary-trust">
            <span class="trust-item">
              <v-icon size="14">mdi-shield-check-outline</v-icon>
              {{ $t('cart.secureCheckout') }}
            </span>
            <span class="trust-item">
              <v-icon size="14">mdi-credit-card-outline</v-icon>
              {{ $t('cart.allMajorCards') }}
            </span>
          </div>
        </aside>
      </div>

    </div>
  </div>
</template>

<style scoped>
.cart-page {
  background: var(--color-cream);
  min-height: 100vh;
  padding-top: 64px;
}
.container {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 24px 80px;
}

.page-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  padding: 40px 0 32px;
  border-bottom: 1px solid var(--color-divider);
  margin-bottom: 40px;
}
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 10px;
}
.bc-link {
  font-size: 0.8rem;
  color: var(--color-muted);
  text-decoration: none;
}
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
.continue-link {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-muted);
  text-decoration: none;
  transition: color var(--duration-fast);
}
.continue-link:hover { color: var(--color-terracotta); }

/* Empty state */
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 80px 24px;
  text-align: center;
}
.empty-icon-wrap {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--color-cream-dark);
  display: flex;
  align-items: center;
  justify-content: center;
}
.empty-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-ink);
  margin: 0;
  letter-spacing: -0.03em;
}
.empty-sub { font-size: 0.95rem; color: var(--color-muted); margin: 0; }
.empty-actions { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 8px; }

/* Layout */
.cart-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  align-items: start;
}
@media (min-width: 900px) {
  .cart-layout { grid-template-columns: 1fr 360px; }
}

/* Items */
.cart-items { display: flex; flex-direction: column; gap: 0; }

.cart-items-header {
  display: grid;
  grid-template-columns: auto 1fr auto auto auto;
  gap: 16px;
  align-items: center;
  padding: 0 0 12px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--color-muted);
  border-bottom: 2px solid var(--color-divider);
}
.header-qty  { text-align: center; }
.header-price { text-align: end; }

.item-list { display: flex; flex-direction: column; }

.cart-item {
  display: grid;
  grid-template-columns: 64px 1fr auto auto auto;
  gap: 16px;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid var(--color-divider);
}

.item-thumb {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid var(--color-divider);
}

.item-info { display: flex; flex-direction: column; gap: 4px; overflow: hidden; }
.item-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-ink);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item-meta { display: flex; gap: 8px; flex-wrap: wrap; }
.item-attr {
  font-size: 0.73rem;
  color: var(--color-muted);
  background: var(--color-cream-dark);
  padding: 2px 8px;
  border-radius: var(--radius-pill);
}

.item-qty {
  display: flex;
  align-items: center;
  border: 1.5px solid var(--color-divider);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: #fff;
}
.qty-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: var(--color-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--duration-fast), color var(--duration-fast);
}
.qty-btn:hover { background: var(--color-cream); color: var(--color-ink); }
.qty-value {
  min-width: 28px;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-ink);
  border-left: 1px solid var(--color-divider);
  border-right: 1px solid var(--color-divider);
  line-height: 32px;
}

.item-price {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-ink);
  white-space: nowrap;
  text-align: end;
}

.item-remove {
  background: none;
  border: none;
  color: var(--color-muted-light);
  cursor: pointer;
  padding: 6px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  transition: color var(--duration-fast), background var(--duration-fast);
}
.item-remove:hover { color: #C0392B; background: rgba(192,57,43,0.07); }

.cart-actions { padding: 16px 0; }
.clear-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-muted);
  background: none;
  border: none;
  cursor: pointer;
  transition: color var(--duration-fast);
}
.clear-btn:hover { color: #C0392B; }

/* Summary */
.order-summary {
  background: #fff;
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-xl);
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: sticky;
  top: 88px;
}
.summary-title {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-ink);
  letter-spacing: -0.02em;
  margin: 0;
}
.summary-lines { display: flex; flex-direction: column; gap: 0; }
.summary-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  font-size: 0.9rem;
  color: var(--color-muted);
}
.summary-line span:last-child { color: var(--color-ink); font-weight: 500; }
.free-label { color: #27795B !important; font-weight: 700 !important; }
.summary-free-note {
  font-size: 0.75rem;
  color: var(--color-muted-light);
  padding: 0 0 8px;
  font-style: italic;
}
.summary-divider { height: 1px; background: var(--color-divider); margin: 4px 0; }
.summary-line--total {
  padding: 14px 0 0;
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-ink) !important;
}
.summary-line--total span:last-child {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--color-terracotta) !important;
  letter-spacing: -0.04em;
}

.checkout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  background: var(--color-terracotta);
  color: #fff;
  border-radius: var(--radius-lg);
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(184,92,56,0.3);
  transition: background var(--duration-fast), transform var(--duration-fast);
}
.checkout-btn:hover {
  background: var(--color-terra-dark);
  transform: translateY(-1px);
}

.summary-trust {
  display: flex;
  justify-content: center;
  gap: 16px;
}
.trust-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.75rem;
  color: var(--color-muted);
}
.trust-item :deep(.v-icon) { color: var(--color-muted-light) !important; }

/* Shared buttons */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 24px;
  background: var(--color-terracotta);
  color: #fff;
  border: none;
  border-radius: var(--radius-lg);
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: background var(--duration-fast);
}
.btn-primary:hover { background: var(--color-terra-dark); }

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 24px;
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
</style>
