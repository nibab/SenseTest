import { postReducer } from './post/reducers'
import { combineReducers } from 'redux'
import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux'
import { commentReducer } from './comment/reducers'
import { subcommentReducer } from './subcomment/reducers'
import { authReducer } from './authentication/reducers'

export const rootReducer = combineReducers({
  post: postReducer,
  comment: commentReducer,
  subcomment: subcommentReducer,
  auth: authReducer
})

export type RootState = ReturnType<typeof rootReducer>

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector