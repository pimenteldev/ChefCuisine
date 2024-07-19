import { Personal } from "./personal"
import { Category, Item, Product, ProductInOrder, Unit } from "./products"
import { Role } from "./roles"
import { Setting } from "./setting"
import { Table } from "./tables"

export interface OrdersApi {
  products: Product[]
  categories: Category[]
  items: Item[]
  items_categories: Category[]
  units: Unit[]
  role: Role[]
  personal: Personal[]
  tables: Table[]
  settings: Setting[]
  orders: Order[]
  currentOrder: CurrentOrder
}
export interface CurrentOrder {
  products: ProductInOrder[]
  isTableSelected: boolean
  tableSelectId: number
  tableSelectName: string
  isPersonalSelected: boolean
  personalSelectDocument: string
  personalSelectName: string
  totals: Totals
}

export interface Totals {
  sub_total: number
  total_iva: number
  total_bs: number
  total_dolar: number
}

export interface Order {
  order_id: number
  order_table_id: number
  order_personal_document: string
  order_list_inventary: OrderListInventory[]
  order_create: Date | string
  order_status: number
}

export interface OrderListInventory {
  product_id: string
  product: Product
  product_count: number
  product_items: Item[]
}

export const OrdersEmptyState = {
  products: [],
  categories: [],
  items: [],
  items_categories: [],
  units: [],
  role: [],
  personal: [],
  tables: [],
  settings: [],
  orders: [],
  currentOrder: {
    products: [],
    isTableSelected: false,
    tableSelectId: 0,
    tableSelectName: "",
    isPersonalSelected: false,
    personalSelectDocument: "",
    personalSelectName: "",
    totals: {
      sub_total: 0,
      total_iva: 0,
      total_bs: 0,
      total_dolar: 0,
    },
  },
}

export const OrderEmptyState = {
  order_id: 0,
  order_table_id: 0,
  order_personal_document: "",
  order_list_inventary: "",
  order_create: "",
  order_status: 0,
}
