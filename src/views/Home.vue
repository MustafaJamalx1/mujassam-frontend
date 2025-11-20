<script setup>
import { ref, onMounted } from 'vue'

const features = [
  {
    icon: 'mdi-palette',
    title: 'Custom Designs',
    description: 'Upload your own 3D models and bring your ideas to life',
    color: '#06b6d4'
  },
  {
    icon: 'mdi-lightning-bolt',
    title: 'Fast Printing',
    description: 'Quick turnaround times with high-quality results',
    color: '#a855f7'
  },
  {
    icon: 'mdi-cog',
    title: 'Multiple Materials',
    description: 'Choose from PLA, ABS, PETG, and more premium materials',
    color: '#f43f5e'
  },
  {
    icon: 'mdi-truck-delivery',
    title: 'Worldwide Shipping',
    description: 'We deliver your prints anywhere in the world',
    color: '#06b6d4'
  }
]

const categories = [
  { name: 'Figurines', image: '/images/categories/figurines.jpg', count: 24 },
  { name: 'Home Decor', image: '/images/categories/decor.jpg', count: 18 },
  { name: 'Gadgets', image: '/images/categories/gadgets.jpg', count: 32 },
  { name: 'Art', image: '/images/categories/art.jpg', count: 15 }
]

// Animated counter
const stats = ref([
  { value: 0, target: 5000, label: 'Prints Delivered', suffix: '+' },
  { value: 0, target: 98, label: 'Satisfaction Rate', suffix: '%' },
  { value: 0, target: 24, label: 'Hour Turnaround', suffix: 'h' }
])

const animateNumbers = () => {
  stats.value.forEach((stat, index) => {
    const duration = 2000
    const increment = stat.target / (duration / 16)
    const timer = setInterval(() => {
      if (stats.value[index].value < stat.target) {
        stats.value[index].value = Math.min(stats.value[index].value + increment, stat.target)
      } else {
        clearInterval(timer)
        stats.value[index].value = stat.target
      }
    }, 16)
  })
}

onMounted(() => {
  setTimeout(animateNumbers, 500)
})
</script>

