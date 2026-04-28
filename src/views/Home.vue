<script setup>
import { ref, onMounted } from 'vue'
import ProductCard from '@/components/common/ProductCard.vue'

const categories = [
  { name: 'Figurines',   image: '/images/categories/figurines.jpg',  count: 24, color: '#E8D5C4' },
  { name: 'Home Decor',  image: '/images/categories/decor.jpg',      count: 18, color: '#D4C5B2' },
  { name: 'Gadgets',     image: '/images/categories/gadgets.jpg',    count: 32, color: '#C9B8A8' },
  { name: 'Art',         image: '/images/categories/art.jpg',        count: 15, color: '#DDD0C4' },
]

const steps = [
  {
    number: '01',
    title: 'Upload your file',
    desc: 'Send us your STL, OBJ, or 3MF file. We support all major 3D model formats.',
    icon: 'mdi-upload-outline',
  },
  {
    number: '02',
    title: 'We review & quote',
    desc: 'Our team checks your file for printability and sends you an instant price estimate.',
    icon: 'mdi-file-check-outline',
  },
  {
    number: '03',
    title: 'Receive your print',
    desc: 'We print, quality-check, and ship your object directly to your door.',
    icon: 'mdi-package-variant-closed',
  },
]

const stats = ref([
  { value: 0, target: 5000, label: 'Prints delivered',   suffix: '+' },
  { value: 0, target: 98,   label: 'Satisfaction rate',  suffix: '%' },
  { value: 0, target: 24,   label: 'Hour turnaround',    suffix: 'h' },
])

const featuredProducts = [
  { id: 1, name: 'Dragon Figurine',     price: 29.99, category: 'Figurines', image: '' },
  { id: 2, name: 'Geometric Vase',      price: 24.99, category: 'Home Decor', image: '' },
  { id: 3, name: 'Modular Phone Stand', price: 14.99, category: 'Gadgets',   image: '' },
  { id: 4, name: 'Abstract Sculpture',  price: 49.99, category: 'Art',       image: '' },
]

onMounted(() => {
  const duration = 1800
  stats.value.forEach((stat, i) => {
    const increment = stat.target / (duration / 16)
    const timer = setInterval(() => {
      if (stats.value[i].value < stat.target) {
        stats.value[i].value = Math.min(stats.value[i].value + increment, stat.target)
      } else {
        clearInterval(timer)
        stats.value[i].value = stat.target
      }
    }, 16)
  })
})
</script>

