import { CommentState, CommentActionTypes, ADD_COMMENT, ADD_SUBCOMMENT } from "../actions";

const initialState: CommentState = {
  comments: {}
}

// Comments are indexed by postId
export function commentReducer(state = initialState, action: CommentActionTypes): CommentState {
  switch (action.type) {
    case ADD_COMMENT:
        const commentsCopy = state.comments
        const currentPostComments = state.comments[action.payload.postId] === undefined ? [] : [...state.comments[action.payload.postId]]        
        currentPostComments.push(action.payload)
        commentsCopy[action.payload.postId] = currentPostComments
        return {
            comments: commentsCopy
        }
    case ADD_SUBCOMMENT:
        // Find all comments for the post id that was passed in
        const currentPostIdComments = state.comments[action.payload.parentComment.postId]
        
        // Find the parent comment that the subcomment is supposed to attach to
        const parentComment = currentPostIdComments.filter(comment => comment.id === action.payload.parentComment.id)[0]
        const allCommentsButParentComment =  currentPostIdComments.filter(comment => comment.id !== action.payload.parentComment.id)

        const newSubcomments = parentComment.subcomments === undefined ? [] : parentComment.subcomments
        newSubcomments.push(action.payload.childComment)
        // Create new subcomments array for the parent comment
        parentComment.subcomments = newSubcomments

        // Create new comment array for the post id
        allCommentsButParentComment.push(parentComment)
       
        // Copy of current comments
        const currentStateCopy = state.comments
        currentStateCopy[action.payload.parentComment.postId] = allCommentsButParentComment

        return {
            comments: currentStateCopy
        }
    default: 
      return state
  }
}