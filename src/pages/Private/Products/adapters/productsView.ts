import { ProductsApi } from "@/models"

export const ProductsViewAdapter = (productsApi: ProductsApi) => {
  return {
    products: productsApi.products,
    categories: productsApi.categories,
    items: productsApi.items,
    items_categories: productsApi.items_categories,
    units: productsApi.units,
  }
}