<template>
  <div class="home">

    <!-- ─── Hero ─────────────────────────────────────────────────── -->
    <section class="hero">
      <div class="hero-noise" aria-hidden="true"></div>
      <div class="hero-inner">
        <div class="hero-content">
          <span class="section-label">Premium 3D Printing Studio</span>

          <h1 class="hero-title">
            Bring your ideas<br />
            <em>into the world.</em>
          </h1>

          <p class="hero-body">
            From a digital file to a finished object in your hands.
            High-resolution 3D printing with expert guidance,
            fast turnaround, and no minimum orders.
          </p>

          <div class="hero-ctas">
            <router-link to="/upload" class="btn-primary">
              <v-icon size="18" class="btn-icon">mdi-upload-outline</v-icon>
              Upload a design
            </router-link>
            <router-link to="/products" class="btn-ghost">
              Browse the shop
            </router-link>
          </div>

          <!-- Trust pills -->
          <div class="hero-trust">
            <span class="trust-pill">
              <v-icon size="14">mdi-shield-check-outline</v-icon>
              Quality guaranteed
            </span>
            <span class="trust-pill">
              <v-icon size="14">mdi-truck-outline</v-icon>
              Free shipping
            </span>
            <span class="trust-pill">
              <v-icon size="14">mdi-clock-outline</v-icon>
              24h turnaround
            </span>
          </div>
        </div>

        <!-- Hero visual -->
        <div class="hero-visual" aria-hidden="true">
          <div class="hero-card hero-card--back"></div>
          <div class="hero-card hero-card--front">
            <v-icon size="72" style="color: var(--color-terracotta); opacity:0.7;">mdi-cube-scan</v-icon>
            <span class="hero-card-label">Ready to print</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Stats ─────────────────────────────────────────────────── -->
    <section class="stats-bar">
      <div class="stats-inner">
        <div v-for="stat in stats" :key="stat.label" class="stat-item">
          <span class="stat-number">{{ Math.floor(stat.value) }}{{ stat.suffix }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </section>

    <!-- ─── Categories ───────────────────────────────────────────── -->
    <section class="section-pad">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="section-label">Explore</span>
            <h2 class="section-title">Shop by category</h2>
          </div>
          <router-link to="/products" class="section-more">
            View all products
            <v-icon size="16">mdi-arrow-right</v-icon>
          </router-link>
        </div>

        <div class="categories-grid">
          <router-link
            v-for="cat in categories"
            :key="cat.name"
            :to="`/products?category=${cat.name.toLowerCase()}`"
            class="category-card"
          >
            <div class="category-image" :style="{ background: cat.color }">
              <v-img
                v-if="cat.image"
                :src="cat.image"
                cover
                width="100%"
                height="100%"
              />
              <v-icon v-else size="56" style="color: rgba(58,30,15,0.2);">mdi-cube-outline</v-icon>
            </div>
            <div class="category-info">
              <span class="category-name">{{ cat.name }}</span>
              <span class="category-count">{{ cat.count }} items</span>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- ─── How it works ─────────────────────────────────────────── -->
    <section class="how-section section-pad">
      <div class="container">
        <div class="how-header">
          <span class="section-label">Process</span>
          <h2 class="section-title">How it works</h2>
          <p class="section-sub">Three simple steps from idea to physical object.</p>
        </div>

        <div class="steps-grid">
          <div v-for="(step, i) in steps" :key="step.number" class="step-card">
            <div class="step-number">{{ step.number }}</div>
            <div class="step-icon-wrap">
              <v-icon size="28" style="color: var(--color-terracotta);">{{ step.icon }}</v-icon>
            </div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-desc">{{ step.desc }}</p>
            <div v-if="i < steps.length - 1" class="step-arrow" aria-hidden="true">
              <v-icon size="20" style="color: var(--color-muted-light);">mdi-arrow-right</v-icon>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Featured Products ─────────────────────────────────────── -->
    <section class="section-pad featured-section">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="section-label">Featured</span>
            <h2 class="section-title">Ready to order</h2>
          </div>
          <router-link to="/products" class="section-more">
            See full catalogue
            <v-icon size="16">mdi-arrow-right</v-icon>
          </router-link>
        </div>

        <div class="products-grid">
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </section>

    <!-- ─── CTA ───────────────────────────────────────────────────── -->
    <section class="cta-section">
      <div class="cta-inner">
        <span class="section-label" style="color: var(--color-gold-light);">Custom order</span>
        <h2 class="cta-title">Have a design in mind?</h2>
        <p class="cta-body">
          Upload your 3D file and we'll get back to you with a quote within the hour.
          No file? Our team can help you model it.
        </p>
        <div class="cta-actions">
          <router-link to="/upload" class="cta-btn-primary">
            <v-icon size="18" class="btn-icon">mdi-upload-outline</v-icon>
            Upload your design
          </router-link>
          <a href="mailto:hello@mujassam.com" class="cta-btn-ghost">
            Talk to us first
          </a>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.home { background: var(--color-cream); }

/* ─── Container ────────────────────────────────────────── */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ─── Hero ─────────────────────────────────────────────── */
.hero {
  position: relative;
  min-height: 92vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #FAF7F2 0%, #F0E6D8 50%, #EBD9C4 100%);
  padding-top: 64px;
  overflow: hidden;
}

/* Subtle grain texture */
.hero-noise {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  opacity: 0.4;
}

.hero-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 80px 24px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: center;
}
@media (min-width: 960px) {
  .hero-inner { grid-template-columns: 1fr 1fr; padding: 80px 40px; }
}

.hero-content { display: flex; flex-direction: column; gap: 28px; }

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.8rem, 6vw, 5rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.04em;
  color: var(--color-ink);
  margin: 0;
}
.hero-title em {
  font-style: italic;
  color: var(--color-terracotta);
  font-weight: 700;
}

.hero-body {
  font-size: 1.1rem;
  line-height: 1.75;
  color: var(--color-muted);
  max-width: 520px;
  margin: 0;
}

.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

/* Buttons */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: var(--color-terracotta);
  color: #fff;
  border-radius: var(--radius-lg);
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(184,92,56,0.3);
  transition: background var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out),
              transform var(--duration-fast) var(--ease-out);
}
.btn-primary:hover {
  background: var(--color-terra-dark);
  box-shadow: 0 6px 24px rgba(184,92,56,0.4);
  transform: translateY(-1px);
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: rgba(255,255,255,0.7);
  color: var(--color-ink);
  border-radius: var(--radius-lg);
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  border: 1.5px solid var(--color-divider);
  transition: background var(--duration-fast) var(--ease-out),
              border-color var(--duration-fast) var(--ease-out),
              transform var(--duration-fast) var(--ease-out);
}
.btn-ghost:hover {
  background: #fff;
  border-color: var(--color-muted-light);
  transform: translateY(-1px);
}

.btn-icon { opacity: 0.85; }

/* Trust pills */
.hero-trust {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.trust-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  background: rgba(255,255,255,0.6);
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-pill);
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--color-muted);
}

/* Hero visual */
.hero-visual {
  display: none;
  position: relative;
  height: 420px;
  align-items: center;
  justify-content: center;
}
@media (min-width: 960px) { .hero-visual { display: flex; } }

