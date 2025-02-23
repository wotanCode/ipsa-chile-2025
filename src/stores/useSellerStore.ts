import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'

export interface Seller {
  id: number
  name: string
  email?: string
  createdAt: string
  updatedAt: string
  deleted?: boolean
}

export interface SellerPayload {
  name: string
  email?: string
}

const API_BASE_URL = '/src/fakeApi/sellers.json' // Ruta a tu JSON local

export const useSellerStore = defineStore('seller', () => {
  const sellers = ref<Seller[]>([])
  const isLoading = ref(false)

  const totalSellers = computed(() => sellers.value.length)

  async function fetchSellers() {
    isLoading.value = true
    try {
      const response = await fetch(API_BASE_URL)
      if (!response.ok) throw new Error('Error al obtener vendedores')
      sellers.value = await response.json()
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchSeller(id: number): Promise<Seller | undefined> {
    // Modificado para trabajar con JSON estático
    try {
      const response = await fetch(API_BASE_URL)
      const allSellers = await response.json()
      return allSellers.find((seller: Seller) => seller.id === id)
      //TODO: Manejar esto cuando realmente se implemente el api real
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return sellers.value.find((seller) => seller.id === id)
    }
  }

  async function createSeller(payload: SellerPayload): Promise<Seller> {
    const newSeller: Seller = {
      id: Date.now(),
      ...payload,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deleted: false,
    }
    sellers.value = [...sellers.value, newSeller] // Reactividad garantizada
    return newSeller
  }

  async function updateSeller(
    id: number,
    payload: Partial<SellerPayload>,
  ): Promise<Seller | undefined> {
    const index = sellers.value.findIndex((seller) => seller.id === id)

    if (index === -1) return undefined

    const updatedSeller = {
      ...sellers.value[index],
      ...payload,
      updatedAt: new Date().toISOString(),
    }

    sellers.value = sellers.value.map((seller, i) => (i === index ? updatedSeller : seller))

    return updatedSeller
  }

  async function deleteSeller(id: number): Promise<boolean> {
    sellers.value = sellers.value.filter((seller) => seller.id !== id)
    return true
  }

  onMounted(fetchSellers)

  return {
    sellers,
    isLoading,
    totalSellers,
    fetchSellers,
    fetchSeller,
    createSeller,
    updateSeller,
    deleteSeller,
  }
})
