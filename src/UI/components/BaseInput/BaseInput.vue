<script setup lang="ts">
import { ref, watch } from 'vue'

interface InputProps {
  modelValue?: string
  disabled?: boolean
  placeholder: string
}

const props = defineProps<InputProps>()
const emit = defineEmits(['update:modelValue'])

const localValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newValue) => {
    localValue.value = newValue
  },
)

const handleInput = () => {
  emit('update:modelValue', localValue.value)
}
</script>

<template>
  <input
    v-model="localValue"
    :disabled="props.disabled"
    :placeholder="props.placeholder"
    @input="handleInput"
    class="w-full px-4 py-2.5 text-white font-bold rounded-lg border-2 focus:ring-2 focus:ring-blue-200 transition-all outline-none disabled:opacity-70 disabled:cursor-not-allowed bg-[rgb(36,46,52)]"
  />
</template>
