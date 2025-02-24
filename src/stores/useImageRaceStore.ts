import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Seller } from '@/stores/useSellerStore'
import type { UnsplashImage } from '@/composables/useImageSearch'
import { IMAGES_PER_SELLER } from '@/const/consts'

interface RaceParticipant {
  seller: Seller
  images: UnsplashImage[]
  score: number
  highlightedIndices: number[]
}

export const useImageRaceStore = defineStore('imageRace', () => {
  const currentParticipants = ref<RaceParticipant[]>([])
  const searchTerm = ref('')
  const error = ref<string | null>(null)
  const isRaceActive = ref(false)

  function startRace() {
    isRaceActive.value = true
  }

  function resetRace() {
    isRaceActive.value = false
    currentParticipants.value = []
    searchTerm.value = ''
  }

  function assignImagesToSellers(sellers: Seller[], images: UnsplashImage[]) {
    currentParticipants.value = sellers.map((seller, index) => ({
      seller,
      images: images.slice(index * IMAGES_PER_SELLER, (index + 1) * IMAGES_PER_SELLER),
      score: 0,
      highlightedIndices: [],
    }))
  }

  const totalScore = computed(() => currentParticipants.value.reduce((sum, p) => sum + p.score, 0))

  const winner = computed(() => currentParticipants.value.find((p) => p.score >= 20) || null)

  return {
    currentParticipants,
    searchTerm,
    error,
    assignImagesToSellers,
    isRaceActive,
    startRace,
    resetRace,
    totalScore,
    winner,
  }
})
