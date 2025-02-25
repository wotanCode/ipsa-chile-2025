// Interfaz para los datos que se envían al crear o editar un vendedor
export interface SellerPayload {
  name: string
  email?: string
  identification?: string
  phonePrimary?: string
  observations?: string
  status?: 'active' | 'inactive'
}

// Interfaz para el vendedor tal como la API la retorna
export interface Seller extends SellerPayload {
  id: number
  deleted?: boolean
  createdAt?: string
  updatedAt?: string
}
