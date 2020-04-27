import { Comment, SubComment } from "../../../types"

export const ADD_COMMENT = "ADD_COMMENT"
export const ADD_SUBCOMMENT = "ADD_SUBCOMMENT"
export const REMOVE_COMMENT = "REMOVE_COMMENT"

export type CommentState = {
  // The comments map maps from posId to a dict of comment id to comment map.
  comments: Record<string, Record<string, Comment>>
}

interface AddCommentAction {
  type: typeof ADD_COMMENT
  payload: Comment
}

export type CommentActionTypes = AddCommentAction 

export function addComment(newComment: Comment): CommentActionTypes {
  return {
    type: ADD_COMMENT,
    payload: newComment
  }
}