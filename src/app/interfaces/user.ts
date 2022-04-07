export interface UserResponse {
  accessToken:string,
  user: User,
}


export interface User {
  email: string,
  password: string,
  name: string,
  id?: number,
}
