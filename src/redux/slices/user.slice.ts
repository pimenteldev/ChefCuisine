import {clearLocalStorage, persistLocalStorage} from '@/helpers'
import {User, UserEmptyState} from '@/models'
import {createSlice} from '@reduxjs/toolkit'

export const UserKey = 'user'

export const userSlice = createSlice({
  name: 'user',
  initialState: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : UserEmptyState,
  reducers: {
    createUser: (state, action) => {
      persistLocalStorage<User>(UserKey, action.payload)
      return action.payload
    },
    updateUser: (state, action) => {
      const result = {...state, ...action.payload}
      persistLocalStorage<User>(UserKey, result)
      return result
    },
    resetUser: () => {
      clearLocalStorage(UserKey)
      return UserEmptyState
    },
  },
})

export const {createUser, updateUser, resetUser} = userSlice.actions

export default userSlice.reducer