<template>
  <div>
    <!-- Hero Section with Mesh Grid and 3D Elements -->
    <section class="hero-section position-relative overflow-hidden">
      <!-- Animated mesh background -->
      <div class="hero-mesh-bg"></div>
      <div class="hero-gradient-overlay"></div>
      
      <!-- Floating 3D layer elements -->
      <div class="floating-layers">
        <div class="layer layer-1"></div>
        <div class="layer layer-2"></div>
        <div class="layer layer-3"></div>
      </div>

      <v-container class="position-relative py-16 py-md-20">
        <v-row align="center">
          <v-col cols="12" lg="7">
            <!-- Badge -->
            <div class="mb-6 animate-fade-in">
              <div class="hero-badge glass d-inline-flex align-center px-4 py-2 rounded-pill">
                <v-icon size="18" class="mr-2" style="color: #06b6d4;">mdi-star-four-points</v-icon>
                <span class="text-body-2 font-weight-bold" style="color: #0f172a;">Premium 3D Printing Services</span>
              </div>
            </div>

            <!-- Main Heading -->
            <h1 class="hero-title mb-6 animate-slide-up" style="font-family: var(--font-display); font-size: clamp(2.5rem, 6vw, 4.5rem); line-height: 1.1; letter-spacing: -0.03em; color: #0f172a;">
              Transform Your
              <span class="d-block text-gradient mt-2">
                Ideas Into Reality
              </span>
            </h1>

            <!-- Subtitle -->
            <p class="text-h6 text-body-1 mb-8 animate-slide-up" style="color: #475569; line-height: 1.7; max-width: 580px; animation-delay: 0.2s;">
              Experience professional 3D printing with cutting-edge technology. From custom designs to rapid prototyping—bring your vision to life with precision and speed.
            </p>

            <!-- CTA Buttons -->
            <div class="d-flex flex-wrap ga-4 mb-8 animate-slide-up" style="animation-delay: 0.4s;">
              <v-btn
                to="/products"
                size="x-large"
                rounded="xl"
                elevation="0"
                class="hero-btn-primary px-8"
                style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; text-transform: none; font-weight: 700; letter-spacing: -0.01em; box-shadow: 0 8px 24px rgba(6, 182, 212, 0.35);"
              >
                <v-icon start size="22">mdi-cube-outline</v-icon>
                Browse Products
              </v-btn>
              <v-btn
                to="/upload"
                size="x-large"
                rounded="xl"
                variant="outlined"
                class="hero-btn-secondary px-8 glass-card"
                style="border: 2px solid #06b6d4; color: #0891b2; text-transform: none; font-weight: 700; letter-spacing: -0.01em;"
              >
                <v-icon start size="22">mdi-upload</v-icon>
                Upload Design
              </v-btn>
            </div>

            <!-- Stats -->
            <div class="d-flex flex-wrap ga-8 animate-fade-in" style="animation-delay: 0.6s;">
              <div v-for="stat in stats" :key="stat.label" class="stat-item">
                <div class="text-h4 font-weight-bold text-gradient mb-1">
                  {{ Math.floor(stat.value) }}{{ stat.suffix }}
                </div>
                <div class="text-body-2 font-weight-medium" style="color: #64748b;">
                  {{ stat.label }}
                </div>
              </div>
            </div>
          </v-col>

          <!-- Hero Image / 3D Visualization Area -->
          <v-col cols="12" lg="5" class="d-none d-lg-block">
            <div class="hero-visual position-relative animate-float">
              <div class="visual-cube glass-card pa-8 text-center">
                <v-icon size="180" style="color: #06b6d4; opacity: 0.9;">mdi-cube-outline</v-icon>
                <div class="visual-layers">
                  <div class="v-layer"></div>
                  <div class="v-layer"></div>
                  <div class="v-layer"></div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>

      <!-- Scroll indicator -->
      <div class="scroll-indicator">
        <v-icon size="32" class="animate-bounce" style="color: #94a3b8;">mdi-chevron-down</v-icon>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section section-padding">
      <v-container>
        <div class="text-center mb-12 mb-md-16">
          <div class="mb-4">
            <div class="section-badge glass d-inline-flex align-center px-4 py-2 rounded-pill">
              <v-icon size="18" class="mr-2" style="color: #a855f7;">mdi-check-decagram</v-icon>
              <span class="text-body-2 font-weight-bold" style="color: #0f172a;">Why Choose Us</span>
            </div>
          </div>
          <h2 class="text-h3 font-weight-bold mb-4" style="font-family: var(--font-display); letter-spacing: -0.02em; color: #0f172a;">
            Precision Meets <span class="text-gradient-primary">Innovation</span>
          </h2>
          <p class="text-h6 text-body-1 mx-auto" style="color: #64748b; max-width: 680px; line-height: 1.7;">
            We combine cutting-edge 3D printing technology with exceptional craftsmanship to deliver superior results.
          </p>
        </div>
        
        <v-row>
          <v-col
            v-for="(feature, index) in features"
            :key="feature.title"
            cols="12"
            sm="6"
            lg="3"
          >
            <div 
              class="feature-card glass-card text-center pa-6 h-100 position-relative"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <!-- Decorative top border -->
              <div class="feature-card-border" :style="{ background: feature.color }"></div>
              
              <!-- Icon with gradient background -->
              <div class="feature-icon-wrapper mb-5 mx-auto">
                <div 
                  class="feature-icon-bg"
                  :style="{ background: `linear-gradient(135deg, ${feature.color}15, ${feature.color}05)` }"
                ></div>
                <v-icon 
                  :icon="feature.icon" 
                  size="40"
                  :style="{ color: feature.color }"
                  class="feature-icon"
                ></v-icon>
              </div>
              
              <!-- Content -->
              <h3 class="text-h6 font-weight-bold mb-3" style="color: #0f172a; font-family: var(--font-display);">
                {{ feature.title }}
              </h3>
              <p class="text-body-2 mb-0" style="color: #64748b; line-height: 1.6;">
                {{ feature.description }}
              </p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Categories Section -->
    <section class="categories-section section-padding mesh-grid">
      <v-container>
        <div class="d-flex flex-column flex-md-row justify-space-between align-md-center mb-10 ga-4">
          <div>
            <div class="mb-3">
              <div class="section-badge glass d-inline-flex align-center px-4 py-2 rounded-pill">
                <v-icon size="18" class="mr-2" style="color: #a855f7;">mdi-grid</v-icon>
                <span class="text-body-2 font-weight-bold" style="color: #0f172a;">Explore</span>
              </div>
            </div>
            <h2 class="text-h3 font-weight-bold" style="font-family: var(--font-display); letter-spacing: -0.02em; color: #0f172a;">
              Shop by Category
            </h2>
          </div>
          <v-btn
            to="/products"
            rounded="xl"
            size="large"
            class="glass-card"
            style="border: 2px solid #06b6d4; color: #0891b2; font-weight: 700; text-transform: none;"
          >
            View All Products
            <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
        
        <v-row>
          <v-col
            v-for="(category, index) in categories"
            :key="category.name"
            cols="6"
            md="3"
          >
            <router-link 
              :to="`/products?category=${category.name.toLowerCase()}`"
              class="text-decoration-none"
            >
              <div 
                class="category-card glass-card overflow-hidden position-relative"
                :style="{ animationDelay: `${index * 0.1}s` }"
              >
                <div class="category-image-wrapper">
                  <v-img
                    :src="category.image"
                    height="280"
                    cover
                    class="category-image"
                  >
                    <template v-slot:placeholder>
                      <div class="d-flex align-center justify-center fill-height gradient-mesh">
                        <v-icon size="64" style="color: #06b6d4; opacity: 0.3;">mdi-cube-outline</v-icon>
                      </div>
                    </template>
                  </v-img>
                  <div class="category-overlay"></div>
                </div>
                
                <div class="category-content pa-5">
                  <h3 class="text-h6 font-weight-bold mb-2" style="color: #0f172a; font-family: var(--font-display);">
                    {{ category.name }}
                  </h3>
                  <div class="d-flex align-center justify-space-between">
                    <span class="text-body-2 font-weight-medium" style="color: #64748b;">
                      {{ category.count }} items
                    </span>
                    <v-icon size="20" style="color: #06b6d4;">mdi-arrow-right</v-icon>
                  </div>
                </div>
              </div>
            </router-link>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- CTA Section -->
    <section class="cta-section position-relative overflow-hidden">
      <!-- Animated gradient background -->
      <div class="cta-gradient"></div>
      <div class="cta-pattern"></div>
      
      <v-container class="position-relative text-center py-16 py-md-20">
        <!-- Icon with glow effect -->
        <div class="cta-icon-wrapper mb-6 mx-auto">
          <div class="cta-icon-glow"></div>
          <div class="glass-card d-inline-flex align-center justify-center pa-6 rounded-circle">
            <v-icon size="56" style="color: #06b6d4;">mdi-rocket-launch-outline</v-icon>
          </div>
        </div>

        <h2 class="text-h3 text-md-h2 font-weight-bold mb-5" style="font-family: var(--font-display); letter-spacing: -0.02em; color: #0f172a;">
          Ready to <span class="text-gradient">Start Creating?</span>
        </h2>
        
        <p class="text-h6 text-body-1 mb-10 mx-auto" style="color: #475569; line-height: 1.7; max-width: 680px;">
          Upload your 3D model and receive an instant quote. Our expert team ensures precision, quality, and fast turnaround for every project.
        </p>

        <div class="d-flex flex-wrap justify-center ga-4 mb-10">
          <v-btn
            to="/upload"
            size="x-large"
            rounded="xl"
            class="px-10"
            style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; text-transform: none; font-weight: 700; letter-spacing: -0.01em; box-shadow: 0 12px 32px rgba(6, 182, 212, 0.4);"
          >
            <v-icon start size="24">mdi-upload</v-icon>
            Get Started Now
          </v-btn>
          
          <v-btn
            to="/products"
            size="x-large"
            rounded="xl"
            class="glass-card px-10"
            style="border: 2px solid #a855f7; color: #7e22ce; text-transform: none; font-weight: 700; letter-spacing: -0.01em;"
          >
            <v-icon start size="24">mdi-view-grid-outline</v-icon>
            Browse Gallery
          </v-btn>
        </div>

        <!-- Trust indicators -->
        <div class="d-flex flex-wrap justify-center ga-8 mt-12">
          <div class="trust-badge glass pa-4 rounded-lg d-flex align-center ga-3">
            <v-icon size="24" style="color: #10b981;">mdi-check-circle</v-icon>
            <span class="text-body-2 font-weight-bold" style="color: #0f172a;">Free Shipping</span>
          </div>
          <div class="trust-badge glass pa-4 rounded-lg d-flex align-center ga-3">
            <v-icon size="24" style="color: #10b981;">mdi-shield-check</v-icon>
            <span class="text-body-2 font-weight-bold" style="color: #0f172a;">Quality Guaranteed</span>
          </div>
          <div class="trust-badge glass pa-4 rounded-lg d-flex align-center ga-3">
            <v-icon size="24" style="color: #10b981;">mdi-clock-fast</v-icon>
            <span class="text-body-2 font-weight-bold" style="color: #0f172a;">24h Turnaround</span>
          </div>
        </div>
      </v-container>
    </section>
  </div>
