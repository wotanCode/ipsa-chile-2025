export interface Invoice {
  id: number
  date: string
  dueDate: string
  client: number
  items: Array<{
    id: number
    price: number
    quantity: number
  }>
  total: number
  status: 'open' | 'closed' | 'voided'
}
