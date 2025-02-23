<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSellerStore } from '@/stores/useSellerStore'
import { TrashIcon, PencilIcon, PlusIcon } from '@heroicons/vue/24/solid'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const sellerStore = useSellerStore()
const { sellers } = storeToRefs(sellerStore) // Usamos storeToRefs para asegurar reactividad

// Modal para crear vendedor
const newSeller = ref({ name: '' })
const createModal = ref<HTMLDialogElement | null>(null)

function openCreateModal() {
  createModal.value?.showModal()
}

function closeCreateModal() {
  createModal.value?.close()
  newSeller.value = { name: '' }
}

function submitSeller() {
  if (!newSeller.value.name.trim()) return
  sellerStore.addSeller(newSeller.value)
  closeCreateModal()
}

function createSeller() {
  openCreateModal()
}

// Modal para confirmar eliminación
const deleteModal = ref<HTMLDialogElement | null>(null)
const selectedSellerId = ref<number | null>(null)

function openDeleteModal(id: number) {
  selectedSellerId.value = id
  deleteModal.value?.showModal()
}

function closeDeleteModal() {
  deleteModal.value?.close()
  selectedSellerId.value = null
}

function confirmDelete() {
  if (selectedSellerId.value !== null) {
    sellerStore.deleteSeller(selectedSellerId.value)
  }
  closeDeleteModal()
}
</script>

<template>
  <div class="p-4">
    <p class="mb-4">
      {{ t('sellers.welcome') }}
    </p>
    <button
      class="mb-4 flex items-center px-4 py-2 font-bold bg-[var(--color-primary)] text-white rounded hover:bg-[var(--color-primary)]/90 cursor-pointer"
      @click="createSeller"
    >
      <PlusIcon class="h-5 w-5 mr-2" />
      {{ t('sellers.createSeller') }}
    </button>

    <!-- Si existen vendedores, mostramos la tabla -->
    <div v-if="sellers.length > 0">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ t('sellers.table.id') }}
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ t('sellers.table.name') }}
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ t('sellers.table.actions') }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="seller in sellers"
            :key="seller.id"
            class="odd:bg-gray-100 even:bg-gray-200 text-gray-900"
          >
            <td class="px-6 py-4 whitespace-nowrap">{{ seller.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ seller.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex space-x-2">
                <button
                  class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  @click="openDeleteModal(seller.id)"
                >
                  <TrashIcon class="h-5 w-5" />
                </button>
                <button class="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                  <PencilIcon class="h-5 w-5" />
                  <!-- Botón de edición: Solo diseño, sin funcionalidad -->
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Si no hay vendedores, se muestra un mensaje alternativo -->
    <div v-else class="text-center text-gray-500">
      <p>{{ t('sellers.noSellers') }}</p>
    </div>
  </div>

  <!-- Modal para crear vendedor -->
  <dialog
    ref="createModal"
    class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 rounded shadow-lg"
  >
    <form method="dialog" class="flex flex-col space-y-4">
      <h2 class="text-xl font-semibold">{{ t('sellers.createSeller') }}</h2>
      <div>
        <label class="block text-sm font-medium text-gray-700">
          {{ t('sellers.table.name') }}
        </label>
        <input
          type="text"
          v-model="newSeller.name"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          placeholder="Nombre del vendedor"
        />
      </div>
      <div class="flex justify-end space-x-2">
        <button
          type="button"
          @click="closeCreateModal"
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          {{ t('sellers.cancel') }}
        </button>
        <button
          type="button"
          @click="submitSeller"
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {{ t('sellers.createSeller') }}
        </button>
      </div>
    </form>
  </dialog>

  <!-- Modal para confirmación de eliminación -->
  <dialog
    ref="deleteModal"
    class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 rounded shadow-lg"
  >
    <form method="dialog" class="flex flex-col space-y-4">
      <h2 class="text-xl font-semibold">{{ t('sellers.deleteConfirmTitle') }}</h2>
      <p>{{ t('sellers.deleteConfirmMessage') }}</p>
      <div class="flex justify-end space-x-2">
        <button
          type="button"
          @click="closeDeleteModal"
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          {{ t('sellers.cancel') }}
        </button>
        <button
          type="button"
          @click="confirmDelete"
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          {{ t('sellers.deleteConfirmButton') }}
        </button>
      </div>
    </form>
  </dialog>
</template>