</template>

<style scoped>
/* Hero Section */
.hero-section {
  min-height: 90vh;
  display: flex;
  align-items: center;
  position: relative;
  padding-top: 72px;
}

.hero-mesh-bg {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(6, 182, 212, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(6, 182, 212, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  animation: mesh-move 20s linear infinite;
}

@keyframes mesh-move {
  0% { transform: translate(0, 0); }
  100% { transform: translate(60px, 60px); }
}

.hero-gradient-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 50%, rgba(6, 182, 212, 0.08) 0%, transparent 60%),
              radial-gradient(circle at 70% 50%, rgba(168, 85, 247, 0.08) 0%, transparent 60%);
}

/* Floating 3D layers */
.floating-layers {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.layer {
  position: absolute;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(168, 85, 247, 0.1));
  backdrop-filter: blur(2px);
}

.layer-1 {
  width: 400px;
  height: 400px;
  top: 10%;
  right: 5%;
  animation: float 8s ease-in-out infinite;
}

.layer-2 {
  width: 300px;
  height: 300px;
  bottom: 20%;
  left: 10%;
  animation: float 10s ease-in-out infinite 1s;
}

.layer-3 {
  width: 250px;
  height: 250px;
  top: 60%;
  right: 15%;
  animation: float 12s ease-in-out infinite 2s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
  50% { transform: translateY(-30px) rotate(5deg); opacity: 0.6; }
}

