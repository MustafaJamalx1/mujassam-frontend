<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import ProductCard from '@/components/common/ProductCard.vue'

const route = useRoute()
const cartStore = useCartStore()

// Placeholder product — replace with API call using route.params.id
const product = ref({
  id: Number(route.params.id) || 1,
  name: 'Dragon Figurine',
  category: 'Figurines',
  price: 29.99,
  description: 'A highly detailed dragon figurine printed in premium PLA. Stands 18 cm tall with intricate scale textures and articulated wing detailing. Perfect for collectors and display.',
  images: [],
  materials: ['PLA', 'PETG', 'ABS'],
  colors: ['Natural White', 'Matte Black', 'Burnt Orange', 'Forest Green'],
})

const selectedMaterial = ref(product.value.materials[0])
const selectedColor    = ref(product.value.colors[0])
const quantity         = ref(1)
const activeImage      = ref(0)
const addedToCart      = ref(false)

const placeholderColors = ['#E8D5C4', '#D4C5B2', '#C9B8A8', '#DDD0C4']

const unitPrice = computed(() => {
  const surcharge = selectedMaterial.value === 'ABS' ? 3 : selectedMaterial.value === 'PETG' ? 1.5 : 0
  return (product.value.price + surcharge).toFixed(2)
})

const relatedProducts = [
  { id: 2, name: 'Abstract Sculpture',  price: 49.99, category: 'Art',       image: '' },
  { id: 3, name: 'Geometric Vase',      price: 24.99, category: 'Home Decor', image: '' },
  { id: 4, name: 'Articulated Hand',    price: 34.99, category: 'Art',       image: '' },
  { id: 5, name: 'Bonsai Pot',          price: 22.50, category: 'Home Decor', image: '' },
]

function addToCart() {
  cartStore.addItem({
    id: product.value.id,
    name: product.value.name,
    price: Number(unitPrice.value),
    category: product.value.category,
    material: selectedMaterial.value,
    color: selectedColor.value,
    image: '',
  }, quantity.value)
  addedToCart.value = true
  setTimeout(() => { addedToCart.value = false }, 2000)
}
</script>

<template>
  <div class="detail-page">
    <div class="container">

      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <router-link to="/" class="bc-link">Home</router-link>
        <v-icon size="14" class="bc-sep">mdi-chevron-right</v-icon>
        <router-link to="/products" class="bc-link">Products</router-link>
        <v-icon size="14" class="bc-sep">mdi-chevron-right</v-icon>
        <span class="bc-current">{{ product.name }}</span>
      </nav>

      <!-- Main layout -->
      <div class="detail-grid">

        <!-- ─── Gallery ──────────────────────────────────────────── -->
        <div class="gallery">
          <div class="gallery-main" :style="{ background: placeholderColors[activeImage % placeholderColors.length] }">
            <v-icon size="96" style="color: rgba(58,30,15,0.18);">mdi-cube-outline</v-icon>
            <span class="gallery-placeholder-label">{{ product.name }}</span>
          </div>
          <div v-if="product.images.length > 1" class="gallery-thumbs">
            <button
              v-for="(img, i) in product.images"
              :key="i"
              class="gallery-thumb"
              :class="{ 'gallery-thumb--active': activeImage === i }"
              @click="activeImage = i"
            />
          </div>
        </div>

        <!-- ─── Details ──────────────────────────────────────────── -->
        <div class="detail-info">
          <span class="product-category-tag">{{ product.category }}</span>
          <h1 class="product-name">{{ product.name }}</h1>

          <div class="price-row">
            <span class="price">${{ unitPrice }}</span>
            <span class="price-note">per unit · free shipping over $50</span>
          </div>

          <p class="product-desc">{{ product.description }}</p>

          <!-- Material selector -->
          <div class="option-group">
            <label class="option-label">
              Material
              <span class="option-selected">{{ selectedMaterial }}</span>
            </label>
            <div class="option-chips">
              <button
                v-for="mat in product.materials"
                :key="mat"
                class="option-chip"
                :class="{ 'option-chip--active': selectedMaterial === mat }"
                @click="selectedMaterial = mat"
              >
                {{ mat }}
                <span v-if="mat === 'ABS'" class="chip-note">+$3</span>
                <span v-if="mat === 'PETG'" class="chip-note">+$1.50</span>
              </button>
            </div>
          </div>

          <!-- Color selector -->
          <div class="option-group">
            <label class="option-label">
              Color
              <span class="option-selected">{{ selectedColor }}</span>
            </label>
            <div class="option-chips">
              <button
                v-for="col in product.colors"
                :key="col"
                class="option-chip"
                :class="{ 'option-chip--active': selectedColor === col }"
                @click="selectedColor = col"
              >
                {{ col }}
              </button>
            </div>
          </div>

          <!-- Quantity + Add to cart -->
          <div class="purchase-row">
            <div class="quantity-picker">
              <button class="qty-btn" @click="quantity = Math.max(1, quantity - 1)">
                <v-icon size="16">mdi-minus</v-icon>
              </button>
              <span class="qty-value">{{ quantity }}</span>
              <button class="qty-btn" @click="quantity++">
                <v-icon size="16">mdi-plus</v-icon>
              </button>
            </div>

            <button
              class="add-to-cart-btn"
              :class="{ 'add-to-cart-btn--added': addedToCart }"
              @click="addToCart"
            >
              <v-icon size="18">{{ addedToCart ? 'mdi-check' : 'mdi-cart-plus' }}</v-icon>
              {{ addedToCart ? 'Added!' : 'Add to cart' }}
            </button>
          </div>

          <!-- Trust badges -->
          <div class="trust-row">
            <span class="trust-item">
              <v-icon size="16">mdi-shield-check-outline</v-icon>
              Quality guaranteed
            </span>
            <span class="trust-item">
              <v-icon size="16">mdi-truck-outline</v-icon>
              Ships within 24h
            </span>
            <span class="trust-item">
              <v-icon size="16">mdi-refresh</v-icon>
              14-day returns
            </span>
          </div>
        </div>
      </div>

      <!-- Related products -->
      <div class="related-section">
        <h2 class="related-title">You might also like</h2>
        <div class="related-grid">
          <ProductCard
            v-for="p in relatedProducts"
            :key="p.id"
            :product="p"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-page {
  background: var(--color-cream);
  min-height: 100vh;
  padding-top: 64px;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 24px 0 32px;
}
.bc-link {
  font-size: 0.8rem;
  color: var(--color-muted);
  text-decoration: none;
}
.bc-link:hover { color: var(--color-terracotta); }
.bc-sep { color: var(--color-muted-light); }
.bc-current {
  font-size: 0.8rem;
  color: var(--color-ink);
  font-weight: 500;
}

