<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { useProductStore } from '@/stores/useProductStore'
import { useImageRaceStore } from '@/stores/useImageRaceStore'
import { useInvoiceStore } from '@/stores/useInvoiceStore'

const router = useRouter()
const { t } = useI18n()

const productStore = useProductStore()
const imageRaceStore = useImageRaceStore()
const invoiceStore = useInvoiceStore()

const initialPoints = computed(() => {
  return imageRaceStore.totalScore || 0
})

onMounted(async () => {
  await productStore.fetchProducts()
  productStore.initializePoints(initialPoints.value)
})

const handlePurchase = async () => {
  if (!imageRaceStore.winner?.seller.id) return

  const invoiceItems = productStore.selectedProductIds.map((id) => {
    const product = productStore.products.find((p) => p.id === id)
    return {
      id: product?.id,
      price: product?.points || 0,
      quantity: 1,
    }
  })

  const invoiceData = {
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    client: imageRaceStore.winner.seller.id,
    items: invoiceItems,
  }

  try {
    const invoice = await invoiceStore.createInvoice(invoiceData)

    // 3. Redirigir a vista de detalle
    router.push({
      name: 'InvoiceDetail',
      params: { invoiceId: invoice.id },
    })
  } catch (error) {
    console.error('Error creating invoice:', error)
  }
}
</script>

<template>
  <div class="p-8">
    <div v-if="productStore.products.length">
      <h2 class="text-2xl font-bold mb-4">{{ t('invoice.productPurchase.title') }}</h2>

      <div class="mb-6 text-lg">
        {{ t('invoice.productPurchase.availablePoints') }}
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
          <p class="text-gray-600 dark:text-gray-200 text-sm">
            {{ product.points }} {{ t('invoice.productPurchase.productPoints') }}
          </p>
        </div>
      </div>

      <button
        @click="handlePurchase"
        :disabled="productStore.isPurchaseDisabled"
        class="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {{ t('invoice.productPurchase.purchaseButton') }}
      </button>
    </div>

    <div v-else class="text-center py-8">
      {{ t('invoice.productPurchase.loadingMessage') }}
    </div>
  </div>
</template>
