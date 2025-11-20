<script setup>
defineProps({
  padding: {
    type: String,
    default: 'md',
    validator: (value) => ['none', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  hoverable: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: 'glass',
    validator: (value) => ['glass', 'solid', 'outlined'].includes(value)
  },
  gradient: {
    type: Boolean,
    default: false
  }
})

const paddingClasses = {
  none: '',
  sm: 'pa-3',
  md: 'pa-5',
  lg: 'pa-7',
  xl: 'pa-10'
}
</script>

<template>
  <div
    :class="[
      'custom-card rounded-xl overflow-hidden position-relative',
      paddingClasses[padding],
      {
        'glass-card': variant === 'glass',
        'solid-card': variant === 'solid',
        'outlined-card': variant === 'outlined',
        'hoverable-card': hoverable,
        'gradient-border': gradient
      }
    ]"
  >
    <div v-if="gradient" class="gradient-border-effect"></div>
    <slot />
  </div>
</template>

<style scoped>
.custom-card {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.06),
    0 1px 2px rgba(0, 0, 0, 0.02),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.solid-card {
  background: white;
  border: 1px solid rgba(203, 213, 225, 0.3);
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.05),
    0 10px 20px rgba(0, 0, 0, 0.03);
}

.outlined-card {
  background: transparent;
  border: 2px solid rgba(6, 182, 212, 0.3);
}

.hoverable-card {
  cursor: pointer;
}

.hoverable-card:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.07),
    0 20px 40px rgba(0, 0, 0, 0.08) !important;
}

.gradient-border {
  overflow: visible;
}

.gradient-border-effect {
  position: absolute;
  inset: -2px;
  background: linear-gradient(135deg, #06b6d4, #a855f7, #f43f5e);
  border-radius: inherit;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gradient-border:hover .gradient-border-effect {
  opacity: 1;
}
</style>
