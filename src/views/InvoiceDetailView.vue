<script setup lang="ts">
import { onMounted } from 'vue'
import JSConfetti from 'js-confetti'
import { useInvoiceStore } from '@/stores/useInvoiceStore'
import { useI18n } from 'vue-i18n'
import { useImageRaceStore } from '@/stores/useImageRaceStore'

const { t } = useI18n()
const invoiceStore = useInvoiceStore()
const imageRaceStore = useImageRaceStore()

onMounted(() => {
  if (invoiceStore.createdInvoice) {
    const jsConfetti = new JSConfetti()
    jsConfetti.addConfetti()
  }
})
</script>

<template>
  <div class="p-8">
    <div v-if="invoiceStore.createdInvoice">
      <h2 class="text-2xl font-bold mb-4">{{ t('invoice.invoiceDetail.title') }}</h2>

      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="font-semibold">{{ t('invoice.invoiceDetail.id') }}</p>
            <p>#{{ invoiceStore.createdInvoice.id }}</p>
          </div>
          <div>
            <p class="font-semibold">{{ t('invoice.invoiceDetail.total') }}</p>
            <p>{{ invoiceStore.createdInvoice.total }}</p>
          </div>
        </div>

        <div class="mt-4">
          <p class="font-semibold">{{ t('invoice.invoiceDetail.sellerName') }}</p>
          <p>
            {{ imageRaceStore.winner?.seller.name }}
          </p>
        </div>

        <div class="mt-4">
          <p class="font-semibold">{{ t('invoice.invoiceDetail.items') }}</p>
          <ul class="list-disc list-inside">
            <li v-for="item in invoiceStore.createdInvoice.items" :key="item.id">
              {{ item.quantity }}x
              {{ item.description }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-8">
      {{ t('invoice.invoiceDetail.notFound') }}
    </div>
  </div>
</template>
