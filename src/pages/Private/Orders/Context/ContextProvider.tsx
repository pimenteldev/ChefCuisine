import React, { createContext, useContext, useState } from "react"

export const FilterContext = createContext<any>({})

type Action = "preview" | "facture" | "viewFacture"

interface DialogState {
  action: Action
}

interface Props {
  children: React.ReactNode
}

export const OrdersProvider = ({ children }: Props) => {
  const [filter, setFilter] = useState({
    category: 0,
  })

  const [dialog, setDialog] = useState<DialogState>({
    action: "preview",
  })

  return (
    <FilterContext.Provider value={{ filter, setFilter, dialog, setDialog }}>
      {children}
    </FilterContext.Provider>
  )
}

export const useOrderViewContext = () => {
  const context = useContext(FilterContext)
  if (context === null || context === undefined) {
    throw new Error("useOrderViewContext must be used within a OrdersProvider")
  }
  return context
}
