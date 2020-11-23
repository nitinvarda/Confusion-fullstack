
import * as ActionTypes from './ActionTypes';


const initialState = {
    isLoading: false,
    errMess: null,
    Status: ''
}
export const comments = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENT_LOADING:
        case ActionTypes.DELETE_COMMENT_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case ActionTypes.ADD_COMMENT_SUCCESS:
        case ActionTypes.DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                Status: action.payload
            }

        case ActionTypes.ADD_COMMENT_FAILED:
        case ActionTypes.DELETE_COMMENT_FAILED:
            return {
                ...state,
                errMess: action.payload
            }
        default:
            return state
    }

}