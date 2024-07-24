import { TablesApi } from "@/models/tables"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export const tablesKey = "tables"

const TablesApiEmptyState: TablesApi = {
  tables: [],
}

export const tablesSlice = createSlice({
  name: tablesKey,
  initialState: TablesApiEmptyState,
  reducers: {
    setDataInTable: (state, action: PayloadAction<TablesApi>) => action.payload,
  },
})

export const { setDataInTable } = tablesSlice.actions

export default tablesSlice.reducer
