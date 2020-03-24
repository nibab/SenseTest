import { postReducer } from './post/reducers'
import { combineReducers } from 'redux'
import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux'

export const rootReducer = combineReducers({
  post: postReducer
})

export type RootState = ReturnType<typeof rootReducer>

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector