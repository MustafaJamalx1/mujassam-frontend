<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentStep = ref(1)
const isDragging = ref(false)
const uploadedFile = ref(null)
const uploadProgress = ref(0)
const isUploading = ref(false)

// Step 2 config
const selectedMaterial = ref('PLA')
const selectedColor = ref('Natural White')
const selectedFinish = ref('Standard')
const quantity = ref(1)

// Step 3 quote
const quoteGenerated = ref(false)
const estimatedPrice = ref(0)
const estimatedDays = ref(3)

const materials = [
  { id: 'PLA',    label: 'PLA',    note: 'Most popular. Eco-friendly, great detail.',  price: 0 },
  { id: 'PETG',   label: 'PETG',   note: 'Stronger than PLA. Slight flex, heat-resistant.', price: 1.5 },
  { id: 'ABS',    label: 'ABS',    note: 'Industrial strength. Post-processing friendly.', price: 3 },
  { id: 'Resin',  label: 'Resin',  note: 'Ultra-fine detail. Best for small figurines.', price: 6 },
]

const colors = ['Natural White', 'Matte Black', 'Burnt Orange', 'Slate Grey', 'Forest Green', 'Ivory Cream']
const finishes = [
  { id: 'Standard',    label: 'Standard',    note: 'Visible layer lines' },
  { id: 'Sanded',      label: 'Sanded',      note: '+$4 — Smooth surface' },
  { id: 'Primed',      label: 'Primed',      note: '+$8 — Ready to paint' },
]

const selectedMaterialObj = computed(() => materials.find(m => m.id === selectedMaterial.value))
const finishSurcharge = computed(() => {
  if (selectedFinish.value === 'Sanded') return 4
  if (selectedFinish.value === 'Primed') return 8
  return 0
})

const acceptedFormats = '.stl,.obj,.3mf,.step,.stp'

function onDrop(e) {
  isDragging.value = false
  const file = e.dataTransfer?.files?.[0] || e.target?.files?.[0]
  if (file) handleFile(file)
}

function handleFile(file) {
  const allowed = ['stl', 'obj', '3mf', 'step', 'stp']
  const ext = file.name.split('.').pop().toLowerCase()
  if (!allowed.includes(ext)) return
  uploadedFile.value = file
  simulateUpload()
}

function simulateUpload() {
  isUploading.value = true
  uploadProgress.value = 0
  const interval = setInterval(() => {
    uploadProgress.value += 8
    if (uploadProgress.value >= 100) {
      uploadProgress.value = 100
      isUploading.value = false
      clearInterval(interval)
    }
  }, 80)
}

function removeFile() {
  uploadedFile.value = null
  uploadProgress.value = 0
}

function goToStep(n) {
  if (n < currentStep.value) { currentStep.value = n; return }
  if (n === 2 && uploadedFile.value && !isUploading.value) currentStep.value = 2
  if (n === 3 && uploadedFile.value && !isUploading.value) generateQuote()
}

function generateQuote() {
  const base = 15
  const matPrice = selectedMaterialObj.value?.price || 0
  estimatedPrice.value = ((base + matPrice + finishSurcharge.value) * quantity.value).toFixed(2)
  estimatedDays.value = selectedMaterial.value === 'Resin' ? 5 : 3
  quoteGenerated.value = true
  currentStep.value = 3
}

const fileSizeLabel = computed(() => {
  if (!uploadedFile.value) return ''
  const bytes = uploadedFile.value.size
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
})

function addToCartAndRoute() {
  router.push('/cart')
}
</script>

