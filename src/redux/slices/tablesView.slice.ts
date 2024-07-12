import { TablesViewApi } from "@/models"
import { createSlice } from "@reduxjs/toolkit"

export const tablesKey = "tables"

const TablesViewApiEmptyState: TablesViewApi = {
  tables: [],
}

export const tablesViewSlice = createSlice({
  name: "tablesViewState",
  initialState: TablesViewApiEmptyState,
  reducers: {
    setDataInViewTable: (state, action) => action.payload,
  },
})

export const { setDataInViewTable } = tablesViewSlice.actions

export default tablesViewSlice.reducer
