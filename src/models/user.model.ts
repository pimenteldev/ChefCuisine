import {Roles} from './roles.model'

export interface BackendUser {
  user_id: string
  user_name: string
  user_photo: string
  user_psw: string
  user_rol: string
}

export interface User {
  userId: string
  userName: string
  userPhoto: string
  rol: Roles
}

export const UserEmptyState: User = {
  userId: '',
  userName: '',
  userPhoto: '',
  rol: Roles.EMPTY,
}
