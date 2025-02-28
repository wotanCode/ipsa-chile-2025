<script setup lang="ts">
import { ArrowPathIcon } from '@heroicons/vue/24/solid'

interface LoadingStateProps {
  message?: string
}

const props = defineProps<LoadingStateProps>()
</script>

<template>
  <div class="flex flex-col items-center justify-center p-4">
    <ArrowPathIcon class="h-16 w-16 animate-spin text-[var(--color-primary)]" />
    <p v-if="props.message" class="mt-4 text-lg">{{ props.message }}</p>
  </div>
</template>
