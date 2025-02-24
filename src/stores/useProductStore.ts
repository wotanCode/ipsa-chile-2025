import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface Product {
  id: number
  name: string
  imageUrl: string
  points: number
}

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const selectedProductIds = ref<number[]>([])
  const initialPoints = ref(0)
  const totalSpent = computed(() =>
    selectedProductIds.value.reduce((sum, id) => {
      const product = products.value.find((p) => p.id === id)
      return sum + (product?.points || 0)
    }, 0),
  )

  async function fetchProducts() {
    const response = await fetch('/fakeProducts/products.json')
    products.value = await response.json()
  }

  function toggleProduct(productId: number) {
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
