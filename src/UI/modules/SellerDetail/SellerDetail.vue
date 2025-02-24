<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useImageRaceStore } from '@/stores/useImageRaceStore'

const { t } = useI18n()

const route = useRoute()
const router = useRouter()
const imageRaceStore = useImageRaceStore()

const sellerId = Number(route.params.sellerId)

const sellerDetail = computed(() => {
  return imageRaceStore.currentParticipants.find(
    (participant) => participant.seller.id === sellerId,
  )
})
</script>

<template>
  <div class="p-8">
    <button
      @click="router.back()"
      class="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
    >
      {{ t('imageRace.sellerDetail.backBtn') }}
    </button>
    <div v-if="sellerDetail">
      <h2 class="text-2xl font-bold mb-2">{{ sellerDetail.seller.name }}</h2>

      <div class="mb-4 text-lg font-semibold text-gray-500">
        {{ t('imageRace.sellerDetail.score') }}:
        <span class="text-[var(--color-primary)] font-bold">{{ sellerDetail.score }}</span>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div
          v-for="(img, index) in sellerDetail.images"
          :key="index"
          class="border rounded-md overflow-hidden"
        >
          <img
            :src="img.urls.small"
            :alt="img.alt_description || ''"
            class="w-full h-48 object-cover"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <p>Vendedor no encontrado.</p>
    </div>
  </div>
</template>
