import { clearLocalStorage, persistLocalStorage } from "@/helpers/localStorage"
import { User, UserEmptyState } from "@/models/user"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export const UserKey = "user"

export const userSlice = createSlice({
  name: UserKey,
  initialState: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : UserEmptyState,
  reducers: {
    createUser: (state, action: PayloadAction<User>) => {
      persistLocalStorage<User>(UserKey, action.payload)
      return action.payload
    },
    updateUser: (state, action) => {
      const result = { ...state, ...action.payload }
      persistLocalStorage<User>(UserKey, result)
      return result
    },
    resetUser: () => {
      clearLocalStorage(UserKey)
      return UserEmptyState
    },
  },
})

export const { createUser, updateUser, resetUser } = userSlice.actions

export default userSlice.reducer