.hero-card {
  position: absolute;
  border-radius: var(--radius-xl);
  background: #fff;
  border: 1px solid var(--color-divider);
}
.hero-card--back {
  width: 260px;
  height: 300px;
  background: var(--color-cream-dark);
  top: 40px;
  right: 20px;
  transform: rotate(4deg);
  box-shadow: var(--shadow-sm);
}
.hero-card--front {
  width: 280px;
  height: 320px;
  top: 20px;
  right: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  box-shadow: var(--shadow-xl);
}
.hero-card-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-muted);
  letter-spacing: 0.05em;
}

/* ─── Stats bar ─────────────────────────────────────────── */
.stats-bar {
  background: var(--color-brown);
  padding: 36px 24px;
}
.stats-inner {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 48px;
}
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.stat-number {
  font-family: var(--font-display);
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--color-cream);
  letter-spacing: -0.04em;
  line-height: 1;
}
.stat-label {
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(250,247,242,0.5);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

/* ─── Section shared ────────────────────────────────────── */
.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 36px;
  flex-wrap: wrap;
  gap: 16px;
}
.section-title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 700;
  color: var(--color-ink);
  margin: 8px 0 0;
  letter-spacing: -0.03em;
}
.section-sub {
  color: var(--color-muted);
  font-size: 1rem;
  line-height: 1.6;
  margin: 8px 0 0;
  max-width: 480px;
}
.section-more {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-terracotta);
  text-decoration: none;
  padding-bottom: 2px;
  border-bottom: 1.5px solid transparent;
  transition: border-color var(--duration-fast) var(--ease-out);
}
.section-more:hover { border-bottom-color: var(--color-terracotta); }

/* ─── Categories ────────────────────────────────────────── */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
@media (min-width: 768px) {
  .categories-grid { grid-template-columns: repeat(4, 1fr); }
}

.category-card {
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-lg);
  overflow: hidden;
  text-decoration: none;
  border: 1px solid var(--color-divider);
  background: #fff;
  transition: box-shadow var(--duration-base) var(--ease-out),
              transform var(--duration-base) var(--ease-out);
}
.category-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
}
.category-image {
  aspect-ratio: 3/2;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.category-info {
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.category-name {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-ink);
  letter-spacing: -0.02em;
}
.category-count {
  font-size: 0.78rem;
  color: var(--color-muted);
  font-weight: 500;
}

/* ─── How it works ──────────────────────────────────────── */
.how-section { background: #fff; }
.how-header {
  text-align: center;
  margin-bottom: 56px;
}
.how-header .section-label { justify-content: center; }
.how-header .section-label::before { display: none; }

.steps-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  position: relative;
}
@media (min-width: 768px) {
  .steps-grid { grid-template-columns: repeat(3, 1fr); }
}

.step-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 36px 28px;
  background: var(--color-cream);
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-xl);
  gap: 14px;
}

.step-number {
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: var(--color-muted-light);
  text-transform: uppercase;
}

.step-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: rgba(184,92,56,0.08);
  border-radius: 14px;
}

.step-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-ink);
  margin: 0;
  letter-spacing: -0.02em;
}
.step-desc {
  font-size: 0.9rem;
  line-height: 1.65;
  color: var(--color-muted);
  margin: 0;
}

.step-arrow {
  position: absolute;
  top: 50%;
  right: -18px;
  transform: translateY(-50%);
  display: none;
  z-index: 1;
}
@media (min-width: 768px) { .step-arrow { display: flex; } }

/* ─── Featured products ─────────────────────────────────── */
.products-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
@media (min-width: 768px)  { .products-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1024px) { .products-grid { grid-template-columns: repeat(4, 1fr); } }

/* ─── CTA ────────────────────────────────────────────────── */
.cta-section {
  background: var(--color-brown);
  padding: 80px 24px;
}
.cta-inner {
  max-width: 680px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}
.cta-inner .section-label {
  color: rgba(250,247,242,0.5);
  justify-content: center;
}
.cta-inner .section-label::before {
  background: rgba(250,247,242,0.3);
}
.cta-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 800;
  color: var(--color-cream);
  letter-spacing: -0.04em;
  margin: 0;
  line-height: 1.1;
}
.cta-body {
  font-size: 1.05rem;
  line-height: 1.75;
  color: rgba(250,247,242,0.6);
  margin: 0;
}
.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}
.cta-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: var(--color-terracotta);
  color: #fff;
  border-radius: var(--radius-lg);
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 4px 20px rgba(184,92,56,0.4);
  transition: background var(--duration-fast), transform var(--duration-fast);
}
.cta-btn-primary:hover {
  background: var(--color-terra-dark);
  transform: translateY(-1px);
}
.cta-btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: rgba(250,247,242,0.08);
  color: rgba(250,247,242,0.8);
  border-radius: var(--radius-lg);
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  border: 1.5px solid rgba(250,247,242,0.15);
  transition: background var(--duration-fast), border-color var(--duration-fast);
}
.cta-btn-ghost:hover {
  background: rgba(250,247,242,0.14);
  border-color: rgba(250,247,242,0.3);
}
</style>