<template>
  <div class="upload-page">
    <div class="container">

      <!-- Page header -->
      <div class="page-head">
        <span class="section-label">Custom order</span>
        <h1 class="page-title">Upload your design</h1>
        <p class="page-sub">Get a custom quote in three simple steps.</p>
      </div>

      <!-- Step indicator -->
      <div class="steps-indicator">
        <button
          v-for="n in 3"
          :key="n"
          class="step-dot"
          :class="{
            'step-dot--active': currentStep === n,
            'step-dot--done': currentStep > n,
          }"
          @click="goToStep(n)"
        >
          <span class="step-dot-num">
            <v-icon v-if="currentStep > n" size="14">mdi-check</v-icon>
            <span v-else>{{ n }}</span>
          </span>
          <span class="step-dot-label">
            {{ n === 1 ? 'Upload file' : n === 2 ? 'Configure' : 'Get quote' }}
          </span>
        </button>
        <div class="step-line"></div>
      </div>

      <!-- ─── Step 1: Upload ────────────────────────────────────── -->
      <div v-if="currentStep === 1" class="step-panel">
        <div class="upload-area-wrap">

          <!-- Drop zone -->
          <div
            class="drop-zone"
            :class="{ 'drop-zone--dragging': isDragging, 'drop-zone--has-file': uploadedFile }"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="onDrop"
          >
            <div v-if="!uploadedFile" class="drop-empty">
              <div class="drop-icon-wrap">
                <v-icon size="40" style="color: var(--color-terracotta);">mdi-cloud-upload-outline</v-icon>
              </div>
              <h3 class="drop-title">Drop your 3D file here</h3>
              <p class="drop-sub">or click to browse — STL, OBJ, 3MF, STEP</p>
              <label class="browse-btn">
                <input type="file" :accept="acceptedFormats" @change="onDrop" class="sr-only" />
                Choose file
              </label>
            </div>

            <div v-else class="drop-file">
              <div class="file-icon">
                <v-icon size="32" style="color: var(--color-terracotta);">mdi-file-cad-box</v-icon>
              </div>
              <div class="file-info">
                <span class="file-name">{{ uploadedFile.name }}</span>
                <span class="file-size">{{ fileSizeLabel }}</span>
                <div v-if="isUploading" class="file-progress">
                  <div class="progress-track">
                    <div class="progress-fill" :style="{ width: uploadProgress + '%' }"></div>
                  </div>
                  <span class="progress-label">{{ uploadProgress }}%</span>
                </div>
                <span v-else class="file-ready">
                  <v-icon size="14" style="color:#27795B;">mdi-check-circle</v-icon>
                  Ready
                </span>
              </div>
              <button class="file-remove" @click="removeFile">
                <v-icon size="18">mdi-close</v-icon>
              </button>
            </div>
          </div>

          <!-- Supported formats -->
          <div class="formats-note">
            <v-icon size="14" style="color: var(--color-muted-light);">mdi-information-outline</v-icon>
            Supported: STL, OBJ, 3MF, STEP / Max file size: 256 MB
          </div>
        </div>

        <div class="step-nav">
          <button
            class="btn-primary"
            :disabled="!uploadedFile || isUploading"
            @click="currentStep = 2"
          >
            Continue to configure
            <v-icon size="16">mdi-arrow-right</v-icon>
          </button>
        </div>
      </div>

      <!-- ─── Step 2: Configure ─────────────────────────────────── -->
      <div v-if="currentStep === 2" class="step-panel">
        <div class="config-grid">

          <!-- Material -->
          <div class="config-section">
            <h3 class="config-title">Material</h3>
            <div class="material-cards">
              <button
                v-for="mat in materials"
                :key="mat.id"
                class="material-card"
                :class="{ 'material-card--active': selectedMaterial === mat.id }"
                @click="selectedMaterial = mat.id"
              >
                <div class="mat-head">
                  <span class="mat-label">{{ mat.label }}</span>
                  <span v-if="mat.price > 0" class="mat-price">+${{ mat.price }}</span>
                </div>
                <p class="mat-note">{{ mat.note }}</p>
              </button>
            </div>
          </div>

          <!-- Color + Finish + Quantity -->
          <div class="config-section">
            <h3 class="config-title">Color</h3>
            <div class="option-chips">
              <button
                v-for="col in colors"
                :key="col"
                class="option-chip"
                :class="{ 'option-chip--active': selectedColor === col }"
                @click="selectedColor = col"
              >
                {{ col }}
              </button>
            </div>

            <h3 class="config-title" style="margin-top: 28px;">Surface finish</h3>
            <div class="finish-cards">
              <button
                v-for="fin in finishes"
                :key="fin.id"
                class="finish-card"
                :class="{ 'finish-card--active': selectedFinish === fin.id }"
                @click="selectedFinish = fin.id"
              >
                <span class="fin-label">{{ fin.label }}</span>
                <span class="fin-note">{{ fin.note }}</span>
              </button>
            </div>

            <h3 class="config-title" style="margin-top: 28px;">Quantity</h3>
            <div class="quantity-picker">
              <button class="qty-btn" @click="quantity = Math.max(1, quantity - 1)">
                <v-icon size="16">mdi-minus</v-icon>
              </button>
              <span class="qty-value">{{ quantity }}</span>
              <button class="qty-btn" @click="quantity++">
                <v-icon size="16">mdi-plus</v-icon>
              </button>
            </div>
          </div>
        </div>

        <div class="step-nav">
          <button class="btn-ghost" @click="currentStep = 1">
            <v-icon size="16">mdi-arrow-left</v-icon>
            Back
          </button>
          <button class="btn-primary" @click="generateQuote">
            Get my quote
            <v-icon size="16">mdi-arrow-right</v-icon>
          </button>
        </div>
      </div>

      <!-- ─── Step 3: Quote ─────────────────────────────────────── -->
      <div v-if="currentStep === 3" class="step-panel">
        <div class="quote-layout">
          <div class="quote-card">
            <div class="quote-header">
              <v-icon size="28" style="color: var(--color-terracotta);">mdi-receipt-text-outline</v-icon>
              <h2 class="quote-title">Your estimate</h2>
            </div>

            <div class="quote-lines">
              <div class="quote-line">
                <span>File</span>
                <span>{{ uploadedFile?.name }}</span>
              </div>
              <div class="quote-line">
                <span>Material</span>
                <span>{{ selectedMaterial }}</span>
              </div>
              <div class="quote-line">
                <span>Color</span>
                <span>{{ selectedColor }}</span>
              </div>
              <div class="quote-line">
                <span>Finish</span>
                <span>{{ selectedFinish }}</span>
              </div>
              <div class="quote-line">
                <span>Quantity</span>
                <span>× {{ quantity }}</span>
              </div>
              <div class="quote-line quote-line--total">
                <span>Total estimate</span>
                <span class="quote-price">${{ estimatedPrice }}</span>
              </div>
              <div class="quote-line">
                <span>Estimated delivery</span>
                <span>{{ estimatedDays }}–{{ estimatedDays + 2 }} business days</span>
              </div>
            </div>

            <p class="quote-note">
              This is a non-binding estimate. Final price confirmed after file review.
            </p>
          </div>

          <div class="quote-actions">
            <button class="btn-primary" @click="addToCartAndRoute">
              <v-icon size="18">mdi-cart-plus</v-icon>
              Add to cart
            </button>
            <button class="btn-ghost" @click="currentStep = 2">
              <v-icon size="16">mdi-arrow-left</v-icon>
              Adjust options
            </button>
            <a href="mailto:hello@mujassam.com" class="contact-link">
              Have questions? Email us
            </a>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.upload-page {
  background: var(--color-cream);
  min-height: 100vh;
  padding-top: 64px;
}
.container {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 24px 80px;
}

