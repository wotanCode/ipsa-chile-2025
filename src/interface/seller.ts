export interface Seller {
  id: string
  name: string
  identification: null | string
  observations: null | string
  status: string
}

export interface SellerPayload {
  name: string
  identification?: string
  observations?: string
}
