<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

import { PlusIcon, TrashIcon, PencilIcon, ArrowPathIcon } from '@heroicons/vue/24/solid'

import type { Seller } from '@/interface/seller'

import { useSellerStore } from '@/stores/useSellerStore'

import BaseTable from '@/UI/components/BaseTable/BaseTable.vue'
import BaseModal from '@/UI/components/BaseModal/BaseModal.vue'

const { t } = useI18n()

const columns = ref([
  { header: t('sellers.table.id'), key: 'id' },
  { header: t('sellers.table.name'), key: 'name' },
  { header: t('sellers.table.actions'), key: 'actions', slot: 'actions' },
])

const sellerStore = useSellerStore()
const { sellers, isLoading } = storeToRefs(sellerStore)

const newSeller = ref({ name: '' })
const createModal = ref<InstanceType<typeof BaseModal> | null>(null)

function openCreateModal() {
  createModal.value?.openModal()
}

async function submitSeller() {
  if (!newSeller.value.name.trim()) return
  await sellerStore.createSeller(newSeller.value)
  newSeller.value = { name: '' }
  createModal.value?.closeModal()
}

const deleteModal = ref<InstanceType<typeof BaseModal> | null>(null)
const selectedSellerId = ref<number | null>(null)

function openDeleteModal(id: number) {
  selectedSellerId.value = id
  deleteModal.value?.openModal()
}

async function confirmDelete() {
  if (selectedSellerId.value !== null) {
    await sellerStore.deleteSeller(selectedSellerId.value)
    selectedSellerId.value = null
    deleteModal.value?.closeModal()
  }
}

const editModal = ref<InstanceType<typeof BaseModal> | null>(null)
const selectedSeller = ref<Partial<Seller>>({ name: '' })

async function openEditModal(id: number) {
  const seller = await sellerStore.fetchSeller(id)
  if (seller) {
    selectedSeller.value = { ...seller }
    editModal.value?.openModal()
  }
}

async function submitEdit() {
  if (selectedSeller.value?.id) {
    await sellerStore.updateSeller(selectedSeller.value.id, {
      name: selectedSeller.value.name || '',
    })
    editModal.value?.closeModal()
  }
}
</script>

<template>
  <div class="p-4">
    <p class="mb-4">{{ t('sellers.welcome') }}</p>
    <button
      class="mb-4 flex items-center px-4 py-2 font-bold bg-[var(--color-primary)] text-white rounded hover:bg-[var(--color-primary)]/90 cursor-pointer"
      @click="openCreateModal"
    >
      <PlusIcon class="h-5 w-5 mr-2" />
      {{ t('sellers.createSeller') }}
    </button>

    <div v-if="isLoading" class="flex flex-col items-center justify-center p-4">
      <ArrowPathIcon class="h-16 w-16 animate-spin text-[var(--color-primary)]" />
      <p class="mt-4 text-lg">{{ t('sellers.loading') || 'Cargando...' }}</p>
    </div>

    <div v-else>
      <BaseTable v-if="sellers.length > 0" :data="sellers" :columns="columns">
        <template #actions="{ item }">
          <button
            class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            @click="openDeleteModal(item.id)"
          >
            <TrashIcon class="h-5 w-5" />
          </button>
          <button
            class="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            @click="openEditModal(item.id)"
          >
            <PencilIcon class="h-5 w-5" />
          </button>
        </template>
      </BaseTable>
      <p v-else class="text-center text-gray-500">{{ t('sellers.noSellers') }}</p>
    </div>

    <BaseModal
      ref="createModal"
      :title="t('sellers.createSeller')"
      :confirmText="t('sellers.createSeller')"
      :cancelText="t('sellers.cancel')"
      @confirm="submitSeller"
    >
      <div>
        <label class="block text-sm font-medium text-gray-700">{{ t('sellers.table.name') }}</label>
        <input
          type="text"
          v-model="newSeller.name"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          :placeholder="t('sellers.table.name')"
        />
      </div>
    </BaseModal>

    <BaseModal
      ref="deleteModal"
      :title="t('sellers.deleteConfirmTitle')"
      :message="t('sellers.deleteConfirmMessage')"
      :confirmText="t('sellers.deleteConfirmButton')"
      :cancelText="t('sellers.cancel')"
      @confirm="confirmDelete"
    />

    <BaseModal
      ref="editModal"
      :title="t('sellers.editSeller')"
      :confirmText="t('sellers.saveChanges')"
      :cancelText="t('sellers.cancel')"
      @confirm="submitEdit"
    >
      <div>
        <label class="block text-sm font-medium text-gray-700">{{ t('sellers.table.name') }}</label>
        <input
          type="text"
          v-model="selectedSeller.name"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          :placeholder="t('sellers.table.name')"
        />
      </div>
    </BaseModal>
  </div>
</template>
