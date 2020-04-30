import { Post } from '../../../types'

export const ADD_POST = "ADD_POST"
export const UPDATE_POST_IMAGE = "UPDATE_POST_IMAGE"
export const REMOVE_POST = "REMOVE_POST"

export type PostState = {
  posts: Record<string, Record<string, Post>>
}

interface AddPostAction {
  type: typeof ADD_POST
  payload: Post
}

// Used for updating an image that has been downloading in the background.
interface UpdatePostImageAction {
  type: typeof  UPDATE_POST_IMAGE
  payload: {
    post: Post
    image: Blob
  }
}

export type PostActionTypes = AddPostAction | UpdatePostImageAction

export function addPost(newPost: Post): PostActionTypes {
  return {
    type: ADD_POST,
    payload: newPost
  }
}

export function updateImageForPost(post: Post, image: Blob): PostActionTypes {
  return {
    type: UPDATE_POST_IMAGE,
    payload: {
      post: post,
      image: image
    }
  }
}