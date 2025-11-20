<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'accent', 'outline', 'ghost', 'glass'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  rounded: {
    type: String,
    default: 'lg',
    validator: (value) => ['sm', 'md', 'lg', 'xl', 'full'].includes(value)
  }
})

defineEmits(['click'])

const buttonClasses = computed(() => {
  return [
    'custom-btn',
    `btn-${props.variant}`,
    `btn-${props.size}`,
    `rounded-${props.rounded}`,
    { 'w-100': props.fullWidth },
    { 'btn-disabled': props.disabled || props.loading }
  ]
})
</script>

<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span class="btn-ripple"></span>
    <svg
      v-if="loading"
      class="btn-spinner"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <span class="btn-content">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.custom-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  font-weight: 700;
  font-size: 0.938rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  cursor: pointer;
  font-family: var(--font-sans);
  letter-spacing: -0.01em;
  text-transform: none;
}

.btn-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
  pointer-events: none;
}

.custom-btn:hover .btn-ripple {
  width: 300px;
  height: 300px;
}

.btn-content {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-spinner {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Variants */
.btn-primary {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
}

.btn-primary:hover:not(.btn-disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(6, 182, 212, 0.4);
}

.btn-secondary {
  background: linear-gradient(135deg, #a855f7 0%, #7e22ce 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
}

.btn-secondary:hover:not(.btn-disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(168, 85, 247, 0.4);
}

.btn-accent {
  background: linear-gradient(135deg, #f43f5e 0%, #e11d48 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(244, 63, 94, 0.3);
}

.btn-accent:hover:not(.btn-disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(244, 63, 94, 0.4);
}

.btn-outline {
  background: transparent;
  border: 2px solid #06b6d4;
  color: #0891b2;
}

.btn-outline:hover:not(.btn-disabled) {
  background: rgba(6, 182, 212, 0.1);
  transform: translateY(-2px);
}

.btn-ghost {
  background: transparent;
  color: #64748b;
}

.btn-ghost:hover:not(.btn-disabled) {
  background: rgba(100, 116, 139, 0.1);
}

.btn-glass {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
}

.btn-glass:hover:not(.btn-disabled) {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* Sizes */
.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.813rem;
}

.btn-md {
  padding: 0.75rem 1.5rem;
  font-size: 0.938rem;
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1rem;
}

.btn-xl {
  padding: 1.25rem 2.5rem;
  font-size: 1.125rem;
}

/* Rounded */
.rounded-sm {
  border-radius: 0.375rem;
}

.rounded-md {
  border-radius: 0.5rem;
}

.rounded-lg {
  border-radius: 0.75rem;
}

.rounded-xl {
  border-radius: 1rem;
}

.rounded-full {
  border-radius: 9999px;
}

/* States */
.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.custom-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.3);
}

.custom-btn:active:not(.btn-disabled) {
  transform: scale(0.98);
}
</style>
