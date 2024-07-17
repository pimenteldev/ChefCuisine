export interface OrderInProcess {
  isTableSelected: boolean
  tableSelectId: number | null
  tableSelectName: string | null
  isPersonalSelected: boolean
  personalSelectDocument: string | null
  personalSelectName: string | null
}

export const INITIAL_ORDER_IN_PROCESS: OrderInProcess = {
  isTableSelected: false,
  tableSelectId: null,
  tableSelectName: null,
  isPersonalSelected: false,
  personalSelectDocument: null,
  personalSelectName: null,
}
