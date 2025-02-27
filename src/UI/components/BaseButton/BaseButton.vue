<script setup lang="ts">
import { defineProps } from 'vue'

interface ButtonProps {
  onClick?: () => void
  disabled?: boolean
  label: string
}

const props = defineProps<ButtonProps>()
</script>

<template>
  <button
    class="px-6 py-2.5 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary)]/90 active:bg-[var(--color-primary)]/90 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
    @click="props.onClick"
    :disabled="props.disabled"
  >
    {{ props.label }}
  </button>
</template>
