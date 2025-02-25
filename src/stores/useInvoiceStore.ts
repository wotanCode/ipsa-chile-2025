/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiFetch } from '@/utils/apiFetch'

export interface InvoiceItem {
  id: number
  price: number
  quantity: number
  description?: string
  discount?: number
  tax?: Array<{
    id: number
    quantity: number
  }>
}

export interface InvoicePayload {
  client: number | string
  date: string
  dueDate: string
  items: InvoiceItem[]
}

export const useInvoiceStore = defineStore('invoice', () => {
  const createdInvoice = ref<any>(null)
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

      createdInvoice.value = response
      error.value = null
      return response
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
