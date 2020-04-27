import { ADD_SUBCOMMENT, SubCommentState, SubCommentActionTypes } from "../actions";
import { Comment } from "../../../types";

const initialState: SubCommentState = {
  commentsMap: {}
}

// Comments are indexed by postId
export function subcommentReducer(state = initialState, action: SubCommentActionTypes): SubCommentState {
  switch (action.type) {
    case ADD_SUBCOMMENT:
        const commentsMapCopy = state.commentsMap
        // Find all subcomments for the parent comment
        const currentParentCommentSubComments = commentsMapCopy[action.payload.parentComment.id] === undefined ? {} : {...commentsMapCopy[action.payload.parentComment.id]} 
        // Add the new subcomment to the parents subcomments map
        currentParentCommentSubComments[action.payload.childComment.id] = action.payload.childComment
        // Replace subcomments for parent with new map
        commentsMapCopy[action.payload.parentComment.id] = currentParentCommentSubComments
        return {
            commentsMap: commentsMapCopy
        }
    default: 
      return state
  }
}