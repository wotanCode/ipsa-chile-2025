<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { ArrowPathIcon } from '@heroicons/vue/24/solid'

import { useProductStore } from '@/stores/useProductStore'
import { useImageRaceStore } from '@/stores/useImageRaceStore'
import { useInvoiceStore, type InvoicePayload } from '@/stores/useInvoiceStore'

import BaseButton from '@/UI/components/BaseButton/BaseButton.vue'
import LoadingState from '@/UI/components/LoadingState/LoadingState.vue'

const router = useRouter()
const { t } = useI18n()

const productStore = useProductStore()
const imageRaceStore = useImageRaceStore()
const invoiceStore = useInvoiceStore()

const isLoading = ref(false) // Estado de carga
const initialPoints = computed(() => imageRaceStore.totalScore || 0)

onMounted(async () => {
  await productStore.fetchProducts()
  productStore.initializePoints(initialPoints.value)
})

const handlePurchase = async () => {
  if (!imageRaceStore.winner?.seller.id) return

  isLoading.value = true

  const CONTACT_ID = 9 // ID del contacto
  const DEFAULT_TAX_ID = 1

  const invoiceItems = productStore.selectedProductIds
    .map((productId) => {
      const product = productStore.products.find((p) => p.id === Number(productId))
      if (!product) return null
      return {
        id: product.id,
        price: product.points,
        quantity: 1,
        description: product.name,
        tax: [{ id: DEFAULT_TAX_ID, quantity: 1 }],
      }
    })
    .filter((item) => item !== null) as Array<{
    id: number
    price: number
    quantity: number
    description: string
    tax: Array<{ id: number; quantity: number }>
  }>

  const invoiceData: InvoicePayload = {
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    client: CONTACT_ID,
    items: invoiceItems,
  }

  try {
    const invoice = await invoiceStore.createInvoice(invoiceData)
    if (invoice?.id) {
      router.push({ name: 'InvoiceDetail', params: { invoiceId: invoice.id } })
    } else {
      throw new Error(t('invoice.productPurchase.errorCreatingInvoice'))
    }
  } catch (error) {
    console.error('Error creando factura:', error)
    if (error instanceof Error && 'response' in error) {
      console.log('Detalles del error:', error.response)
    }
  } finally {
    isLoading.value = false
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
            'ring-4 ring-green-400 scale-105': productStore.selectedProductIds.includes(
              product.id.toString(),
            ),
          }"
          @click="productStore.toggleProduct(product.id.toString())"
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

      <div class="mt-6">
        <LoadingState
          v-if="isLoading"
          :icon="ArrowPathIcon"
          :message="t('invoice.productPurchase.loadingInvoice')"
        />
        <BaseButton
          v-else
          :onClick="handlePurchase"
          :disabled="productStore.isPurchaseDisabled || isLoading"
          :label="t('invoice.productPurchase.purchaseButton')"
        />
      </div>
    </div>

    <div v-else class="text-center py-8">
      {{ t('invoice.productPurchase.loadingMessage') }}
    </div>
  </div>
</template>
