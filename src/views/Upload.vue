<script setup>
import { ref } from 'vue'
import Button from '@/components/common/Button.vue'
import Card from '@/components/common/Card.vue'
import Input from '@/components/common/Input.vue'

const isDragging = ref(false)
const uploadedFile = ref(null)
const isAnalyzing = ref(false)

const modelAnalysis = ref(null)

const printOptions = ref({
  material: 'PLA',
  infill: 20,
  quality: 'standard',
  color: 'white'
})

const materials = [
  { name: 'PLA', description: 'Best for display items' },
  { name: 'ABS', description: 'Durable and heat resistant' },
  { name: 'PETG', description: 'Strong and flexible' },
  { name: 'Resin', description: 'High detail finish' }
]

const qualities = [
  { value: 'draft', label: 'Draft', description: '0.3mm layer height' },
  { value: 'standard', label: 'Standard', description: '0.2mm layer height' },
  { value: 'high', label: 'High', description: '0.1mm layer height' }
]

const colors = ['white', 'black', 'gray', 'red', 'blue', 'green', 'yellow', 'orange']

function handleDragOver(e) {
  e.preventDefault()
  isDragging.value = true
}

function handleDragLeave() {
  isDragging.value = false
}

function handleDrop(e) {
  e.preventDefault()
  isDragging.value = false
  const files = e.dataTransfer.files
  if (files.length > 0) {
    handleFile(files[0])
  }
}

function handleFileInput(e) {
  const files = e.target.files
  if (files.length > 0) {
    handleFile(files[0])
  }
}

function handleFile(file) {
  const validExtensions = ['.stl', '.obj', '.3mf']
  const extension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'))

  if (!validExtensions.includes(extension)) {
    alert('Please upload a valid 3D file (STL, OBJ, or 3MF)')
    return
  }

  uploadedFile.value = file
  analyzeModel()
}

async function analyzeModel() {
  isAnalyzing.value = true

  // Simulate analysis
  await new Promise(resolve => setTimeout(resolve, 2000))

  modelAnalysis.value = {
    dimensions: { width: 50, height: 80, depth: 50 },
    volume: 125000,
    surfaceArea: 15000,
    triangles: 45000,
    estimatedPrice: 24.99,
    estimatedTime: '6 hours'
  }

  isAnalyzing.value = false
}

function removeFile() {
  uploadedFile.value = null
  modelAnalysis.value = null
}

function addToCart() {
  // TODO: Implement add to cart functionality
  alert('Added to cart!')
}
</script>

<template>
  <div class="bg-gray-50 min-h-screen py-8">
    <div class="container-app">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Upload Your Design</h1>
        <p class="text-gray-600 mb-8">Upload your 3D model and get an instant quote</p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Upload Area -->
          <div>
            <!-- Dropzone -->
            <div
              v-if="!uploadedFile"
              :class="[
                'border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer',
                isDragging
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-300 hover:border-primary-400'
              ]"
              @dragover="handleDragOver"
              @dragleave="handleDragLeave"
              @drop="handleDrop"
              @click="$refs.fileInput.click()"
            >
              <input
                ref="fileInput"
                type="file"
                accept=".stl,.obj,.3mf"
                class="hidden"
                @change="handleFileInput"
              />
              <div class="text-4xl mb-4">📁</div>
              <p class="font-medium text-gray-900 mb-2">
                Drop your 3D file here
              </p>
              <p class="text-sm text-gray-500 mb-4">
                or click to browse
              </p>
              <p class="text-xs text-gray-400">
                Supported formats: STL, OBJ, 3MF
              </p>
            </div>

            <!-- File Uploaded -->
            <Card v-else padding="md">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <span class="text-primary-600">📄</span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ uploadedFile.name }}</p>
                    <p class="text-sm text-gray-500">
                      {{ (uploadedFile.size / 1024 / 1024).toFixed(2) }} MB
                    </p>
                  </div>
                </div>
                <button
                  class="text-gray-400 hover:text-gray-600"
                  @click="removeFile"
                >
                  ✕
                </button>
              </div>

              <!-- 3D Preview -->
              <div class="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <span v-if="isAnalyzing" class="text-gray-400">Analyzing...</span>
                <span v-else class="text-gray-400">3D Preview</span>
              </div>

              <!-- Model Analysis -->
              <div v-if="modelAnalysis" class="space-y-3">
                <h3 class="font-semibold">Model Analysis</h3>
                <div class="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span class="text-gray-500">Dimensions</span>
                    <p class="font-medium">
                      {{ modelAnalysis.dimensions.width }} x {{ modelAnalysis.dimensions.height }} x {{ modelAnalysis.dimensions.depth }} mm
                    </p>
                  </div>
                  <div>
                    <span class="text-gray-500">Volume</span>
                    <p class="font-medium">{{ (modelAnalysis.volume / 1000).toFixed(1) }} cm³</p>
                  </div>
                  <div>
                    <span class="text-gray-500">Triangles</span>
                    <p class="font-medium">{{ modelAnalysis.triangles.toLocaleString() }}</p>
                  </div>
                  <div>
                    <span class="text-gray-500">Est. Time</span>
                    <p class="font-medium">{{ modelAnalysis.estimatedTime }}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <!-- Print Options -->
          <div>
            <Card padding="md">
              <h2 class="font-semibold text-lg mb-4">Print Options</h2>

              <!-- Material -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Material</label>
                <div class="grid grid-cols-2 gap-2">
                  <button
                    v-for="material in materials"
                    :key="material.name"
                    :class="[
                      'p-3 border rounded-lg text-left transition-colors',
                      printOptions.material === material.name
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    ]"
                    @click="printOptions.material = material.name"
                  >
                    <p class="font-medium text-sm">{{ material.name }}</p>
                    <p class="text-xs text-gray-500">{{ material.description }}</p>
                  </button>
                </div>
              </div>

              <!-- Quality -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Quality</label>
                <div class="space-y-2">
                  <label
                    v-for="quality in qualities"
                    :key="quality.value"
                    :class="[
                      'flex items-center justify-between p-3 border rounded-lg cursor-pointer',
                      printOptions.quality === quality.value
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200'
                    ]"
                  >
                    <div class="flex items-center">
                      <input
                        v-model="printOptions.quality"
                        type="radio"
                        :value="quality.value"
                        class="text-primary-600"
                      />
                      <span class="ml-2 font-medium text-sm">{{ quality.label }}</span>
                    </div>
                    <span class="text-xs text-gray-500">{{ quality.description }}</span>
                  </label>
                </div>
              </div>

              <!-- Infill -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Infill: {{ printOptions.infill }}%
                </label>
                <input
                  v-model="printOptions.infill"
                  type="range"
                  min="10"
                  max="100"
                  step="10"
                  class="w-full"
                />
              </div>

              <!-- Color -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="color in colors"
                    :key="color"
                    :class="[
                      'w-8 h-8 rounded-full border-2 transition-all',
                      printOptions.color === color ? 'ring-2 ring-primary-500 ring-offset-2' : ''
                    ]"
                    :style="{ backgroundColor: color }"
                    @click="printOptions.color = color"
                  />
                </div>
              </div>

              <!-- Price Quote -->
              <div v-if="modelAnalysis" class="bg-gray-50 rounded-lg p-4 mb-4">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Estimated Price</span>
                  <span class="text-2xl font-bold text-primary-600">
                    ${{ modelAnalysis.estimatedPrice }}
                  </span>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                :disabled="!modelAnalysis"
                @click="addToCart"
              >
                Add to Cart
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
