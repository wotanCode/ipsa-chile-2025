<script setup lang="ts">
import { ref } from 'vue'

interface ModalProps {
  title: string
  message?: string
  confirmText: string
  cancelText: string
}

defineProps<ModalProps>()

const emit = defineEmits(['confirm', 'cancel'])
const modalRef = ref<HTMLDialogElement | null>(null)

function openModal() {
  modalRef.value?.showModal()
}

function closeModal() {
  modalRef.value?.close()
  emit('cancel')
}

function handleConfirm() {
  emit('confirm')
  closeModal()
}

defineExpose({ openModal, closeModal })
</script>

<template>
  <dialog
    ref="modalRef"
    class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 rounded shadow-lg"
  >
    <form method="dialog" class="flex flex-col space-y-4">
      <h2 class="text-xl font-semibold">{{ title }}</h2>
      <p v-if="message">{{ message }}</p>
      <slot />

      <div class="flex justify-end space-x-2">
        <button
          type="button"
          @click="closeModal"
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          {{ cancelText }}
        </button>
        <button
          type="button"
          @click="handleConfirm"
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {{ confirmText }}
        </button>
      </div>
    </form>
  </dialog>
</template>
