import { PostActionTypes, PostState, ADD_POST, UPDATE_POST_IMAGE } from "../actions";

const initialState: PostState = {
  posts: {}
}

export function postReducer(state = initialState, action: PostActionTypes): PostState {
  switch (action.type) {
    case ADD_POST:
      const mainMapCopy = {...state.posts}
      const newProjectPosts = {...state.posts[action.payload.projectId]}
      newProjectPosts[action.payload.id] = action.payload
      mainMapCopy[action.payload.projectId] = newProjectPosts
      return {
        posts: mainMapCopy
      }
    case UPDATE_POST_IMAGE:
      const mainMapCopy2 = {...state.posts}
      const newProjectPosts2 = {...state.posts[action.payload.post.projectId]}
      const newPost = newProjectPosts2[action.payload.post.id]
      newPost.image = action.payload.image 
      newProjectPosts2[action.payload.post.id] = newPost
      mainMapCopy2[action.payload.post.projectId] = newProjectPosts2
      return {
        posts: mainMapCopy2
      }
    default: 
      return state
  }
}