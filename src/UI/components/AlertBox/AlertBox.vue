<script setup lang="ts">
import { defineProps } from 'vue'

interface AlertMessageProps {
  type: 'alert' | 'error'
  message: string
}

const props = defineProps<AlertMessageProps>()
</script>

<template>
  <div
    v-if="props.message"
    :class="{
      'p-3 rounded-lg border-l-4': true,
      'bg-yellow-50 border-yellow-400 text-yellow-700': props.type === 'alert',
      'bg-red-50 border-red-400 text-red-700': props.type === 'error',
    }"
  >
    {{ props.message }}
  </div>
</template>