/* Page header */
.page-head {
  padding: 48px 0 36px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.page-title {
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 3.5vw, 2.8rem);
  font-weight: 700;
  color: var(--color-ink);
  letter-spacing: -0.03em;
  margin: 0;
}
.page-sub {
  font-size: 1rem;
  color: var(--color-muted);
  margin: 0;
}

/* Step indicator */
.steps-indicator {
  display: flex;
  align-items: flex-start;
  gap: 0;
  margin-bottom: 40px;
  position: relative;
}
.step-line {
  position: absolute;
  top: 18px;
  left: 18px;
  right: 18px;
  height: 2px;
  background: var(--color-divider);
  z-index: 0;
}
.step-dot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1;
}
.step-dot-num {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid var(--color-divider);
  background: var(--color-cream);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-muted);
  transition: all var(--duration-base) var(--ease-out);
}
.step-dot--active .step-dot-num {
  border-color: var(--color-terracotta);
  background: var(--color-terracotta);
  color: #fff;
  box-shadow: 0 0 0 4px rgba(184,92,56,0.15);
}
.step-dot--done .step-dot-num {
  border-color: #27795B;
  background: #27795B;
  color: #fff;
}
.step-dot-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-muted);
}
.step-dot--active .step-dot-label { color: var(--color-terracotta); }
.step-dot--done .step-dot-label   { color: #27795B; }

/* Step panel */
.step-panel {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* Drop zone */
.upload-area-wrap { display: flex; flex-direction: column; gap: 12px; }

.drop-zone {
  border: 2px dashed var(--color-divider);
  border-radius: var(--radius-xl);
  background: #fff;
  padding: 56px 32px;
  transition: border-color var(--duration-base) var(--ease-out),
              background var(--duration-base) var(--ease-out);
  cursor: default;
}
.drop-zone--dragging {
  border-color: var(--color-terracotta);
  background: rgba(184,92,56,0.04);
}
.drop-zone--has-file {
  padding: 24px 28px;
  border-style: solid;
  border-color: var(--color-divider);
}

.drop-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
}
.drop-icon-wrap {
  width: 72px;
  height: 72px;
  border-radius: var(--radius-xl);
  background: rgba(184,92,56,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
}
.drop-title {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-ink);
  margin: 0;
}
.drop-sub {
  font-size: 0.875rem;
  color: var(--color-muted);
  margin: 0;
}
.browse-btn {
  display: inline-flex;
  align-items: center;
  padding: 10px 24px;
  border: 1.5px solid var(--color-terracotta);
  border-radius: var(--radius-lg);
  color: var(--color-terracotta);
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 4px;
  transition: background var(--duration-fast), color var(--duration-fast);
}
.browse-btn:hover {
  background: var(--color-terracotta);
  color: #fff;
}

.drop-file {
  display: flex;
  align-items: center;
  gap: 16px;
}
.file-icon {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-md);
  background: rgba(184,92,56,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.file-info { flex: 1; display: flex; flex-direction: column; gap: 4px; }
.file-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-ink);
}
.file-size { font-size: 0.8rem; color: var(--color-muted); }
.file-progress { display: flex; align-items: center; gap: 8px; }
.progress-track {
  flex: 1;
  height: 4px;
  background: var(--color-divider);
  border-radius: 2px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: var(--color-terracotta);
  border-radius: 2px;
  transition: width 0.15s ease;
}
.progress-label { font-size: 0.75rem; color: var(--color-muted); }
.file-ready {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #27795B;
}
.file-remove {
  background: none;
  border: none;
  color: var(--color-muted);
  cursor: pointer;
  display: flex;
  padding: 4px;
  border-radius: var(--radius-sm);
  transition: color var(--duration-fast), background var(--duration-fast);
}
.file-remove:hover { color: #C0392B; background: rgba(192,57,43,0.08); }

.formats-note {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
  color: var(--color-muted-light);
}

/* Config */
.config-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
}
@media (min-width: 640px) {
  .config-grid { grid-template-columns: 1fr 1fr; }
}
.config-section { display: flex; flex-direction: column; gap: 14px; }
.config-title {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-ink);
  letter-spacing: -0.02em;
  margin: 0;
}

