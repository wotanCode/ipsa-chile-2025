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
  <li :id="props.id">
    <RouterLink
      :to="url"
      class="block px-4 py-2 text-black hover:text-blue-500 transition"
      active-class="font-bold text-gray-800"
    >
      <span v-if="icon" class="inline-block mr-2">
        <i :class="icon"></i>
      </span>
      {{ text }}
    </RouterLink>
  </li>
</template>
