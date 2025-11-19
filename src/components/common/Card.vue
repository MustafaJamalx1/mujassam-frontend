<script setup>
defineProps({
  padding: {
    type: String,
    default: 'md',
    validator: (value) => ['none', 'sm', 'md', 'lg'].includes(value)
  },
  hoverable: {
    type: Boolean,
    default: false
  }
})

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
}
</script>

<template>
  <div
    :class="[
      'bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden',
      paddingClasses[padding],
      { 'hover:shadow-md transition-shadow duration-200 cursor-pointer': hoverable }
    ]"
  >
    <slot />
  </div>
</template>
