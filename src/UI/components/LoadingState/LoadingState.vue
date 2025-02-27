<script setup lang="ts">
import type { Component } from 'vue'

interface LoadingStateProps {
  icon?: Component
  message?: string
}

const props = defineProps<LoadingStateProps>()
</script>

<template>
  <div class="flex flex-col items-center justify-center p-4">
    <component :is="props.icon" class="h-16 w-16 animate-spin text-[var(--color-primary)]" />
    <p v-if="props.message" class="mt-4 text-lg">{{ props.message }}</p>
  </div>
</template>
