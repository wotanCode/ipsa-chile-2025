import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Seller, SellerPayload } from '@/interface/seller' // Ajusta la ruta según corresponda

export const useSellerStore = defineStore('seller', () => {
  const sellers = ref<Seller[]>([])

  const totalSellers = computed(() => sellers.value.length)

  function addSeller(payload: SellerPayload) {
    const newSeller: Seller = {
      id: Date.now(),
      ...payload,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deleted: false,
    }
    sellers.value.push(newSeller)
  }

  function getSellers(): Seller[] {
    return sellers.value
  }

  function getSeller(id: number): Seller | undefined {
    return sellers.value.find((seller: Seller) => seller.id === id)
  }

  function updateSeller(id: number, payload: Partial<SellerPayload>) {
    const index = sellers.value.findIndex((seller: Seller) => seller.id === id)
    if (index !== -1) {
      const updatedSeller: Seller = {
        ...sellers.value[index],
        ...payload,
        updatedAt: new Date().toISOString(),
      }
      sellers.value[index] = updatedSeller
    }
  }

  function deleteSeller(id: number) {
    sellers.value = sellers.value.filter((seller: Seller) => seller.id !== id)
  }

  return {
    sellers,
    totalSellers,
    addSeller,
    getSellers,
    getSeller,
    updateSeller,
    deleteSeller,
  }
})
