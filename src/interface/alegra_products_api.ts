export interface ProductsResponse {
  id: string
  category: Category
  hasNoIvaDays: boolean
  name: string
  description: string
  reference: null
  status: Status
  calculationScale: number
  price: Price[]
  inventory: Inventory
  accounting: Accounting
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tax: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customFields: any[]
  productKey: null
  type: ProductsResponseType
  itemType: null
}

export interface Accounting {
  inventory: Invent
  inventariablePurchase: Invent
}

export interface Invent {
  id: string
  idParent: string
  name: TextEnum
  text: TextEnum
  code: null
  description: string
  type: InventariablePurchaseType
  readOnly: boolean
  nature: Nature
  blocked: Blocked
  status: Status
  categoryRule: CategoryRule
  use: Use
  showThirdPartyBalance: boolean
}

export enum Blocked {
  No = 'no',
}

export interface CategoryRule {
  id: string
  name: CategoryRuleName
  key: Key
}

export enum Key {
  InventariablePurchases = 'INVENTARIABLE_PURCHASES',
  Inventory = 'INVENTORY',
}

export enum CategoryRuleName {
  CostoDeVentas = 'Costo de ventas',
  Inventario = 'Inventario',
}

export enum TextEnum {
  CostosDelInventario = 'Costos del inventario',
  Inventarios = 'Inventarios',
}

export enum Nature {
  Debit = 'debit',
}

export enum Status {
  Active = 'active',
}

export enum InventariablePurchaseType {
  Asset = 'asset',
  Cost = 'cost',
}

export enum Use {
  Movement = 'movement',
}

export interface Category {
  id: string
  name: CategoryName
}

export enum CategoryName {
  Ventas = 'Ventas',
}

export interface Inventory {
  initialQuantity: number
  initialQuantityDate: Date
  unit: Unit
  unitCost: number
  availableQuantity: number
  warehouses: Warehouse[]
}

export enum Unit {
  Unit = 'unit',
}

export interface Warehouse {
  name: WarehouseName
  observations: null
  isDefault: boolean
  status: Status
  id: string
  costCenter: null
  address: null
  initialQuantity: number
  availableQuantity: number
  minQuantity: null
  maxQuantity: null
}

export enum WarehouseName {
  Principal = 'Principal',
}

export interface Price {
  idPriceList: string
  name: PriceName
  type: PriceType
  price: number
  currency: Currency
  main: boolean
}

export interface Currency {
  code: Code
  symbol: Symbol
}

export enum Code {
  Cop = 'COP',
}

export enum Symbol {
  Empty = '$',
}

export enum PriceName {
  General = 'General',
}

export enum PriceType {
  Amount = 'amount',
}

export enum ProductsResponseType {
  Product = 'product',
}