/* Main grid */
.detail-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-bottom: 64px;
}
@media (min-width: 768px) {
  .detail-grid {
    grid-template-columns: 1fr 1fr;
    gap: 56px;
  }
}
@media (min-width: 1024px) {
  .detail-grid { grid-template-columns: 5fr 4fr; }
}

/* Gallery */
.gallery { display: flex; flex-direction: column; gap: 12px; }
.gallery-main {
  aspect-ratio: 1;
  border-radius: var(--radius-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border: 1px solid var(--color-divider);
  overflow: hidden;
}
.gallery-placeholder-label {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  color: rgba(58,30,15,0.3);
}
.gallery-thumbs {
  display: flex;
  gap: 8px;
}
.gallery-thumb {
  width: 60px;
  height: 60px;
  border-radius: var(--radius-md);
  border: 2px solid var(--color-divider);
  background: var(--color-cream-dark);
  cursor: pointer;
  transition: border-color var(--duration-fast);
}
.gallery-thumb--active { border-color: var(--color-terracotta); }

/* Details */
.detail-info {
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding-top: 8px;
}

.product-category-tag {
  display: inline-flex;
  align-items: center;
  padding: 3px 12px;
  background: rgba(184,92,56,0.08);
  color: var(--color-terracotta);
  border-radius: var(--radius-pill);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  align-self: flex-start;
}

.product-name {
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 3vw, 2.4rem);
  font-weight: 700;
  color: var(--color-ink);
  letter-spacing: -0.03em;
  margin: 0;
  line-height: 1.2;
}

.price-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
}
.price {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-terracotta);
  letter-spacing: -0.04em;
}
.price-note {
  font-size: 0.8rem;
  color: var(--color-muted);
}

.product-desc {
  font-size: 0.95rem;
  line-height: 1.75;
  color: var(--color-muted);
  margin: 0;
}

/* Options */
.option-group { display: flex; flex-direction: column; gap: 10px; }
.option-label {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--color-muted);
  display: flex;
  align-items: center;
  gap: 8px;
}
.option-selected {
  font-weight: 600;
  color: var(--color-ink);
  letter-spacing: 0;
  text-transform: none;
}
.option-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.option-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 7px 16px;
  border: 1.5px solid var(--color-divider);
  border-radius: var(--radius-lg);
  background: #fff;
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-ink);
  cursor: pointer;
  transition: border-color var(--duration-fast), background var(--duration-fast), color var(--duration-fast);
}
.option-chip:hover { border-color: var(--color-muted-light); }
.option-chip--active {
  border-color: var(--color-terracotta);
  background: rgba(184,92,56,0.07);
  color: var(--color-terracotta);
  font-weight: 600;
}
.chip-note {
  font-size: 0.72rem;
  color: var(--color-muted);
}

/* Purchase */
.purchase-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.quantity-picker {
  display: flex;
  align-items: center;
  gap: 0;
  border: 1.5px solid var(--color-divider);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: #fff;
}
.qty-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 42px;
  border: none;
  background: transparent;
  color: var(--color-muted);
  cursor: pointer;
  transition: background var(--duration-fast), color var(--duration-fast);
}
.qty-btn:hover {
  background: var(--color-cream);
  color: var(--color-ink);
}
.qty-value {
  min-width: 40px;
  text-align: center;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-ink);
  border-left: 1px solid var(--color-divider);
  border-right: 1px solid var(--color-divider);
  line-height: 42px;
}

.add-to-cart-btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  background: var(--color-terracotta);
  color: #fff;
  border: none;
  border-radius: var(--radius-lg);
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(184,92,56,0.3);
  transition: background var(--duration-fast), box-shadow var(--duration-fast), transform var(--duration-fast);
}
.add-to-cart-btn:hover {
  background: var(--color-terra-dark);
  transform: translateY(-1px);
}
.add-to-cart-btn--added {
  background: #27795B;
  box-shadow: 0 4px 16px rgba(39,121,91,0.3);
}

/* Trust row */
.trust-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding-top: 4px;
  border-top: 1px solid var(--color-divider);
}
.trust-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-muted);
}
.trust-item :deep(.v-icon) { color: var(--color-terracotta) !important; }

/* Related */
.related-section {
  padding: 0 0 80px;
}
.related-title {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-ink);
  letter-spacing: -0.03em;
  margin-bottom: 28px;
}
.related-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
@media (min-width: 640px)  { .related-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1024px) { .related-grid { grid-template-columns: repeat(4, 1fr); } }
</style>
