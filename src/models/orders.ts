import { Personal } from "./personal"
import { Category, Item, Product, Unit } from "./products"
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
}

export interface Order {
  order_id: number
  order_table_id: number
  order_personal_document: string
  order_list_inventary: string
  order_create: Date | string
  order_status: number
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
}

export const OrderEmptyState = {
  order_id: 0,
  order_table_id: 0,
  order_personal_document: "",
  order_list_inventary: "",
  order_create: "",
  order_status: 0,
}
