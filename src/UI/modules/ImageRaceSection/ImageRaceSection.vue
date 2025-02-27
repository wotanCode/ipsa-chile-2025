<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { useSellerStore } from '@/stores/useSellerStore'
import { useImageRaceStore } from '@/stores/useImageRaceStore'
import useImageSearch from '@/composables/useImageSearch'

import BaseTable, { type Column } from '@/UI/components/BaseTable/BaseTable.vue'
import BaseButton from '@/UI/components/BaseButton/BaseButton.vue'
import BaseInput from '@/UI/components/BaseInput/BaseInput.vue'
import AlertBox from '@/UI/components/AlertBox/AlertBox.vue'

import { MAX_SELLERS_POSSIBLE, MIN_SELLERS_POSSIBLE } from '@/const/consts'

const router = useRouter()
const { t } = useI18n()
const sellerStore = useSellerStore()
const imageRaceStore = useImageRaceStore()
const { searchImages, isLoading: imagesLoading } = useImageSearch()

const searchTerm = ref('')
const errorMessage = ref('')

const enoughSellers = computed(() => {
  return (
    sellerStore.sellers.length >= MIN_SELLERS_POSSIBLE &&
    sellerStore.sellers.length <= MAX_SELLERS_POSSIBLE
  )
})

const columns = ref<Column[]>([
  { header: t('imageRace.table.id'), key: 'id' },
  { header: t('imageRace.table.seller'), key: 'name' },
  { header: t('imageRace.table.points'), key: 'score' },
])

const tableData = computed(() => imageRaceStore.tableData)

const handleSearch = async () => {
  if (!searchTerm.value.trim()) {
    errorMessage.value = t('imageRace.inputStage.emptyErrorMessage')
    return
  }

  try {
    const requiredImages = sellerStore.sellers.length
    const loadedImages = await searchImages(searchTerm.value, requiredImages)
    if (loadedImages.length < requiredImages) {
      throw new Error(t('imageRace.inputStage.emptyErrorMessage'))
    }
    imageRaceStore.searchTerm = searchTerm.value
    imageRaceStore.assignImagesToSellers(sellerStore.sellers, loadedImages)
    imageRaceStore.startRace()

    router.push({
      path: '/competencia-vendedores',
    })
  } catch (err) {
    errorMessage.value = (err as Error).message
  }
}
</script>

<template>
  <div class="flex items-center justify-center flex-col px-4 gap-4">
    <div class="max-w-md w-full bg-[rgb(36,46,52)] dark:bg-neutral-50 rounded-2xl shadow-xl p-8">
      <div class="flex gap-2">
        <BaseInput
          v-model:modelValue="searchTerm"
          :disabled="!enoughSellers || imagesLoading"
          :placeholder="t('imageRace.inputStage.inputPlaceholder')"
          @keyup.enter="handleSearch"
        />

        <BaseButton
          :onClick="handleSearch"
          :disabled="!enoughSellers || imagesLoading"
          :label="t('imageRace.inputStage.searchButton')"
        />
      </div>

      <AlertBox
        v-if="!enoughSellers"
        type="alert"
        :message="t('imageRace.inputStage.alertMessage')"
      />
      <AlertBox v-if="errorMessage" type="error" :message="errorMessage" />
    </div>

    <BaseTable :columns="columns" :data="tableData" />
  </div>
</template>
