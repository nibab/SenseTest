import { CommentState, CommentActionTypes, ADD_COMMENT, ADD_SUBCOMMENT } from "../actions";
import { Comment } from "../../../types";

const initialState: CommentState = {
  comments: {}
}

// Comments are indexed by postId
export function commentReducer(state = initialState, action: CommentActionTypes): CommentState {
  switch (action.type) {
    case ADD_COMMENT:
        const commentsCopy = state.comments
        const commentsForPostId: Record<string, Comment> = state.comments[action.payload.postId] === undefined ? {} : {...state.comments[action.payload.postId]}     
        commentsForPostId[action.payload.id] = action.payload
        
        //currentPostComments.push(action.payload)
        commentsCopy[action.payload.postId] = commentsForPostId
        return {
            comments: commentsCopy
        }
    default: 
      return state
  }
}