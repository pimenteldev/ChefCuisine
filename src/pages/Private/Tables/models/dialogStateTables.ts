import { Table } from "@/models/tables"

type Action = "add" | "modify" | "remove"
export interface DialogStateTables {
  action: Action
  table?: Table
}
