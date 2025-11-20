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
    <!-- Hero Section -->
    <section class="hero-section position-relative" style="background: white;">

      <v-container class="position-relative py-16 py-md-20">
        <v-row align="center">
          <v-col cols="12" lg="7">
            <!-- Badge -->
            <div class="mb-6">
              <div class="d-inline-flex align-center px-4 py-2" style="border: 2px solid black; background: white;">
                <span class="text-body-2 font-weight-bold" style="color: black; text-transform: uppercase; letter-spacing: 1px;">PREMIUM 3D PRINTING</span>
              </div>
            </div>

            <!-- Main Heading -->
            <h1 class="hero-title mb-6" style="font-family: var(--font-display); font-size: clamp(2.5rem, 6vw, 4.5rem); line-height: 1.1; letter-spacing: -0.03em; color: black; font-weight: 900; text-transform: uppercase;">
              TRANSFORM YOUR
              <span class="d-block mt-2">
                IDEAS INTO REALITY
              </span>
            </h1>

            <!-- Subtitle -->
            <p class="text-h6 text-body-1 mb-8" style="color: #404040; line-height: 1.7; max-width: 580px;">
              Professional 3D printing with cutting-edge technology. From custom designs to rapid prototyping.
            </p>

            <!-- CTA Buttons -->
            <div class="d-flex flex-wrap ga-4 mb-8">
              <v-btn
                to="/products"
                size="x-large"
                elevation="0"
                class="px-8"
                style="border-radius: 0; background: black; color: white; text-transform: uppercase; font-weight: 700; letter-spacing: 1px; border: 2px solid black;"
              >
                BROWSE PRODUCTS
              </v-btn>
              <v-btn
                to="/upload"
                size="x-large"
                variant="outlined"
                class="px-8"
                style="border-radius: 0; border: 2px solid black; color: black; text-transform: uppercase; font-weight: 700; letter-spacing: 1px;"
              >
                UPLOAD DESIGN
              </v-btn>
            </div>

            <!-- Stats -->
            <div class="d-flex flex-wrap ga-8">
              <div v-for="stat in stats" :key="stat.label" class="stat-item">
                <div class="text-h4 font-weight-bold mb-1" style="color: black;">
                  {{ Math.floor(stat.value) }}{{ stat.suffix }}
                </div>
                <div class="text-body-2 font-weight-medium" style="color: #606060; text-transform: uppercase; letter-spacing: 1px;">
                  {{ stat.label }}
                </div>
              </div>
            </div>
          </v-col>

          <!-- Hero Image / 3D Visualization Area -->
          <v-col cols="12" lg="5" class="d-none d-lg-block">
            <div class="position-relative">
              <div class="pa-12 text-center" style="border: 4px solid black; background: white; box-shadow: 8px 8px 0 black;">
                <v-icon size="180" style="color: black;">mdi-cube-outline</v-icon>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>

    </section>

    <!-- Features Section -->
    <section class="features-section section-padding" style="background: #f5f5f5;">
      <v-container>
        <div class="text-center mb-12 mb-md-16">
          <div class="mb-4">
            <div class="d-inline-flex align-center px-4 py-2" style="border: 2px solid black; background: white;">
              <span class="text-body-2 font-weight-bold" style="color: black; text-transform: uppercase; letter-spacing: 1px;">WHY CHOOSE US</span>
            </div>
          </div>
          <h2 class="text-h3 font-weight-bold mb-4" style="font-family: var(--font-display); letter-spacing: -0.02em; color: black; text-transform: uppercase;">
            PRECISION MEETS INNOVATION
          </h2>
          <p class="text-h6 text-body-1 mx-auto" style="color: #404040; max-width: 680px; line-height: 1.7;">
            Cutting-edge 3D printing technology with exceptional craftsmanship.
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
              class="text-center pa-6 h-100"
              style="border: 3px solid black; background: white; box-shadow: 6px 6px 0 black;"
            >
              <!-- Icon -->
              <div class="mb-5">
                <v-icon 
                  :icon="feature.icon" 
                  size="48"
                  style="color: black;"
                ></v-icon>
              </div>
              
              <!-- Content -->
              <h3 class="text-h6 font-weight-bold mb-3" style="color: black; font-family: var(--font-display); text-transform: uppercase; letter-spacing: 1px;">
                {{ feature.title }}
              </h3>
              <p class="text-body-2 mb-0" style="color: #606060; line-height: 1.6;">
                {{ feature.description }}
              </p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Categories Section -->
    <section class="categories-section section-padding" style="background: white;">
      <v-container>
        <div class="d-flex flex-column flex-md-row justify-space-between align-md-center mb-10 ga-4">
          <div>
            <div class="mb-3">
              <div class="d-inline-flex align-center px-4 py-2" style="border: 2px solid black; background: white;">
                <span class="text-body-2 font-weight-bold" style="color: black; text-transform: uppercase; letter-spacing: 1px;">EXPLORE</span>
              </div>
            </div>
            <h2 class="text-h3 font-weight-bold" style="font-family: var(--font-display); letter-spacing: -0.02em; color: black; text-transform: uppercase;">
              SHOP BY CATEGORY
            </h2>
          </div>
          <v-btn
            to="/products"
            size="large"
            style="border-radius: 0; border: 2px solid black; color: black; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; background: white;"
          >
            VIEW ALL
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
                class="overflow-hidden"
                style="border: 3px solid black; background: white; box-shadow: 6px 6px 0 black;"
              >
                <div style="position: relative; overflow: hidden;">
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
                </div>
                
                <div class="pa-5" style="border-top: 3px solid black;">
                  <h3 class="text-h6 font-weight-bold mb-2" style="color: black; font-family: var(--font-display); text-transform: uppercase; letter-spacing: 1px;">
                    {{ category.name }}
                  </h3>
                  <div class="d-flex align-center justify-space-between">
                    <span class="text-body-2 font-weight-bold" style="color: black; text-transform: uppercase; letter-spacing: 1px;">
                      {{ category.count }} ITEMS
                    </span>
                  </div>
                </div>
              </div>
            </router-link>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- CTA Section -->
    <section class="position-relative" style="background: black; color: white;">
      <v-container class="text-center py-16 py-md-20">
        <!-- Icon -->
        <div class="mb-6 mx-auto">
          <div class="d-inline-flex align-center justify-center pa-6" style="border: 4px solid white;">
            <v-icon size="56" style="color: white;">mdi-rocket-launch-outline</v-icon>
          </div>
        </div>

        <h2 class="text-h3 text-md-h2 font-weight-bold mb-5" style="font-family: var(--font-display); letter-spacing: -0.02em; color: white; text-transform: uppercase;">
          READY TO START CREATING?
        </h2>
        
        <p class="text-h6 text-body-1 mb-10 mx-auto" style="color: #d0d0d0; line-height: 1.7; max-width: 680px;">
          Upload your 3D model and receive an instant quote. Expert team ensures precision and quality.
        </p>

        <div class="d-flex flex-wrap justify-center ga-4 mb-10">
          <v-btn
            to="/upload"
            size="x-large"
            class="px-10"
            style="border-radius: 0; background: white; color: black; text-transform: uppercase; font-weight: 700; letter-spacing: 1px; border: 2px solid white;"
          >
            GET STARTED NOW
          </v-btn>
          
          <v-btn
            to="/products"
            size="x-large"
            class="px-10"
            style="border-radius: 0; border: 2px solid white; color: white; text-transform: uppercase; font-weight: 700; letter-spacing: 1px; background: transparent;"
          >
            BROWSE GALLERY
          </v-btn>
        </div>

        <!-- Trust indicators -->
        <div class="d-flex flex-wrap justify-center ga-8 mt-12">
          <div class="pa-4 d-flex align-center ga-3" style="border: 2px solid white; background: white; color: black;">
            <v-icon size="24" style="color: black;">mdi-check-circle</v-icon>
            <span class="text-body-2 font-weight-bold" style="color: black; text-transform: uppercase; letter-spacing: 1px;">FREE SHIPPING</span>
          </div>
          <div class="pa-4 d-flex align-center ga-3" style="border: 2px solid white; background: white; color: black;">
            <v-icon size="24" style="color: black;">mdi-shield-check</v-icon>
            <span class="text-body-2 font-weight-bold" style="color: black; text-transform: uppercase; letter-spacing: 1px;">QUALITY GUARANTEED</span>
          </div>
          <div class="pa-4 d-flex align-center ga-3" style="border: 2px solid white; background: white; color: black;">
            <v-icon size="24" style="color: black;">mdi-clock-fast</v-icon>
            <span class="text-body-2 font-weight-bold" style="color: black; text-transform: uppercase; letter-spacing: 1px;">24H TURNAROUND</span>
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

.section-padding {
  padding: 80px 0;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .hero-section {
    min-height: auto;
  }
}
</style>
