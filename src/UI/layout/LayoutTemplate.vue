<script setup lang="ts">
interface LayoutProps {
  title: string
}

defineProps<LayoutProps>()
</script>

<template>
  <div>
    <h1 class="text-4xl mb-4 border-b-2 border-gray-300/50 pb-2">{{ title }}</h1>
    <div class="w-full h-full">
      <slot />
    </div>
  </div>
</template>
