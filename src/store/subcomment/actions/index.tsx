import { Comment, SubComment } from "../../../types"

export const ADD_SUBCOMMENT = "ADD_SUBCOMMENT"

export type SubCommentState = {
  // The comments map maps from comment id to a map of subcomment id to subcomment
  commentsMap: Record<string, Record<string, SubComment>>
}

interface AddSubCommentAction {
    type: typeof ADD_SUBCOMMENT
    payload: {
      parentComment: Comment,
      childComment: SubComment
    }
}

export type SubCommentActionTypes = AddSubCommentAction 

export function addsubComment(parentComment: Comment, childComment: SubComment): SubCommentActionTypes {
    return {
        type: ADD_SUBCOMMENT,
        payload: {
            parentComment: parentComment,
            childComment: childComment
        }
    }
}