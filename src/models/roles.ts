export enum Roles {
  ADMIN = "admin",
  USER = "user",
  EMPTY = "",
}

export interface Role {
  role_id: number
  role_name: string
  role_color: string
  role_seller: number
}
