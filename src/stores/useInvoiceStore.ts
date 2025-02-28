import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiFetch } from '@/utils/apiFetch'
import { type InvoiceResponse } from '@/interface/alegra_invoice_api'

export interface InvoiceItem {
  id: string | number
  price: number
  quantity: number
  description?: string
  discount?: number
  tax?: Array<{
    id: string | number
    quantity: number
  }>
}

export interface InvoicePayload {
  client: string | number
  date: string
  dueDate: string
  items: InvoiceItem[]
}

export const useInvoiceStore = defineStore('invoice', () => {
  const createdInvoice = ref<InvoiceResponse | null>(null)
  const error = ref<string | null>(null)
  const isLoading = ref(false)

  const createInvoice = async (payload: InvoicePayload) => {
    isLoading.value = true
    try {
      const response = await apiFetch('/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.id) {
        throw new Error('Respuesta inválida de la API')
      }

      createdInvoice.value = response as InvoiceResponse
      error.value = null
      return response
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message
      error.value = `Error ${err.response?.status || 500}: ${errorMessage}`
      throw new Error(errorMessage)
    } finally {
      isLoading.value = false
    }
  }

  return { createdInvoice, error, isLoading, createInvoice }
})
