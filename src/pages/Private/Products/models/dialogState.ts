import { Product } from "@/models/products"

type Action = "add" | "modify" | "remove"

export interface DialogState {
  action: Action
  product?: Product
}
