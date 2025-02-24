import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Invoice } from '@/interface/invoice'
import { apiFetch } from '@/utils/apiFetch'

export const useInvoiceStore = defineStore('invoice', () => {
  const createdInvoice = ref<Invoice | null>(null)
  const error = ref<string | null>(null)
  const isLoading = ref(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createInvoice = async (invoiceData: any) => {
    isLoading.value = true
    try {
      const response = await apiFetch('/invoices', {
        method: 'POST',
        body: JSON.stringify(invoiceData),
      })
      createdInvoice.value = response
      error.value = null
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al crear la factura'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    createdInvoice,
    error,
    isLoading,
    createInvoice,
  }
})
