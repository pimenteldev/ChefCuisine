export interface ProductsApi {
  products: Product[]
  categories: Category[]
  items: Item[]
  items_categories: Category[]
  units: Unit[]
}

export interface Category {
  category_id: number
  category_name: string
  category_color: string
  category_ingredient?: number
}

export interface Item {
  item_id: number
  item_name: string
  item_category: number
  item_uni_metric: number
  item_count: number
  item_create: string
  item_status: number
}

export interface Product {
  product_id: string
  product_name: string
  product_description: string
  product_base_price: number
  product_category: number
  product_items: Item[]
  product_photo: string
  product_photo_thumb: string
  product_status: number
}

export interface Unit {
  unit_id: number
  unit_name: string
  unit_type: string
}

export const ItemEmptyState: Item = {
  item_id: 0,
  item_count: 0,
  item_category: 0,
  item_uni_metric: 0,
  item_name: "",
  item_create: "",
  item_status: 0,
}

export const ProductEmptyState: Product = {
  product_id: "",
  product_name: "",
  product_description: "",
  product_base_price: 0,
  product_category: 0,
  product_items: [ItemEmptyState],
  product_photo: "",
  product_photo_thumb: "",
  product_status: 0,
}
