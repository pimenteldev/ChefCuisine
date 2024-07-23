import UpdateNewListItems from "@/redux/hooks/useFunctionsStore"

describe("UpdateNewListItems", () => {
  it("should update newListItems based on orders and list", () => {
    const newListItems = [
      { item_id: 1, item_count: 10 },
      { item_id: 2, item_count: 20 },
      { item_id: 3, item_count: 30 },
    ]
    const orders = [
      {
        order_list_inventary: [
          { item_id: 1, item_count: 5 },
          { item_id: 3, item_count: 10 },
        ],
      },
      {
        order_list_inventary: [{ item_id: 2, item_count: 15 }],
      },
    ]
    const list = [
      {
        product_items: [
          { item_id: 1, item_count: 5 },
          { item_id: 2, item_count: 10 },
        ],
      },
      {
        product_items: [{ item_id: 3, item_count: 15 }],
      },
    ]
    const productCount = 2

    const result = UpdateNewListItems(newListItems, orders, list, productCount)

    expect(result).toEqual([
      { item_id: 1, item_count: 5 },
      { item_id: 2, item_count: 5 },
      { item_id: 3, item_count: 15 },
    ])
  })
})
