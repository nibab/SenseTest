import { Post } from '../../../types'

export const ADD_POST = "ADD_POST"
export const REMOVE_POST = "REMOVE_POST"

export type PostState = {
  posts: Post[]
}

interface AddPostAction {
  type: typeof ADD_POST
  payload: Post
}

export type PostActionTypes = AddPostAction

export function addPost(newPost: Post): PostActionTypes {
  return {
    type: ADD_POST,
    payload: newPost
  }
}