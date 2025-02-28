<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { PlusIcon, TrashIcon, PencilIcon } from '@heroicons/vue/24/solid'

import { MIN_SELLERS_POSSIBLE, MAX_SELLERS_POSSIBLE } from '@/const/consts'

import { useSellerStore } from '@/stores/useSellerStore'

import BaseTable from '@/UI/components/BaseTable/BaseTable.vue'
import BaseModal from '@/UI/components/BaseModal/BaseModal.vue'
import BaseButton from '@/UI/components/BaseButton/BaseButton.vue'
import LoadingState from '@/UI/components/LoadingState/LoadingState.vue'
import AlertBox from '@/UI/components/AlertBox/AlertBox.vue'
import BaseInput from '@/UI/components/BaseInput/BaseInput.vue'
import type { Seller } from '@/interface/alegra_seller_api'

const { t } = useI18n()
const sellerStore = useSellerStore()
const { sellers, isLoading, error } = storeToRefs(sellerStore) // Añadir error

const columns = ref([
  { header: t('sellers.table.id'), key: 'id' },
  // TODO: De verdad vale la pena poner el ID? darle una vuelta
  { header: t('sellers.table.name'), key: 'name' },
  { header: t('sellers.table.actions'), key: 'actions', slot: 'actions' },
])

const newSeller = ref({ name: '' })
const selectedSeller = ref<Partial<Seller>>({ name: '' })

const createModal = ref<InstanceType<typeof BaseModal> | null>(null)
const deleteModal = ref<InstanceType<typeof BaseModal> | null>(null)
const editModal = ref<InstanceType<typeof BaseModal> | null>(null)
const selectedSellerId = ref<number | null>(null)

const openCreateModal = () => createModal.value?.openModal()
const openDeleteModal = (id: number) => {
  selectedSellerId.value = id
  deleteModal.value?.openModal()
}

const openEditModal = async (id: number) => {
  const seller = await sellerStore.fetchSeller(id.toString())
  if (seller) {
    selectedSeller.value = { ...seller }
    editModal.value?.openModal()
  }
}

const submitSeller = async () => {
  if (newSeller.value.name.trim()) {
    try {
      await sellerStore.createSeller(newSeller.value)
      newSeller.value = { name: '' }
      createModal.value?.closeModal()
    } catch (err) {
      console.error('Error creando vendedor:', err)
    }
  }
}

const confirmDelete = async () => {
  if (selectedSellerId.value !== null) {
    try {
      await sellerStore.deleteSeller(selectedSellerId.value.toString())
      deleteModal.value?.closeModal()
    } catch (err) {
      console.error('Error eliminando vendedor:', err)
    }
  }
}

const submitEdit = async () => {
  if (selectedSeller.value?.id) {
    try {
      await sellerStore.updateSeller(selectedSeller.value.id, {
        name: selectedSeller.value.name || '',
      })
      editModal.value?.closeModal()
    } catch (err) {
      console.error('Error actualizando vendedor:', err)
    }
  }
}
</script>

<template>
  <div class="p-4">
    <AlertBox v-if="error" type="error" :message="error" />

    <p class="mb-4">
      {{
        t('sellers.welcome', {
          minSellers: MIN_SELLERS_POSSIBLE.toString(),
          maxSellers: MAX_SELLERS_POSSIBLE.toString(),
        })
      }}
    </p>

    <div class="mb-4">
      <BaseButton :onClick="openCreateModal" :icon="PlusIcon" :label="t('sellers.createSeller')" />
    </div>

    <LoadingState v-if="isLoading" :message="t('sellers.loading')" />

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
        <BaseInput
          v-model:modelValue="newSeller.name"
          :placeholder="t('sellers.table.name')"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
    </BaseModal>

    <BaseModal
      ref="editModal"
      :title="t('sellers.editSeller')"
      :confirmText="t('sellers.saveChanges')"
      :cancelText="t('sellers.cancel')"
      @confirm="submitEdit"
    >
      <div>
        <label class="block text-sm font-medium text-gray-700">{{ t('sellers.table.name') }}</label>
        <BaseInput
          v-model:modelValue="selectedSeller.name"
          :placeholder="t('sellers.table.name')"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
  </div>
</template>
