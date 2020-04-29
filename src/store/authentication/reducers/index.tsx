import { AuthActionTypes, LOGIN, LOGOUT } from "../actions";
import { AuthState } from "../actions"

const initialState: AuthState = {
  authenticated: false
}

export function authReducer(state = initialState, action: AuthActionTypes): AuthState {
    switch (action.type) {
        case LOGIN:
            return {
                authenticated: true
            }
        case LOGOUT:
            return {
                authenticated: false
            }
        default: 
            return state
    }
}