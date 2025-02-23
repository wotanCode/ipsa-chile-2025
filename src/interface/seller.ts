// Interfaz para los datos que se envían al crear o editar un vendedor
export interface SellerPayload {
  name: string
  email?: string
  phone?: string
  mobile?: string
  address?: string
}

// Interfaz para el vendedor tal como la API la retorna
export interface Seller extends SellerPayload {
  id: number // Identificador único asignado por el sistema
  deleted?: boolean // Flag para indicar si fue eliminado
  createdAt?: string // Fecha de creación (ISO 8601)
  updatedAt?: string // Fecha de la última actualización (ISO 8601)
}
