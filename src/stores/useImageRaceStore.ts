import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

import { useSellerStore } from '@/stores/useSellerStore'

import { SCORE_TO_WIN } from '@/const/consts'

import type { Result } from '@/interface/unsplash_image_response'
import type { Seller } from '@/interface/alegra_seller_api'

interface RaceParticipant {
  seller: Seller
  image: Result | null
  score: number
}

export const useImageRaceStore = defineStore('imageRace', () => {
  const sellerStore = useSellerStore()

  const currentParticipants = ref<RaceParticipant[]>([])
  const searchTerm = ref('')
  const isRaceActive = ref(false)

  const isLoading = computed(() => sellerStore.isLoading)
  const error = computed(() => sellerStore.error)

  watch(
    () => sellerStore.sellers,
    (newSellers) => {
      if (newSellers.length > 0 && !isRaceActive.value) {
        initializeParticipants(newSellers)
      }
    },
    { immediate: true },
  )

  function initializeParticipants(sellers: Seller[]) {
    if (sellers.length === 0) return
    currentParticipants.value = sellers.map((seller) => ({
      seller,
      image: null,
      score: 0,
    }))
  }

  function assignImagesToSellers(sellers: Seller[], images: Result[]) {
    currentParticipants.value = currentParticipants.value.map((participant, index) => ({
      ...participant,
      image: images[index] || null,
    }))
  }

  function startRace() {
    isRaceActive.value = true
  }

  function resetRace() {
    isRaceActive.value = false
    searchTerm.value = ''
    initializeParticipants(sellerStore.sellers)
  }

  const totalScore = computed(() => currentParticipants.value.reduce((sum, p) => sum + p.score, 0))
  const winner = computed(
    () => currentParticipants.value.find((p) => p.score >= SCORE_TO_WIN) || null,
  )
  const tableData = computed(() =>
    currentParticipants.value.map((participant) => ({
      id: participant.seller.id,
      name: participant.seller.name,
      score: participant.score.toString(),
    })),
  )

  return {
    currentParticipants,
    searchTerm,
    isRaceActive,
    isLoading,
    error,
    startRace,
    resetRace,
    tableData,
    totalScore,
    winner,
    assignImagesToSellers,
  }
})
