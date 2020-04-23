import { CommentState, CommentActionTypes, ADD_COMMENT, ADD_SUBCOMMENT } from "../actions";

const initialState: CommentState = {
  comments: {}
}

export function commentReducer(state = initialState, action: CommentActionTypes): CommentState {
  switch (action.type) {
    case ADD_COMMENT:
        const newComments = state.comments
        newComments[action.payload.id] = action.payload
        return {
            comments: newComments
        }
    case ADD_SUBCOMMENT:
        
        const newComment = state.comments[action.payload.parentComment.id]
        const newSubcomments = newComment.subcomments === undefined ? [] : newComment.subcomments
        newSubcomments.push(action.payload.childComment)
        newComment.subcomments = newSubcomments
        const _newComments = state.comments
        _newComments[action.payload.parentComment.id] = newComment
        return {
            comments: _newComments
        }
    default: 
      return state
  }
}