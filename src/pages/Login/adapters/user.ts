import { baseUrl } from "@/constants/utilitys"
import { Roles } from "@/models/roles"
import { BackendUser, User } from "@/models/user"

export const UserAdapter = (user: BackendUser): User => {
  return {
    userId: user.user_id,
    userName: user.user_name,
    userPhoto: baseUrl + user.user_photo,
    rol:
      user.user_rol === Roles.ADMIN
        ? Roles.ADMIN
        : user.user_rol === Roles.USER
        ? Roles.USER
        : Roles.EMPTY,
  }
}
