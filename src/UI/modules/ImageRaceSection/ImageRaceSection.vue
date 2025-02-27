<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { ArrowPathIcon } from '@heroicons/vue/24/solid'

import { useSellerStore } from '@/stores/useSellerStore'
import { useImageRaceStore } from '@/stores/useImageRaceStore'

import BaseTable, { type Column } from '@/UI/components/BaseTable/BaseTable.vue'
import BaseButton from '@/UI/components/BaseButton/BaseButton.vue'
import AlertBox from '@/UI/components/AlertBox/AlertBox.vue'
import BaseInput from '@/UI/components/BaseInput/BaseInput.vue'
import LoadingState from '@/UI/components/LoadingState/LoadingState.vue'

import { MIN_SELLERS_POSSIBLE, MAX_SELLERS_POSSIBLE } from '@/const/consts'

const { t } = useI18n()
const sellerStore = useSellerStore()
const imageRaceStore = useImageRaceStore()

const searchTerm = ref('')
const errorMessage = ref('')

const enoughSellers = computed(() => {
  return (
    sellerStore.sellers.length >= MIN_SELLERS_POSSIBLE &&
    sellerStore.sellers.length <= MAX_SELLERS_POSSIBLE
  )
})

const handleSearch = () => {
  if (!searchTerm.value.trim()) {
    errorMessage.value = t('imageRace.inputStage.emptyErrorMessage')
    return
  }
  imageRaceStore.searchTerm = searchTerm.value
  imageRaceStore.startRace()
}

const columns = ref<Column[]>([
  { header: t('imageRace.table.id'), key: 'id' },
  { header: t('imageRace.table.seller'), key: 'name' },
  { header: t('imageRace.table.points'), key: 'score' },
])

const tableData = computed(() => imageRaceStore.tableData)
</script>

<template>
  <div class="flex items-center justify-center flex-col px-4 gap-4">
    <div class="max-w-md w-full bg-[rgb(36,46,52)] dark:bg-neutral-50 rounded-2xl shadow-xl p-8">
      <div class="flex gap-2">
        <BaseInput
          v-model:modelValue="searchTerm"
          :disabled="!enoughSellers || imageRaceStore.isLoading"
          :placeholder="t('imageRace.inputStage.inputPlaceholder')"
          @keyup.enter="handleSearch"
        />

        <BaseButton
          :onClick="handleSearch"
          :disabled="!enoughSellers || imageRaceStore.isLoading"
          :label="t('imageRace.inputStage.searchButton')"
        />
      </div>

      <AlertBox
        v-if="!enoughSellers"
        type="alert"
        :message="t('imageRace.inputStage.alertMessage')"
      />
      <AlertBox v-if="imageRaceStore.error" type="error" :message="imageRaceStore.error" />
    </div>

    <LoadingState
      v-if="imageRaceStore.isLoading"
      :icon="ArrowPathIcon"
      :message="t('sellers.loading')"
    />

    <div v-else class="w-full bg-[rgb(36,46,52)] dark:bg-neutral-50 rounded-2xl shadow-xl p-8">
      <div class="flex justify-between items-center mb-6">
        <!-- <h2 class="font-bold dark:text-teal-900 text-gray-200">
          {{ t('imageRace.raceActive.title') }}: {{ imageRaceStore.searchTerm }}
        </h2> -->

        <BaseButton
          :onClick="imageRaceStore.resetRace"
          :label="t('imageRace.raceActive.resetButton')"
        />
      </div>

      <BaseTable :columns="columns" :data="tableData" />
    </div>
  </div>
</template>
