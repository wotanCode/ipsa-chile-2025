<script setup lang="ts">
// import { computed, onMounted } from 'vue'
import { useInvoiceStore } from '@/stores/useInvoiceStore'
// import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
// const route = useRoute()
const invoiceStore = useInvoiceStore()

// const invoiceId = computed(() => Number(route.params.invoiceId))

// onMounted(async () => {
//   if (!invoiceStore.createdInvoice) {
//     // Opcional: Si se necesita cargar de la API
//     // await invoiceStore.fetchInvoice(invoiceId.value)
//   }
// })
</script>

<template>
  <div class="p-8">
    <div v-if="invoiceStore.createdInvoice">
      <h2 class="text-2xl font-bold mb-4">{{ t('invoiceDetail.title') }}</h2>

      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <!-- Detalles de la factura -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="font-semibold">{{ t('invoiceDetail.id') }}</p>
            <p>#{{ invoiceStore.createdInvoice.id }}</p>
          </div>
          <div>
            <p class="font-semibold">{{ t('invoiceDetail.total') }}</p>
            <p>${{ invoiceStore.createdInvoice.total }}</p>
          </div>
        </div>

        <!-- Botón para ver en Alegra -->
        <a
          :href="`https://app.alegra.com/invoices/view/${invoiceStore.createdInvoice.id}`"
          target="_blank"
          class="mt-6 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {{ t('invoiceDetail.viewInAlegra') }}
        </a>
      </div>
    </div>

    <div v-else class="text-center py-8">
      {{ t('invoiceDetail.notFound') }}
    </div>
  </div>
</template>
