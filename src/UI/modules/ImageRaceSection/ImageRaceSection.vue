<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSellerStore } from '@/stores/useSellerStore'
import { useImageRaceStore } from '@/stores/useImageRaceStore'
import useImageSearch from '@/composables/useImageSearch'
import BaseTable, { type Column } from '@/UI/components/BaseTable/BaseTable.vue'

const { t } = useI18n()
const sellerStore = useSellerStore()
const imageRaceStore = useImageRaceStore()
const { searchImages, isLoading: imagesLoading } = useImageSearch()

const searchTerm = ref('')
const errorMessage = ref('')

const enoughSellers = computed(() => {
  return sellerStore.sellers.length >= 2 && sellerStore.sellers.length <= 4
})

const handleSearch = async () => {
  if (!searchTerm.value.trim()) {
    errorMessage.value = t('imageRace.inputStage.emptyErrorMessage')
    return
  }

  try {
    const requiredImages = sellerStore.sellers.length * 7
    const images = await searchImages(searchTerm.value, requiredImages)
    if (images.length < requiredImages) {
      throw new Error(t('imageRace.inputStage.emptyErrorMessage'))
    }
    imageRaceStore.searchTerm = searchTerm.value
    imageRaceStore.assignImagesToSellers(sellerStore.sellers, images)
    imageRaceStore.startRace()
  } catch (err) {
    errorMessage.value = (err as Error).message
  }
}

const columns = ref<Column[]>([
  { header: t('imageRace.table.id'), key: 'id' },
  { header: t('imageRace.table.seller'), key: 'name' },
  { header: t('imageRace.table.points'), key: 'points' },
])

const tableData = computed(() => {
  return imageRaceStore.currentParticipants.map((participant) => ({
    id: participant.seller.id,
    name: participant.seller.name,
    points: participant.score,
  }))
})
</script>

<template>
  <div class="flex items-center justify-center px-4">
    <div
      v-if="!imageRaceStore.isRaceActive"
      class="max-w-md w-full bg-[rgb(36,46,52)] dark:bg-neutral-50 rounded-2xl shadow-xl p-8"
    >
      <div class="flex gap-2">
        <input
          v-model="searchTerm"
          :disabled="!enoughSellers"
          :placeholder="t('imageRace.inputStage.inputPlaceholder')"
          @keyup.enter="handleSearch"
          class="w-full px-4 py-2.5 text-white font-bold rounded-lg border-2 focus:ring-2 focus:ring-blue-200 transition-all outline-none disabled:opacity-70 disabled:cursor-not-allowed bg-[rgb(36,46,52)]"
        />
        <button
          class="px-6 py-2.5 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary)]/90 active:bg-[var(--color-primary)]/90 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
          @click="handleSearch"
          :disabled="!enoughSellers || imagesLoading"
        >
          {{
            imagesLoading
              ? t('imageRace.inputStage.sarchButtonIsLoading')
              : t('imageRace.inputStage.searchButton')
          }}
        </button>
      </div>
      <div
        class="p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 rounded-lg"
        v-if="!enoughSellers"
      >
        {{ t('imageRace.inputStage.alertMessage') }}
      </div>
      <div
        class="p-3 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-lg"
        v-if="errorMessage"
      >
        {{ errorMessage }}
      </div>
    </div>

    <div v-else class="w-full bg-[rgb(36,46,52)] dark:bg-neutral-50 rounded-2xl shadow-xl p-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="font-bold dark:text-teal-900 text-gray-200">
          {{ t('imageRace.raceActive.title') }}: {{ imageRaceStore.searchTerm }}
        </h2>
        <button
          class="px-6 py-2.5 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary)]/90 active:bg-[var(--color-primary)]/90 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
          @click="imageRaceStore.resetRace()"
        >
          {{ t('imageRace.raceActive.resetButton') }}
        </button>
      </div>
      <BaseTable :data="tableData" :columns="columns" />
    </div>
  </div>
</template>
