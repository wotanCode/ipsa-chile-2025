<script setup lang="ts">
interface ButtonProps {
  text: string
  icon?: string
  id: string
  url: string
}

const props = defineProps<ButtonProps>()
</script>

<template>
  <li :id="props.id" class="flex items-center">
    <RouterLink
      :to="url"
      class="flex items-center w-full px-4 py-2 transition"
      active-class="font-bold text-gray-800"
    >
      <span v-if="icon" class="inline-block mr-2">
        <i :class="icon"></i>
      </span>
      <p>{{ text }}</p>
    </RouterLink>
  </li>
</template>
