<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'glass'].includes(value)
  },
  icon: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])
const isFocused = ref(false)

const inputClasses = computed(() => [
  'custom-input',
  `input-${props.variant}`,
  {
    'input-error': props.error,
    'input-disabled': props.disabled,
    'input-focused': isFocused.value,
    'input-with-icon': props.icon
  }
])

function handleInput(event) {
  emit('update:modelValue', event.target.value)
}

function handleFocus() {
  isFocused.value = true
}

function handleBlur() {
  isFocused.value = false
}
</script>

<template>
  <div class="input-wrapper">
    <label v-if="label" class="input-label">
      {{ label }}
      <span v-if="required" class="input-required">*</span>
    </label>
    
    <div class="input-container">
      <v-icon 
        v-if="icon" 
        class="input-icon"
        size="20"
      >
        {{ icon }}
      </v-icon>
      
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="inputClasses"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      
      <div v-if="!error" class="input-border"></div>
    </div>
    
    <transition name="error-fade">
      <p v-if="error" class="input-error-message">
        <v-icon size="16" class="mr-1">mdi-alert-circle</v-icon>
        {{ error }}
      </p>
    </transition>
  </div>
</template>

<style scoped>
.input-wrapper {
  width: 100%;
}

.input-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.5rem;
  font-family: var(--font-sans);
}

.input-required {
  color: #f43f5e;
  margin-left: 0.25rem;
}

.input-container {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  pointer-events: none;
  z-index: 1;
  transition: color 0.3s ease;
}

.custom-input {
  width: 100%;
  padding: 0.875rem 1.125rem;
  border: 2px solid rgba(203, 213, 225, 0.5);
  border-radius: 0.875rem;
  font-size: 0.938rem;
  font-family: var(--font-sans);
  color: #0f172a;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.9);
  position: relative;
}

.input-with-icon {
  padding-left: 3rem;
}

.input-default {
  background: rgba(255, 255, 255, 0.9);
}

.input-glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.custom-input::placeholder {
  color: #94a3b8;
}

.custom-input:focus {
  outline: none;
  border-color: #06b6d4;
  background: white;
  box-shadow: 
    0 0 0 3px rgba(6, 182, 212, 0.1),
    0 4px 12px rgba(0, 0, 0, 0.05);
  transform: translateY(-1px);
}

.input-focused + .input-icon {
  color: #06b6d4;
}

.input-border {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #06b6d4, #a855f7);
  transform: translateX(-50%);
  transition: width 0.3s ease;
  border-radius: 2px;
}

.custom-input:focus ~ .input-border {
  width: 100%;
}

.input-error {
  border-color: #f43f5e !important;
  background: rgba(254, 242, 242, 0.5);
}

.input-error:focus {
  box-shadow: 
    0 0 0 3px rgba(244, 63, 94, 0.1),
    0 4px 12px rgba(244, 63, 94, 0.1);
}

.input-disabled {
  background: #f1f5f9;
  color: #94a3b8;
  cursor: not-allowed;
  opacity: 0.6;
}

.input-disabled:focus {
  transform: none;
  box-shadow: none;
}

.input-error-message {
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.813rem;
  color: #f43f5e;
  font-weight: 500;
}

/* Transitions */
.error-fade-enter-active,
.error-fade-leave-active {
  transition: all 0.3s ease;
}

.error-fade-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.error-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
