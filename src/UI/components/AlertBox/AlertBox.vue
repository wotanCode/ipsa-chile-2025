<script setup lang="ts">
interface AlertMessageProps {
  type: 'alert' | 'error' | 'success'
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
      'bg-green-50 border-green-400 text-green-700': props.type === 'success',
    }"
  >
    <p class="font-semibold">{{ props.message }}</p>
  </div>
</template>
