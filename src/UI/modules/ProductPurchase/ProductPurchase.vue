<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useProductStore } from '@/stores/useProductStore'
import { useImageRaceStore } from '@/stores/useImageRaceStore'

const productStore = useProductStore()
const imageRaceStore = useImageRaceStore()

const initialPoints = computed(() => {
  return imageRaceStore.totalScore || 0
})

onMounted(async () => {
  await productStore.fetchProducts()
  productStore.initializePoints(initialPoints.value)
})

const handlePurchase = () => {
  console.log('Compra realizada:', productStore.selectedProductIds)
  // Lógica adicional para integración con Alegra
}
</script>

<template>
  <div class="p-8">
    <div v-if="productStore.products.length">
      <h2 class="text-2xl font-bold mb-4">Canjear Puntos</h2>

      <div class="mb-6 text-lg">
        Puntos disponibles:
        <span
          :class="{
            'text-red-500': initialPoints - productStore.totalSpent < 0,
            'text-[var(--color-primary)]': initialPoints - productStore.totalSpent >= 0,
          }"
          class="font-bold"
        >
          {{ initialPoints - productStore.totalSpent }} / {{ initialPoints }}
        </span>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <div
          v-for="product in productStore.products"
          :key="product.id"
          class="border rounded-lg p-2 cursor-pointer transition-all"
          :class="{
            'ring-4 ring-green-400 scale-105': productStore.selectedProductIds.includes(product.id),
          }"
          @click="productStore.toggleProduct(product.id)"
        >
          <img
            :src="`/fakeProducts/${product.imageUrl}`"
            :alt="product.name"
            class="w-full h-32 object-cover mb-2 rounded"
          />

          <h3 class="font-semibold text-md">{{ product.name }}</h3>

          <p class="text-gray-600 dark:text-gray-200 text-sm">{{ product.points }} puntos</p>
        </div>
      </div>

      <button
        @click="handlePurchase"
        :disabled="productStore.isPurchaseDisabled"
        class="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        Finalizar Compra
      </button>
    </div>

    <div v-else class="text-center py-8">Cargando productos...</div>
  </div>
</template>
