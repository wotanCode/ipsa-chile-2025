import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useSellerStore, type Seller } from '@/stores/useSellerStore'
import type { UnsplashImage } from '@/composables/useImageSearch'

interface RaceParticipant {
  seller: Seller
  images: UnsplashImage[]
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
      images: [],
      score: 0,
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
  const winner = computed(() => currentParticipants.value.find((p) => p.score >= 20) || null)
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
  }
})
