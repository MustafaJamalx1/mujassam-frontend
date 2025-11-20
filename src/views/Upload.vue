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
        <v-chip color="primary" variant="tonal" class="mb-3">Custom Print</v-chip>
        <h1 class="text-h4 text-md-h3 font-weight-bold mb-2">Upload Your Design</h1>
        <p class="text-body-1 text-medium-emphasis">Upload your 3D model and get an instant quote</p>
      </div>

      <v-row>
        <!-- Upload Area -->
        <v-col cols="12" lg="6">
          <!-- Dropzone -->
          <v-card
            v-if="!uploadedFile"
            :variant="isDragging ? 'tonal' : 'outlined'"
            :color="isDragging ? 'primary' : undefined"
            rounded="xl"
            :elevation="isDragging ? 8 : 0"
            class="text-center pa-8 pa-md-12 dropzone-card"
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
            <v-avatar
              color="primary"
              variant="flat"
              size="96"
              class="mb-6 upload-icon"
              :class="{ 'upload-icon-active': isDragging }"
            >
              <v-icon icon="mdi-cloud-upload" size="48"></v-icon>
            </v-avatar>
            <p class="text-h5 font-weight-bold mb-2">
              Drop your 3D file here
            </p>
            <p class="text-body-1 text-medium-emphasis mb-6">
              or click to browse your files
            </p>
            <div class="d-flex justify-center ga-2 flex-wrap">
              <v-chip size="small" variant="tonal" color="primary" prepend-icon="mdi-file-3d">STL</v-chip>
              <v-chip size="small" variant="tonal" color="primary" prepend-icon="mdi-file-3d">OBJ</v-chip>
              <v-chip size="small" variant="tonal" color="primary" prepend-icon="mdi-file-3d">3MF</v-chip>
            </div>
          </v-card>

          <!-- File Uploaded -->
          <v-card v-else rounded="xl" elevation="2" class="uploaded-card">
            <v-card-text class="pa-5">
              <div class="d-flex align-start justify-space-between mb-5">
                <div class="d-flex align-center ga-3">
                  <v-avatar color="success" variant="flat" size="56">
                    <v-icon size="28">mdi-file-3d</v-icon>
                  </v-avatar>
                  <div>
                    <p class="text-h6 font-weight-bold mb-1">{{ uploadedFile.name }}</p>
                    <v-chip size="x-small" color="success" variant="tonal">
                      {{ (uploadedFile.size / 1024 / 1024).toFixed(2) }} MB
                    </v-chip>
                  </div>
                </div>
                <v-btn
                  icon
                  variant="text"
                  size="small"
                  color="error"
                  @click="removeFile"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>

              <!-- 3D Preview -->
              <v-sheet
                color="surface-variant"
                class="d-flex align-center justify-center rounded-xl mb-5 preview-container"
                style="aspect-ratio: 1;"
              >
                <v-progress-circular
                  v-if="isAnalyzing"
                  indeterminate
                  color="primary"
                  size="64"
                  width="6"
                ></v-progress-circular>
                <div v-else class="text-center">
                  <v-icon size="64" color="primary" class="mb-3" style="opacity: 0.6;">mdi-cube-outline</v-icon>
                  <p class="text-body-1 font-weight-medium text-medium-emphasis mb-0">3D Preview</p>
                </div>
              </v-sheet>

              <!-- Model Analysis -->
              <div v-if="modelAnalysis">
                <div class="d-flex align-center mb-4">
                  <v-icon color="primary" class="mr-2">mdi-chart-box</v-icon>
                  <h3 class="text-h6 font-weight-bold">Model Analysis</h3>
                </div>
                <v-row dense>
                  <v-col cols="6">
                    <v-card variant="tonal" rounded="lg" color="primary" class="pa-3 analysis-card">
                      <p class="text-caption font-weight-bold mb-1">Dimensions</p>
                      <p class="text-body-2 font-weight-bold mb-0">
                        {{ modelAnalysis.dimensions.width }} x {{ modelAnalysis.dimensions.height }} x {{ modelAnalysis.dimensions.depth }} mm
                      </p>
                    </v-card>
                  </v-col>
                  <v-col cols="6">
                    <v-card variant="tonal" rounded="lg" color="info" class="pa-3 analysis-card">
                      <p class="text-caption font-weight-bold mb-1">Volume</p>
                      <p class="text-body-2 font-weight-bold mb-0">{{ (modelAnalysis.volume / 1000).toFixed(1) }} cm³</p>
                    </v-card>
                  </v-col>
                  <v-col cols="6">
                    <v-card variant="tonal" rounded="lg" color="secondary" class="pa-3 analysis-card">
                      <p class="text-caption font-weight-bold mb-1">Triangles</p>
                      <p class="text-body-2 font-weight-bold mb-0">{{ modelAnalysis.triangles.toLocaleString() }}</p>
                    </v-card>
                  </v-col>
                  <v-col cols="6">
                    <v-card variant="tonal" rounded="lg" color="success" class="pa-3 analysis-card">
                      <p class="text-caption font-weight-bold mb-1">Est. Time</p>
                      <p class="text-body-2 font-weight-bold mb-0">{{ modelAnalysis.estimatedTime }}</p>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Print Options -->
        <v-col cols="12" lg="6">
          <v-card rounded="xl" elevation="2" class="options-card">
            <v-card-text class="pa-5">
              <div class="d-flex align-center mb-5">
                <v-icon color="primary" size="28" class="mr-2">mdi-tune</v-icon>
                <h2 class="text-h5 font-weight-bold">Print Options</h2>
              </div>

              <!-- Material -->
              <div class="mb-5">
                <p class="text-body-2 font-weight-bold text-uppercase mb-3" style="letter-spacing: 0.5px;">
                  Material
                </p>
                <v-row dense>
                  <v-col v-for="material in materials" :key="material.name" cols="6">
                    <v-card
                      :variant="printOptions.material === material.name ? 'tonal' : 'outlined'"
                      :color="printOptions.material === material.name ? 'primary' : undefined"
                      rounded="lg"
                      class="material-option"
                      @click="printOptions.material = material.name"
                    >
                      <v-card-text class="pa-3 text-center">
                        <v-icon :icon="material.icon" size="24" class="mb-1"></v-icon>
                        <p class="text-body-2 font-weight-medium mb-0">{{ material.name }}</p>
                        <p class="text-caption text-medium-emphasis mb-0">{{ material.description }}</p>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </div>

              <!-- Quality -->
              <div class="mb-5">
                <p class="text-body-2 font-weight-bold text-uppercase mb-3" style="letter-spacing: 0.5px;">
                  Quality
                </p>
                <v-radio-group v-model="printOptions.quality" hide-details>
                  <v-card
                    v-for="quality in qualities"
                    :key="quality.value"
                    :variant="printOptions.quality === quality.value ? 'tonal' : 'outlined'"
                    :color="printOptions.quality === quality.value ? 'primary' : undefined"
                    rounded="lg"
                    class="mb-2 quality-option"
                    @click="printOptions.quality = quality.value"
                  >
                    <v-card-text class="d-flex align-center justify-space-between py-2 px-3">
                      <div class="d-flex align-center">
                        <v-radio :value="quality.value" hide-details></v-radio>
                        <v-icon :icon="quality.icon" size="18" class="ml-1 mr-2"></v-icon>
                        <span class="text-body-2 font-weight-medium">{{ quality.label }}</span>
                      </div>
                      <span class="text-caption text-medium-emphasis">{{ quality.description }}</span>
                    </v-card-text>
                  </v-card>
                </v-radio-group>
              </div>

              <!-- Infill -->
              <div class="mb-5">
                <div class="d-flex justify-space-between mb-2">
                  <p class="text-body-2 font-weight-bold text-uppercase mb-0" style="letter-spacing: 0.5px;">
                    Infill
                  </p>
                  <v-chip size="small" variant="tonal" color="primary">{{ printOptions.infill }}%</v-chip>
                </div>
                <v-slider
                  v-model="printOptions.infill"
                  :min="10"
                  :max="100"
                  :step="10"
                  thumb-label
                  hide-details
                  color="primary"
                  track-color="grey-lighten-2"
                ></v-slider>
              </div>

              <!-- Color -->
              <div class="mb-5">
                <p class="text-body-2 font-weight-bold text-uppercase mb-3" style="letter-spacing: 0.5px;">
                  Color
                </p>
                <div class="d-flex flex-wrap ga-2">
                  <v-btn
                    v-for="colorOption in colors"
                    :key="colorOption.name"
                    icon
                    size="small"
                    :style="{
                      backgroundColor: colorOption.color,
                      border: colorOption.name === 'white' ? '1px solid #e5e5e5' : 'none'
                    }"
                    :elevation="printOptions.color === colorOption.name ? 4 : 0"
                    @click="printOptions.color = colorOption.name"
                  >
                    <v-icon
                      v-if="printOptions.color === colorOption.name"
                      :color="colorOption.name === 'white' || colorOption.name === 'yellow' ? 'black' : 'white'"
                      size="18"
                    >
                      mdi-check
                    </v-icon>
                  </v-btn>
                </div>
              </div>

              <!-- Price Quote -->
              <v-card
                v-if="modelAnalysis"
                variant="tonal"
                rounded="xl"
                color="accent"
                class="quote-card mb-5"
              >
                <v-card-text class="pa-5">
                  <div class="d-flex justify-space-between align-center">
                    <div>
                      <p class="text-subtitle-2 font-weight-bold mb-1">Estimated Price</p>
                      <p class="text-caption mb-0" style="opacity: 0.8;">Including materials & printing</p>
                    </div>
                    <div class="text-right">
                      <span class="text-h3 font-weight-bold d-block">
                        ${{ modelAnalysis.estimatedPrice }}
                      </span>
                    </div>
                  </div>
                </v-card-text>
              </v-card>

              <v-btn
                color="primary"
                size="x-large"
                block
                rounded="lg"
                :disabled="!modelAnalysis"
                elevation="4"
                class="action-btn"
                @click="addToCart"
              >
                <v-icon start size="24">mdi-cart-plus</v-icon>
                Add to Cart
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<style scoped>
.dropzone-card {
  border: 3px dashed rgba(var(--v-border-color), 0.3);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropzone-card:hover {
  border-color: rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-primary), 0.04);
  transform: translateY(-2px);
}

.upload-icon {
  transition: transform 0.3s ease;
}

.upload-icon-active {
  transform: scale(1.1);
}

.uploaded-card {
  border: 1px solid rgba(var(--v-border-color), 0.12);
}

.preview-container {
  border: 2px solid rgba(var(--v-border-color), 0.08);
}

.analysis-card {
  transition: transform 0.2s ease;
}

.analysis-card:hover {
  transform: translateY(-2px);
}

.options-card {
  border: 1px solid rgba(var(--v-border-color), 0.08);
}

.material-option,
.quality-option {
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid rgba(var(--v-border-color), 0.12);
}

.material-option:hover,
.quality-option:hover {
  transform: translateY(-2px);
}

.quote-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.action-btn {
  text-transform: none;
  font-weight: 700;
  letter-spacing: 0.5px;
  transition: transform 0.2s ease;
}

.action-btn:not(:disabled):hover {
  transform: translateY(-2px);
}

/* Color picker buttons */
:deep(.v-btn) {
  transition: all 0.2s ease;
}
</style>
