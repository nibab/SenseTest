import { Comment, SubComment } from "../../../types"

export const ADD_COMMENT = "ADD_COMMENT"
export const ADD_SUBCOMMENT = "ADD_SUBCOMMENT"
export const REMOVE_COMMENT = "REMOVE_COMMENT"

export type CommentState = {
  comments: Record<string, Comment[]>
}

interface AddCommentAction {
  type: typeof ADD_COMMENT
  payload: Comment
}

interface AddSubCommentAction {
    type: typeof ADD_SUBCOMMENT
    payload: {
      parentComment: Comment,
      childComment: SubComment
    }
}

export type CommentActionTypes = AddCommentAction | AddSubCommentAction

export function addComment(newComment: Comment): CommentActionTypes {
  return {
    type: ADD_COMMENT,
    payload: newComment
  }
}

export function addsubComment(parentComment: Comment, childComment: SubComment): CommentActionTypes {
    return {
      type: ADD_SUBCOMMENT,
      payload: {
          parentComment: parentComment,
          childComment: childComment
      }
    }
  }