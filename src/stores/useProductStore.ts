import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiFetch } from '@/utils/apiFetch'

import type { ProductsResponse } from '@/interface/alegra_products_api'

interface Product {
  id: number
  name: string
  imageUrl: string
  points: number
}

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const selectedProductIds = ref<string[]>([])
  const initialPoints = ref(0)

  const totalSpent = computed(() =>
    selectedProductIds.value.reduce((sum, id) => {
      const product = products.value.find((p) => p.id === Number(id))
      return sum + (product?.points || 0)
    }, 0),
  )

  async function fetchProducts() {
    try {
      const response = await apiFetch('/items')
      let items: ProductsResponse[] = []

      if (Array.isArray(response)) {
        items = response
      } else if (response?.data && Array.isArray(response.data)) {
        items = response.data
      } else {
        console.warn('Formato de respuesta inesperado de /items:', response)
      }

      products.value = items.map(formatProduct)
    } catch (error) {
      console.error('Error al obtener los productos:', error)
    }
  }

  function toggleProduct(productId: string) {
    const index = selectedProductIds.value.indexOf(productId)
    if (index === -1) {
      selectedProductIds.value.push(productId)
    } else {
      selectedProductIds.value.splice(index, 1)
    }
  }

  function initializePoints(points: number) {
    initialPoints.value = points
  }

  const isPurchaseDisabled = computed(() => {
    return totalSpent.value === 0 || totalSpent.value > initialPoints.value
  })

  function formatProduct(item: ProductsResponse): Product {
    const mainPrice = Array.isArray(item.price)
      ? item.price.find((p) => p.main) || item.price[0]
      : item.price?.[0] || { price: 0 }

    return {
      id: Number(item.id),
      name: item.description || 'Producto sin nombre',
      imageUrl: `/${item.name}.jpg`,
      points: mainPrice.price,
    }
  }

  return {
    products,
    selectedProductIds,
    initialPoints,
    totalSpent,
    fetchProducts,
    toggleProduct,
    initializePoints,
    isPurchaseDisabled,
  }
})
