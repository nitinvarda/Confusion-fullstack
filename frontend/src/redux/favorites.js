import * as ActionTypes from './ActionTypes'


const initialState = {
    isLoading: false,
    errMess: null,
    favorites: [],
    addStatus: '',
    delStatus: ''
}
export const favorites = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_FAVORITES_LOADING:
        case ActionTypes.ADD_FAVORITE_LOADING:
        case ActionTypes.DELETE_FAVORITE_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case ActionTypes.GET_FAVORITES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                favorites: action.payload
            }
        case ActionTypes.ADD_FAVORITE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                addStatus: action.payload
            }
        case ActionTypes.DELETE_FAVORITE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                delStatus: action.payload
            }
        case ActionTypes.DELETE_FAVORITE_FAILED:
        case ActionTypes.GET_FAVORITES_FAILED:
        case ActionTypes.ADD_FAVORITE_FAILED:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload
            }

        default:
            return state
    }
}