<script setup lang="ts">
import { type Component } from 'vue'

interface ButtonProps {
  onClick?: () => void
  disabled?: boolean
  label: string
  icon?: Component
}

const props = defineProps<ButtonProps>()
</script>

<template>
  <button
    class="flex items-center justify-center px-6 py-2.5 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary)]/90 active:bg-[var(--color-primary)]/90 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
    @click="props.onClick"
    :disabled="props.disabled"
  >
    <component v-if="props.icon" :is="props.icon" class="h-5 w-5 mr-2" />
    {{ props.label }}
  </button>
</template>
