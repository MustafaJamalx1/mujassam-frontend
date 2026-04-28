<script setup>
import { useCartStore } from '@/stores/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const cartStore = useCartStore()

function addToCart(e) {
  e.preventDefault()
  e.stopPropagation()
  cartStore.addItem(props.product)
}

const placeholderColors = [
  '#E8D5C4', '#D4C5B2', '#C9B8A8', '#DDD0C4', '#E6DACC',
]
const placeholderColor = placeholderColors[(props.product.id ?? 0) % placeholderColors.length]
</script>

<template>
  <router-link :to="`/products/${product.id}`" class="product-card" tabindex="0">
    <!-- Image area -->
    <div class="product-image-wrap">
      <v-img
        v-if="product.image"
        :src="product.image"
        :alt="product.name"
        cover
        class="product-image"
      />
      <div v-else class="product-placeholder" :style="{ background: placeholderColor }">
        <v-icon size="48" style="color: rgba(58,30,15,0.18);">mdi-cube-outline</v-icon>
      </div>

      <!-- Category tag -->
      <span class="product-category">{{ product.category }}</span>

      <!-- Quick add overlay -->
      <div class="product-overlay">
        <button class="quick-add-btn" @click="addToCart">
          <v-icon size="16">mdi-cart-plus</v-icon>
          Add to cart
        </button>
      </div>
    </div>

    <!-- Info -->
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <div class="product-footer">
        <span class="product-price">${{ Number(product.price).toFixed(2) }}</span>
        <span class="product-status">In stock</span>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-lg);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: box-shadow var(--duration-base) var(--ease-out),
              transform var(--duration-base) var(--ease-out),
              border-color var(--duration-base) var(--ease-out);
}
.product-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
  border-color: var(--color-muted-light);
}

/* Image */
.product-image-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  background: var(--color-cream);
}
.product-image {
  width: 100%;
  height: 100%;
  transition: transform var(--duration-slow) var(--ease-out);
}
.product-card:hover .product-image {
  transform: scale(1.05);
}
.product-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Category tag */
.product-category {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 3px 10px;
  background: rgba(250, 247, 242, 0.92);
  backdrop-filter: blur(6px);
  border-radius: var(--radius-pill);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--color-brown);
  text-transform: uppercase;
  border: 1px solid var(--color-divider);
}

/* Overlay */
.product-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 16px;
  background: linear-gradient(to top, rgba(58,30,15,0.35) 0%, transparent 50%);
  opacity: 0;
  transition: opacity var(--duration-base) var(--ease-out);
}
.product-card:hover .product-overlay { opacity: 1; }

.quick-add-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 20px;
  background: #fff;
  border: none;
  border-radius: var(--radius-pill);
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-ink);
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transform: translateY(6px);
  transition: transform var(--duration-base) var(--ease-out),
              background var(--duration-fast) var(--ease-out),
              color var(--duration-fast) var(--ease-out);
}
.product-card:hover .quick-add-btn { transform: translateY(0); }
.quick-add-btn:hover {
  background: var(--color-terracotta);
  color: #fff;
}

/* Info */
.product-info {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.product-name {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-ink);
  line-height: 1.3;
  letter-spacing: -0.01em;
  margin: 0;
}
.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.product-price {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-terracotta);
}
.product-status {
  font-size: 0.72rem;
  font-weight: 600;
  color: #27795B;
  background: rgba(39,121,91,0.08);
  padding: 2px 8px;
  border-radius: var(--radius-pill);
}
</style>
