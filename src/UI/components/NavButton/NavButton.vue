<script setup lang="ts">
import type { Component } from 'vue'

interface ButtonProps {
  text: string
  icon: Component
  id: string
  url: string
}

const props = defineProps<ButtonProps>()
</script>

<template>
  <li :id="props.id" class="flex items-center">
    <RouterLink
      :to="props.url"
      class="flex items-center w-full px-4 py-2 transition"
      active-class="font-bold text-gray-800"
    >
      <span v-if="props.icon" class="inline-block mr-2">
        <component
          :is="props.icon"
          class="w-5 h-5 dark:text-[var(--vt-c-black-soft)] text-[var(--vt-c-text-dark-1)]"
        />
      </span>
      <p>{{ props.text }}</p>
    </RouterLink>
  </li>
</template>
