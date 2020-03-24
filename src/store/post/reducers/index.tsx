import { PostActionTypes, PostState, ADD_POST } from "../actions";

const initialState: PostState = {
  posts: []
}

export function postReducer(state = initialState, action: PostActionTypes): PostState {
  switch (action.type) {
    case ADD_POST:
      return {
        posts: [...state.posts, action.payload]
      }
    default: 
      return state
  }
}