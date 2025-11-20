<script setup>
import { ref } from 'vue'

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
  { name: 'PLA', description: 'Best for display items', icon: 'mdi-leaf' },
  { name: 'ABS', description: 'Durable and heat resistant', icon: 'mdi-fire' },
  { name: 'PETG', description: 'Strong and flexible', icon: 'mdi-water' },
  { name: 'Resin', description: 'High detail finish', icon: 'mdi-diamond-stone' }
]

const qualities = [
  { value: 'draft', label: 'Draft', description: '0.3mm layer height', icon: 'mdi-speedometer' },
  { value: 'standard', label: 'Standard', description: '0.2mm layer height', icon: 'mdi-speedometer-medium' },
  { value: 'high', label: 'High', description: '0.1mm layer height', icon: 'mdi-speedometer-slow' }
]

const colors = [
  { name: 'white', color: '#ffffff' },
  { name: 'black', color: '#1a1a1a' },
  { name: 'gray', color: '#6b7280' },
  { name: 'red', color: '#ef4444' },
  { name: 'blue', color: '#3b82f6' },
  { name: 'green', color: '#22c55e' },
  { name: 'yellow', color: '#eab308' },
  { name: 'orange', color: '#f97316' }
]

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
  <v-container class="py-6 py-md-10">
    <div style="max-width: 1100px; margin: 0 auto;">
      <div class="text-center mb-8">
        <div class="d-inline-flex align-center px-4 py-2 mb-3" style="border: 2px solid black; background: white;">
          <span class="text-body-2 font-weight-bold" style="color: black; text-transform: uppercase; letter-spacing: 1px;">CUSTOM PRINT</span>
        </div>
        <h1 class="text-h4 text-md-h3 font-weight-bold mb-2" style="color: black; text-transform: uppercase;">UPLOAD YOUR DESIGN</h1>
        <p class="text-body-1" style="color: #404040;">Upload your 3D model and get an instant quote</p>
      </div>

      <v-row>
        <!-- Upload Area -->
        <v-col cols="12" lg="6">
          <!-- Dropzone -->
          <div
            v-if="!uploadedFile"
            class="text-center pa-8 pa-md-12"
            :style="{
              border: isDragging ? '4px solid black' : '4px dashed black',
              background: isDragging ? '#f0f0f0' : 'white',
              cursor: 'pointer',
              boxShadow: isDragging ? '8px 8px 0 black' : 'none'
            }"
            @dragover="handleDragOver"
            @dragleave="handleDragLeave"
            @drop="handleDrop"
            @click="$refs.fileInput.click()"
          >
            <input
              ref="fileInput"
              type="file"
              accept=".stl,.obj,.3mf"
              style="display: none;"
              @change="handleFileInput"
            />
            <div
              class="mb-6 mx-auto"
              style="width: 96px; height: 96px; background: black; display: flex; align-items: center; justify-content: center;"
              :class="{ 'upload-icon-active': isDragging }"
            >
              <v-icon icon="mdi-cloud-upload" size="48" color="white"></v-icon>
            </div>
            <p class="text-h5 font-weight-bold mb-2" style="color: black; text-transform: uppercase;">
              DROP YOUR 3D FILE HERE
            </p>
            <p class="text-body-1 mb-6" style="color: #606060;">
              OR CLICK TO BROWSE YOUR FILES
            </p>
            <div class="d-flex justify-center ga-2 flex-wrap">
              <div class="pa-2 px-3" style="border: 2px solid black; background: white;">
                <span style="color: black; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; font-size: 0.75rem;">STL</span>
              </div>
              <div class="pa-2 px-3" style="border: 2px solid black; background: white;">
                <span style="color: black; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; font-size: 0.75rem;">OBJ</span>
              </div>
              <div class="pa-2 px-3" style="border: 2px solid black; background: white;">
                <span style="color: black; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; font-size: 0.75rem;">3MF</span>
              </div>
            </div>
          </div>

          <!-- File Uploaded -->
          <div v-else class="pa-5" style="border: 3px solid black; background: white; box-shadow: 6px 6px 0 black;">
            <div class="d-flex align-start justify-space-between mb-5">
              <div class="d-flex align-center ga-3">
                <div style="width: 56px; height: 56px; background: black; display: flex; align-items: center; justify-content: center;">
                  <v-icon size="28" color="white">mdi-file-3d</v-icon>
                </div>
                <div>
                  <p class="text-h6 font-weight-bold mb-1" style="color: black; text-transform: uppercase;">{{ uploadedFile.name }}</p>
                  <div class="pa-1 px-2" style="border: 2px solid black; background: white; display: inline-block;">
                    <span style="color: black; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; font-size: 0.625rem;">
                      {{ (uploadedFile.size / 1024 / 1024).toFixed(2) }} MB
                    </span>
                  </div>
                </div>
              </div>
              <v-btn
                icon
                variant="text"
                size="small"
                style="border-radius: 0;"
                @click="removeFile"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>

            <!-- 3D Preview -->
            <div
              class="d-flex align-center justify-center mb-5"
              style="aspect-ratio: 1; border: 3px solid black; background: #f5f5f5;"
            >
              <v-progress-circular
                v-if="isAnalyzing"
                indeterminate
                color="black"
                size="64"
                width="6"
              ></v-progress-circular>
              <div v-else class="text-center">
                <v-icon size="64" color="black" class="mb-3" style="opacity: 0.3;">mdi-cube-outline</v-icon>
                <p class="text-body-1 font-weight-bold mb-0" style="color: black; text-transform: uppercase; letter-spacing: 1px;">3D PREVIEW</p>
              </div>
            </div>

            <!-- Model Analysis -->
            <div v-if="modelAnalysis">
              <div class="d-flex align-center mb-4">
                <h3 class="text-h6 font-weight-bold" style="color: black; text-transform: uppercase; letter-spacing: 1px;">MODEL ANALYSIS</h3>
              </div>
              <v-row dense>
                <v-col cols="6">
                  <div class="pa-3" style="border: 2px solid black; background: white;">
                    <p class="text-caption font-weight-bold mb-1" style="color: black; text-transform: uppercase; letter-spacing: 1px;">DIMENSIONS</p>
                    <p class="text-body-2 font-weight-bold mb-0" style="color: black;">
                      {{ modelAnalysis.dimensions.width }} x {{ modelAnalysis.dimensions.height }} x {{ modelAnalysis.dimensions.depth }} mm
                    </p>
                  </div>
                </v-col>
                <v-col cols="6">
                  <div class="pa-3" style="border: 2px solid black; background: white;">
                    <p class="text-caption font-weight-bold mb-1" style="color: black; text-transform: uppercase; letter-spacing: 1px;">VOLUME</p>
                    <p class="text-body-2 font-weight-bold mb-0" style="color: black;">{{ (modelAnalysis.volume / 1000).toFixed(1) }} cm³</p>
                  </div>
                </v-col>
                <v-col cols="6">
                  <div class="pa-3" style="border: 2px solid black; background: white;">
                    <p class="text-caption font-weight-bold mb-1" style="color: black; text-transform: uppercase; letter-spacing: 1px;">TRIANGLES</p>
                    <p class="text-body-2 font-weight-bold mb-0" style="color: black;">{{ modelAnalysis.triangles.toLocaleString() }}</p>
                  </div>
                </v-col>
                <v-col cols="6">
                  <div class="pa-3" style="border: 2px solid black; background: white;">
                    <p class="text-caption font-weight-bold mb-1" style="color: black; text-transform: uppercase; letter-spacing: 1px;">EST. TIME</p>
                    <p class="text-body-2 font-weight-bold mb-0" style="color: black;">{{ modelAnalysis.estimatedTime }}</p>
                  </div>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-col>

        <!-- Print Options -->
        <v-col cols="12" lg="6">
          <div class="pa-5" style="border: 3px solid black; background: white; box-shadow: 6px 6px 0 black;">
            <div class="d-flex align-center mb-5">
              <h2 class="text-h5 font-weight-bold" style="color: black; text-transform: uppercase; letter-spacing: 1px;">PRINT OPTIONS</h2>
            </div>

            <!-- Material -->
            <div class="mb-5">
              <p class="text-body-2 font-weight-bold text-uppercase mb-3" style="letter-spacing: 1px; color: black;">
                MATERIAL
              </p>
              <v-row dense>
                <v-col v-for="material in materials" :key="material.name" cols="6">
                  <div
                    class="pa-3 text-center material-option"
                    :style="{
                      border: '2px solid black',
                      background: printOptions.material === material.name ? 'black' : 'white',
                      color: printOptions.material === material.name ? 'white' : 'black',
                      cursor: 'pointer'
                    }"
                    @click="printOptions.material = material.name"
                  >
                    <v-icon :icon="material.icon" size="24" class="mb-1"></v-icon>
                    <p class="text-body-2 font-weight-bold mb-0" style="text-transform: uppercase; letter-spacing: 1px;">{{ material.name }}</p>
                    <p class="text-caption mb-0" style="opacity: 0.8;">{{ material.description }}</p>
                  </div>
                </v-col>
              </v-row>
            </div>

            <!-- Quality -->
            <div class="mb-5">
              <p class="text-body-2 font-weight-bold text-uppercase mb-3" style="letter-spacing: 1px; color: black;">
                QUALITY
              </p>
              <v-radio-group v-model="printOptions.quality" hide-details>
                <div
                  v-for="quality in qualities"
                  :key="quality.value"
                  class="d-flex align-center justify-space-between py-2 px-3 mb-2 quality-option"
                  :style="{
                    border: '2px solid black',
                    background: printOptions.quality === quality.value ? 'black' : 'white',
                    color: printOptions.quality === quality.value ? 'white' : 'black',
                    cursor: 'pointer'
                  }"
                  @click="printOptions.quality = quality.value"
                >
                  <div class="d-flex align-center">
                    <v-radio :value="quality.value" hide-details :color="printOptions.quality === quality.value ? 'white' : 'black'"></v-radio>
                    <span class="text-body-2 font-weight-bold" style="text-transform: uppercase; letter-spacing: 1px;">{{ quality.label }}</span>
                  </div>
                  <span class="text-caption" style="opacity: 0.8;">{{ quality.description }}</span>
                </div>
              </v-radio-group>
            </div>

            <!-- Infill -->
            <div class="mb-5">
              <div class="d-flex justify-space-between mb-2">
                <p class="text-body-2 font-weight-bold text-uppercase mb-0" style="letter-spacing: 1px; color: black;">
                  INFILL
                </p>
                <div class="pa-1 px-2" style="border: 2px solid black; background: white;">
                  <span style="color: black; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; font-size: 0.75rem;">{{ printOptions.infill }}%</span>
                </div>
              </div>
              <v-slider
                v-model="printOptions.infill"
                :min="10"
                :max="100"
                :step="10"
                thumb-label
                hide-details
                color="black"
                track-color="#d0d0d0"
              ></v-slider>
            </div>

            <!-- Color -->
            <div class="mb-5">
              <p class="text-body-2 font-weight-bold text-uppercase mb-3" style="letter-spacing: 1px; color: black;">
                COLOR
              </p>
              <div class="d-flex flex-wrap ga-2">
                <div
                  v-for="colorOption in colors"
                  :key="colorOption.name"
                  :style="{
                    width: '40px',
                    height: '40px',
                    backgroundColor: colorOption.color,
                    border: '2px solid black',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: printOptions.color === colorOption.name ? '3px 3px 0 black' : 'none'
                  }"
                  @click="printOptions.color = colorOption.name"
                >
                  <v-icon
                    v-if="printOptions.color === colorOption.name"
                    :color="colorOption.name === 'white' || colorOption.name === 'yellow' ? 'black' : 'white'"
                    size="18"
                  >
                    mdi-check
                  </v-icon>
                </div>
              </div>
            </div>

            <!-- Price Quote -->
            <div
              v-if="modelAnalysis"
              class="pa-5 mb-5"
              style="border: 3px solid black; background: black; color: white;"
            >
              <div class="d-flex justify-space-between align-center">
                <div>
                  <p class="text-subtitle-2 font-weight-bold mb-1" style="text-transform: uppercase; letter-spacing: 1px;">ESTIMATED PRICE</p>
                  <p class="text-caption mb-0" style="opacity: 0.8;">Including materials & printing</p>
                </div>
                <div class="text-right">
                  <span class="text-h3 font-weight-bold d-block">
                    ${{ modelAnalysis.estimatedPrice }}
                  </span>
                </div>
              </div>
            </div>

            <v-btn
              size="x-large"
              block
              :disabled="!modelAnalysis"
              class="action-btn"
              style="border-radius: 0; background: black; color: white; font-weight: 700; text-transform: uppercase; border: 2px solid black;"
              @click="addToCart"
            >
              ADD TO CART
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<style scoped>
.upload-icon-active {
  transform: scale(1.05);
}

.material-option:hover,
.quality-option:hover {
  box-shadow: 4px 4px 0 black !important;
  transform: translate(-2px, -2px);
}

.action-btn:not(:disabled):hover {
  box-shadow: 4px 4px 0 black;
  transform: translate(-2px, -2px);
}
</style>
