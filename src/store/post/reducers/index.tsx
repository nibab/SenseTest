import { PostActionTypes, PostState, ADD_POST, UPDATE_POST_IMAGE } from "../actions";

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
    case UPDATE_POST_IMAGE:
      const _newPosts = state.posts
      const newPost =_newPosts[action.payload.post.id]
      newPost.image = action.payload.image 
      _newPosts[action.payload.post.id] = newPost
      return {
        posts: _newPosts
      }
    default: 
      return state
  }
}