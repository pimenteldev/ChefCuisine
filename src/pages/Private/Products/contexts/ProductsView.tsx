import React, { createContext, useContext, useState } from "react"
import { DialogState } from "../models/dialogState"

export const ProductsContext = createContext<any>(null)

interface Props {
  children: React.ReactNode
}

export const ProductsProvider = ({ children }: Props) => {
  const [dialog, setDialog] = useState<DialogState>({
    action: "add",
  })

  return (
    <ProductsContext.Provider value={{ dialog, setDialog }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProductsViewContext = () => {
  const context = useContext(ProductsContext)
  if (context === null || context === undefined) {
    throw new Error(
      "useProductsViewContext must be used within a ProductsProvider"
    )
  }
  return context
}
