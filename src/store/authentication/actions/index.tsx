import { Post } from '../../../types'

export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"

export type AuthState = {
  authenticated: boolean
}

interface LoginAction {
    type: typeof LOGIN
}

interface LogoutAction {
    type: typeof LOGOUT
}

export type AuthActionTypes = LoginAction | LogoutAction

export function login(): AuthActionTypes {
    return {
        type: LOGIN
    }
}

export function logout(): AuthActionTypes {
    return {
      type: LOGOUT
    }
}
