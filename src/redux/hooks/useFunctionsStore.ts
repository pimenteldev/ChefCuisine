export function updateNewListItems(newListItems, orders, list, productCount) {
  // Función para actualizar los elementos de la lista
  function updateListItems(products) {
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
  updateListItems(orders)

  // Actualizar newListItems con la lista
  updateListItems(list)

  return newListItems
}
