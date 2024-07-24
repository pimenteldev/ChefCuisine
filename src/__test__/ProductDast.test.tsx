import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import "@testing-library/jest-dom/jest-globals"
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"
import { Provider } from "react-redux"
import ProductsDash from "@/pages/Private/Orders/components/ProductsDash/ProductsDash"
import { mockStore } from "@/redux/store"
const { expect, describe, it } = require("@jest/globals")

const mockedProducts = [
  {
    product_id: 1,
    product_name: "Producto 1",
    product_category: 1,
    product_items: [{ item_id: 1, item_count: 10 }],
  },
  {
    product_id: 2,
    product_name: "Producto 2",
    product_category: 2,
    product_items: [{ item_id: 2, item_count: 5 }],
  },
]

const mockedCategories = [
  { category_id: 1, category_name: "Categoría 1" },
  { category_id: 2, category_name: "Categoría 2" },
]

const mockedItems = [
  { item_id: 1, item_name: "Item 1", item_count: 20 },
  { item_id: 2, item_name: "Item 2", item_count: 15 },
]

describe("ProductsDash Component", () => {
  beforeEach(() => {
    render(
      <Provider
        store={mockStore({
          products: mockedProducts,
          categories: mockedCategories,
          items: mockedItems,
        })}
      >
        <ProductsDash />
      </Provider>
    )
  })

  it("should render the container", () => {
    const container = screen.getByRole("container")
    expect(container).toBeInTheDocument()
  })

  it("should display a message if there are no products", () => {
    render(
      <Provider store={mockStore({ products: [] })}>
        <ProductsDash />
      </Provider>
    )

    const noProductsMessage = screen.getByText(
      "No existen Productos en el Sistema"
    )
    expect(noProductsMessage).toBeInTheDocument()
  })

  it("should render product cards for each product", () => {
    const productCards = screen.getAllByRole("article", {
      name: /Product Card/i,
    })
    expect(productCards.length).toBe(mockedProducts.length)
  })

  it("should display product name, category, and available quantity", () => {
    const productCards = screen.getAllByRole("article", {
      name: /Product Card/i,
    })

    productCards.forEach((productCard) => {
      const productName = productCard.querySelector(
        '[data-testid="product-name"]'
      )
      const productCategory = productCard.querySelector(
        '[data-testid="product-category"]'
      )
      const availableQuantity = productCard.querySelector(
        '[data-testid="available-quantity"]'
      )

      expect(productName).toBeInTheDocument()
      expect(productCategory).toBeInTheDocument()
      expect(availableQuantity).toBeInTheDocument()
    })
  })

  it("should handle selecting a product", () => {
    const productCard = screen.getByRole("article", { name: /Product Card/i })
    userEvent.click(productCard)

    // Simulate navigation to product detail page (replace with actual navigation logic)
    expect(window.location.pathname).toContain("/products/1") // Assuming product ID is 1
  })
})
