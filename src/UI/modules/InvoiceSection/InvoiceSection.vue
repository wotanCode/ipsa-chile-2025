<script setup lang="ts">
import { useImageRaceStore } from '@/stores/useImageRaceStore'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const imageRaceStore = useImageRaceStore()
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div
      v-if="!imageRaceStore.winner"
      class="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700"
    >
      <p class="font-semibold">{{ t('invoice.noWinnerAlert') }}</p>
    </div>

    <div v-else class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div class="flex items-center gap-4 mb-4">
        <div class="flex-1">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white">
            {{ t('invoice.winnerTitle') }}
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            {{ t('invoice.winnerSubtitle') }}
          </p>
        </div>
      </div>

      <div class="space-y-4">
        <div class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <h3 class="font-semibold text-gray-800 dark:text-white">
              {{ imageRaceStore.winner.seller.name }}
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ t('invoice.winnerId') }}: {{ imageRaceStore.winner.seller.id }}
            </p>
          </div>
          <div class="text-right">
            <p class="text-2xl font-bold text-[var(--color-primary)]">
              {{ imageRaceStore.totalScore }} {{ t('invoice.points') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
