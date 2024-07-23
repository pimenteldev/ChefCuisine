export function UpdateNewListItems(newListItems, orders, list, productCount) {
  orders.forEach(function (product) {
    var countItemsInProduct = product?.product_items?.length || 0
    for (var i = 0; i < countItemsInProduct; i++) {
      newListItems.forEach(function (li, index) {
        if (li?.item_id === product?.product_items?.[i]?.item_id) {
          newListItems[index] = {
            ...li,
            item_count:
              li.item_count -
              (product?.product_items?.[i]?.item_count || 0) * productCount,
          }
        }
      })
    }
  })

  list.forEach(function (product) {
    var countItemsInProduct = product?.product_items?.length || 0
    for (var i = 0; i < countItemsInProduct; i++) {
      newListItems.forEach(function (li, index) {
        if (li?.item_id === product?.product_items?.[i]?.item_id) {
          newListItems[index] = {
            ...li,
            item_count:
              li.item_count -
              (product?.product_items?.[i]?.item_count || 0) * productCount,
          }
        }
      })
    }
  })

  return newListItems
}
