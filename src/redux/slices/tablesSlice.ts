import { TablesApi } from "@/models"
import { createSlice } from "@reduxjs/toolkit"

export const tablesKey = "tables"

const TablesApiEmptyState: TablesApi = {
  tables: [],
}

export const tablesSlice = createSlice({
  name: "tables",
  initialState: TablesApiEmptyState,
  reducers: {
    setDataInTable: (state, action) => action.payload,
  },
})

export const { setDataInTable } = tablesSlice.actions

export default tablesSlice.reducer