.hero-badge {
  border: 1px solid rgba(6, 182, 212, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out backwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-btn-primary:hover,
.hero-btn-secondary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(6, 182, 212, 0.45) !important;
}

.stat-item {
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-4px);
}

/* Hero Visual */
.hero-visual {
  perspective: 1000px;
}

.visual-cube {
  transform-style: preserve-3d;
  position: relative;
  border-radius: 32px;
}

.visual-layers {
  position: absolute;
  inset: 0;
}

.v-layer {
  position: absolute;
  inset: 0;
  border: 2px solid rgba(6, 182, 212, 0.2);
  border-radius: 32px;
  animation: pulse-layer 3s ease-in-out infinite;
}

.v-layer:nth-child(1) { animation-delay: 0s; }
.v-layer:nth-child(2) { animation-delay: 1s; }
.v-layer:nth-child(3) { animation-delay: 2s; }

@keyframes pulse-layer {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.05); opacity: 0; }
}

.scroll-indicator {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-bounce {
  animation: bounce 2s ease-in-out infinite;
}

/* Features Section */
.features-section {
  position: relative;
}

.section-badge {
  border: 1px solid rgba(168, 85, 247, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.feature-card {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInUp 0.6s ease-out backwards;
  border-radius: 24px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12) !important;
}

.feature-card-border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  border-radius: 24px 24px 0 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card:hover .feature-card-border {
  opacity: 1;
}

.feature-icon-wrapper {
  position: relative;
  width: 88px;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-icon-bg {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon-bg {
  transform: scale(1.1) rotate(10deg);
}

.feature-icon {
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1);
}

/* Categories Section */
.categories-section {
  position: relative;
}

.category-card {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInUp 0.6s ease-out backwards;
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12) !important;
}

.category-image-wrapper {
  position: relative;
  overflow: hidden;
}

.category-image {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.category-card:hover .category-image {
  transform: scale(1.1);
}

.category-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(15, 23, 42, 0.6) 0%, transparent 60%);
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.category-card:hover .category-overlay {
  opacity: 1;
}

.category-content {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  position: relative;
}

/* CTA Section */
.cta-section {
  position: relative;
  padding: 120px 0;
}

.cta-gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 50%, rgba(6, 182, 212, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 70% 50%, rgba(168, 85, 247, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 50% 80%, rgba(244, 63, 94, 0.08) 0%, transparent 50%);
}

.cta-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6, 182, 212, 0.02) 2px, rgba(6, 182, 212, 0.02) 4px);
}

.cta-icon-wrapper {
  position: relative;
  width: fit-content;
}

.cta-icon-glow {
  position: absolute;
  inset: -20px;
  background: radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%);
  animation: pulse-glow 3s ease-in-out infinite;
  border-radius: 50%;
}

@keyframes pulse-glow {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 0.8; }
}

.trust-badge {
  transition: all 0.3s ease;
  cursor: pointer;
}

.trust-badge:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1) !important;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .hero-section {
    min-height: auto;
  }
  
  .layer {
    display: none;
  }
}

/* Global Button Styles */
:deep(.v-btn) {
  text-transform: none;
  letter-spacing: -0.01em;
}
</style>