.material-cards { display: flex; flex-direction: column; gap: 8px; }
.material-card {
  padding: 14px 16px;
  border: 1.5px solid var(--color-divider);
  border-radius: var(--radius-md);
  background: #fff;
  text-align: left;
  cursor: pointer;
  transition: border-color var(--duration-fast), background var(--duration-fast);
}
.material-card:hover { border-color: var(--color-muted-light); }
.material-card--active {
  border-color: var(--color-terracotta);
  background: rgba(184,92,56,0.05);
}
.mat-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}
.mat-label { font-size: 0.9rem; font-weight: 700; color: var(--color-ink); }
.mat-price { font-size: 0.78rem; font-weight: 600; color: var(--color-terracotta); }
.mat-note { font-size: 0.78rem; color: var(--color-muted); margin: 0; line-height: 1.5; }

.option-chips { display: flex; flex-wrap: wrap; gap: 6px; }
.option-chip {
  padding: 6px 14px;
  border: 1.5px solid var(--color-divider);
  border-radius: var(--radius-pill);
  background: #fff;
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--color-ink);
  cursor: pointer;
  transition: border-color var(--duration-fast), background var(--duration-fast);
}
.option-chip:hover { border-color: var(--color-muted-light); }
.option-chip--active {
  border-color: var(--color-terracotta);
  background: rgba(184,92,56,0.07);
  color: var(--color-terracotta);
  font-weight: 600;
}

