export interface InvoiceResponse {
  id: string
  date: Date
  dueDate: Date
  datetime: Date
  observations: null
  anotation: null
  termsConditions: string
  status: InvoiceResponseStatus
  client: Client
  numberTemplate: NumberTemplate
  subtotal: number
  discount: number
  tax: number
  total: number
  totalPaid: number
  balance: number
  decimalPrecision: string
  warehouse: PriceList
  term: Term
  barCodeContent: string
  seller: null
  priceList: PriceList
  items: Item[]
  costCenter: null
  printingTemplate: PrintingTemplate
}

export interface Client {
  id: string
  name: ClientName
  identification: null
  phonePrimary: null
  phoneSecondary: null
  fax: null
  mobile: null
  email: Email
  regime: string
  address: Address
  kindOfPerson: string
  identificationObject: IdentificationObject
}

export interface Address {
  address: null
  department: null
  city: null
}

export enum Email {
  PedroYanezEjemploCOM = 'pedro.yanez@ejemplo.com',
}

export interface IdentificationObject {
  type: null
  number: null
}

export enum ClientName {
  PedroYanez = 'Pedro Yanez',
}

export interface Item {
  name: string
  description: string
  price: number
  discount: number
  reference: null
  quantity: number
  id: string
  productKey: null
  unit: Unit
  tax: Tax[]
  total: number
}

export interface Tax {
  id: string
  name: TaxName
  percentage: string
  description: string
  status: CategoryFavorableStatus
  deductible: Deductible
  type: TaxType
  categoryFavorable: Category
  categoryToBePaid: Category
  rate: Rate
  amount: number
}

export interface Category {
  id: string
  idParent: string
  name: TextEnum
  text: TextEnum
  code: null
  description: string
  type: CategoryFavorableType
  readOnly: boolean
  nature: Nature
  blocked: Blocked
  status: CategoryFavorableStatus
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
  IvaInFavorCol = 'IVA_IN_FAVOR_COL',
  IvaToPayCol = 'IVA_TO_PAY_COL',
}

export enum CategoryRuleName {
  IVADescontable = 'IVA descontable',
  IVAGenerado = 'IVA generado',
}

export enum TextEnum {
  ImpuestoALasVentasAFavor = 'Impuesto a las ventas a favor',
  ImpuestoALasVentasPorPagar = 'Impuesto a las ventas por pagar',
}

export enum Nature {
  Credit = 'credit',
  Debit = 'debit',
}

export enum CategoryFavorableStatus {
  Active = 'active',
}

export enum CategoryFavorableType {
  Asset = 'asset',
  Liability = 'liability',
}

export enum Use {
  Movement = 'movement',
}

export enum Deductible {
  Yes = 'yes',
}

export enum TaxName {
  IVAExento = 'IVA Exento',
}

export enum Rate {
  Exempt = 'EXEMPT',
}

export enum TaxType {
  Iva = 'IVA',
}

export enum Unit {
  Unit = 'unit',
}

export interface NumberTemplate {
  id: string
  prefix: null
  number: string
  text: null
  documentType: DocumentType
  fullNumber: string
  formattedNumber: string
}

export enum DocumentType {
  Invoice = 'invoice',
}

export interface PriceList {
  id: string
  name: PriceListName
}

export enum PriceListName {
  General = 'General',
  Principal = 'Principal',
}

export interface PrintingTemplate {
  id: string
  name: PrintingTemplateName
  pageSize: PageSize
}

export enum PrintingTemplateName {
  Clásico = 'Clásico',
}

export enum PageSize {
  Letter = 'letter',
}

export enum InvoiceResponseStatus {
  Draft = 'draft',
}

export enum Term {
  The7Días = '7 días',
}
