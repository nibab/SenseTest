import { PostActionTypes, PostState, ADD_POST } from "../actions";

const initialState: PostState = {
  posts: {}
}

export function postReducer(state = initialState, action: PostActionTypes): PostState {
  switch (action.type) {
    case ADD_POST:
      const newPosts = state.posts
      newPosts[action.payload.id] = action.payload
      return {
        posts: newPosts
      }
    default: 
      return state
  }
}