import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { apiFetch } from '@/utils/apiFetch'

export interface Seller {
  id: number
  name: string
  email?: string
  createdAt: string
  updatedAt: string
  deleted?: boolean
  identification?: string
  phonePrimary?: string
  observations?: string
}

export interface SellerPayload {
  name: string
  email?: string
  identification?: string
  phonePrimary?: string
  observations?: string
}

export const useSellerStore = defineStore('seller', () => {
  const sellers = ref<Seller[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const totalSellers = computed(() => sellers.value.length)

  async function fetchSellers() {
    isLoading.value = true
    error.value = null
    try {
      const response = await apiFetch('/sellers')
      const sellersData = Array.isArray(response) ? response : response?.data || []

      if (!Array.isArray(sellersData)) {
        throw new Error('Formato de respuesta inválido de la API')
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      sellers.value = sellersData.map((seller: any) => formatSeller(seller))
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al obtener vendedores'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function fetchSeller(id: number): Promise<Seller | undefined> {
    try {
      const response = await apiFetch(`/sellers/${id}`)
      return formatSeller(response)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al obtener el vendedor'
      return undefined
    }
  }

  async function createSeller(payload: SellerPayload): Promise<Seller> {
    try {
      const response = await apiFetch('/sellers', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      const formattedSeller = formatSeller(response)
      sellers.value = [formattedSeller, ...sellers.value]
      return formattedSeller
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al crear vendedor'
      throw err
    }
  }

  async function updateSeller(id: number, payload: Partial<SellerPayload>): Promise<Seller> {
    try {
      const response = await apiFetch(`/sellers/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      })

      const formattedSeller = formatSeller(response)
      sellers.value = sellers.value.map((seller) => (seller.id === id ? formattedSeller : seller))
      return formattedSeller
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al actualizar vendedor'
      throw err
    }
  }

  async function deleteSeller(id: number): Promise<void> {
    try {
      await apiFetch(`/sellers/${id}`, {
        method: 'DELETE',
      })
      sellers.value = sellers.value.filter((seller) => seller.id !== id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al eliminar vendedor'
      throw err
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function formatSeller(seller: any): Seller {
    return {
      id: Number(seller.id),
      name: seller.name,
      email: seller.email || null,
      identification: seller.identification || null,
      phonePrimary: seller.phonePrimary || null,
      observations: seller.observations || null,
      createdAt: seller.createdAt || new Date().toISOString(),
      updatedAt: seller.updatedAt || new Date().toISOString(),
      deleted: seller.status === 'deleted',
    }
  }

  onMounted(fetchSellers)

  return {
    sellers,
    isLoading,
    error,
    totalSellers,
    fetchSellers,
    fetchSeller,
    createSeller,
    updateSeller,
    deleteSeller,
  }
})
