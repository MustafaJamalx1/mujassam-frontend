<script setup>
import { RouterLink } from 'vue-router'
import Button from '@/components/common/Button.vue'
import Card from '@/components/common/Card.vue'

const features = [
  {
    icon: '🎨',
    title: 'Custom Designs',
    description: 'Upload your own 3D models and bring your ideas to life'
  },
  {
    icon: '⚡',
    title: 'Fast Printing',
    description: 'Quick turnaround times with high-quality results'
  },
  {
    icon: '🔧',
    title: 'Multiple Materials',
    description: 'Choose from PLA, ABS, PETG, and more premium materials'
  },
  {
    icon: '📦',
    title: 'Worldwide Shipping',
    description: 'We deliver your prints anywhere in the world'
  }
]

const categories = [
  { name: 'Figurines', image: '/images/categories/figurines.jpg', count: 24 },
  { name: 'Home Decor', image: '/images/categories/decor.jpg', count: 18 },
  { name: 'Gadgets', image: '/images/categories/gadgets.jpg', count: 32 },
  { name: 'Art', image: '/images/categories/art.jpg', count: 15 }
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <div class="container-app py-20 lg:py-32">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Bring Your Ideas to
            <span class="text-secondary-400">Life</span>
          </h1>
          <p class="text-xl text-primary-100 mb-8">
            Professional 3D printing services for creators, designers, and innovators.
            Upload your designs or browse our curated collection.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <RouterLink to="/products">
              <Button variant="secondary" size="lg">
                Browse Products
              </Button>
            </RouterLink>
            <RouterLink to="/upload">
              <Button variant="outline" size="lg" class="border-white text-white hover:bg-white/10">
                Upload Your Design
              </Button>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white">
      <div class="container-app">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Why Choose Mujassam?</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            We combine cutting-edge technology with exceptional service to deliver the best 3D printing experience.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card v-for="feature in features" :key="feature.title" padding="md" class="text-center">
            <div class="text-4xl mb-4">{{ feature.icon }}</div>
            <h3 class="font-semibold text-lg mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600 text-sm">{{ feature.description }}</p>
          </Card>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-16 bg-gray-50">
      <div class="container-app">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900">Shop by Category</h2>
          <RouterLink to="/products" class="text-primary-600 hover:text-primary-700 font-medium">
            View All →
          </RouterLink>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <RouterLink
            v-for="category in categories"
            :key="category.name"
            :to="`/products?category=${category.name.toLowerCase()}`"
            class="group"
          >
            <Card padding="none" hoverable>
              <div class="aspect-square bg-gray-200 relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div class="absolute bottom-4 left-4 text-white">
                  <h3 class="font-semibold text-lg">{{ category.name }}</h3>
                  <p class="text-sm text-gray-300">{{ category.count }} items</p>
                </div>
              </div>
            </Card>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-primary-900 text-white">
      <div class="container-app text-center">
        <h2 class="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
        <p class="text-primary-200 mb-8 max-w-2xl mx-auto">
          Upload your 3D model and get an instant quote. Our team will review your design and ensure the best print quality.
        </p>
        <RouterLink to="/upload">
          <Button variant="secondary" size="lg">
            Get Started Now
          </Button>
        </RouterLink>
      </div>
    </section>
  </div>
</template>
