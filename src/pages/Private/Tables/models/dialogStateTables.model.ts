import { Table } from "@/models"

type Action = "add" | "modify" | "remove"

export interface DialogStateTables {
  action: Action
  table?: Table
}