.finish-cards { display: flex; flex-direction: column; gap: 8px; }
.finish-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border: 1.5px solid var(--color-divider);
  border-radius: var(--radius-md);
  background: #fff;
  cursor: pointer;
  transition: border-color var(--duration-fast), background var(--duration-fast);
}
.finish-card:hover { border-color: var(--color-muted-light); }
.finish-card--active {
  border-color: var(--color-terracotta);
  background: rgba(184,92,56,0.05);
}
.fin-label { font-size: 0.875rem; font-weight: 600; color: var(--color-ink); }
.fin-note  { font-size: 0.78rem; color: var(--color-muted); }

.quantity-picker {
  display: inline-flex;
  align-items: center;
  border: 1.5px solid var(--color-divider);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: #fff;
}
.qty-btn {
  width: 42px;
  height: 42px;
  border: none;
  background: transparent;
  color: var(--color-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--duration-fast);
}
.qty-btn:hover { background: var(--color-cream); color: var(--color-ink); }
.qty-value {
  min-width: 44px;
  text-align: center;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-ink);
  border-left: 1px solid var(--color-divider);
  border-right: 1px solid var(--color-divider);
  line-height: 42px;
}

/* Quote */
.quote-layout { display: flex; flex-direction: column; gap: 24px; }
.quote-card {
  background: #fff;
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-xl);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.quote-header {
  display: flex;
  align-items: center;
  gap: 12px;
}
.quote-title {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-ink);
  letter-spacing: -0.02em;
  margin: 0;
}
.quote-lines { display: flex; flex-direction: column; gap: 0; }
.quote-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--color-divider);
  font-size: 0.9rem;
  color: var(--color-muted);
}
.quote-line span:last-child { color: var(--color-ink); font-weight: 500; }
.quote-line--total {
  padding: 16px 0;
  font-weight: 700;
  font-size: 1rem;
  color: var(--color-ink);
  border-bottom-width: 2px;
}
.quote-price {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--color-terracotta) !important;
  letter-spacing: -0.04em;
}
.quote-note {
  font-size: 0.78rem;
  color: var(--color-muted-light);
  margin: 0;
  line-height: 1.6;
}
.quote-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Nav buttons */
.step-nav {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: var(--color-terracotta);
  color: #fff;
  border: none;
  border-radius: var(--radius-lg);
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: background var(--duration-fast), transform var(--duration-fast);
}
.btn-primary:hover:not(:disabled) {
  background: var(--color-terra-dark);
  transform: translateY(-1px);
}
.btn-primary:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #fff;
  color: var(--color-ink);
  border: 1.5px solid var(--color-divider);
  border-radius: var(--radius-lg);
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color var(--duration-fast);
}
.btn-ghost:hover { border-color: var(--color-muted-light); }

.contact-link {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-muted);
  text-align: center;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.contact-link:hover { color: var(--color-terracotta); }

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border-width: 0;
}
</style>
