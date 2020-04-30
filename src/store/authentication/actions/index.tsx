import { Post } from '../../../types'

export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"

export type AuthState = {
  authenticated: boolean
  email?: string
  userName?: string
}

type UserInfo = {
    email: string
    userName: string
}

interface LoginAction {
    type: typeof LOGIN
    payload: UserInfo
}

interface LogoutAction {
    type: typeof LOGOUT
}

export type AuthActionTypes = LoginAction | LogoutAction

export function login(userInfo: UserInfo): AuthActionTypes {
    return {
        type: LOGIN,
        payload: userInfo
    }
}

export function logout(): AuthActionTypes {
    return {
      type: LOGOUT
    }
}
