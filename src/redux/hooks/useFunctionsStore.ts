import { Item, ProductInOrder } from "@/models/products"

export function updateNewListItems(
  newListItems: Item[],
  filteredOrders: ProductInOrder[],
  list: ProductInOrder[],
  productCount: number
) {
  // Función para actualizar los elementos de la lista
  function updateListItems(products: ProductInOrder[]) {
    products.forEach((product) => {
      product?.product_items?.forEach((productItem) => {
        newListItems.forEach((listItem, index) => {
          if (listItem?.item_id === productItem?.item_id) {
            newListItems[index] = {
              ...listItem,
              item_count:
                listItem.item_count -
                (productItem?.item_count || 0) * productCount,
            }
          }
        })
      })
    })
  }

  // Actualizar newListItems con los pedidos
  updateListItems(filteredOrders)

  // Actualizar newListItems con la lista
  updateListItems(list)

  return newListItems
}
