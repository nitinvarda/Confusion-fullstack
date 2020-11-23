import * as ActionTypes from './ActionTypes'

const initialState = {
    isLoading: false,
    errMess: null,
    user: null,
    token: null,
    isAuthenticated: false
}


export const login = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_USER_LOADING:
            return {
                ...state,
                isLoading: true,

            }
        case ActionTypes.LOGIN_USER_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                isAuthenticated: true,
                isLoading: false
            }
        case ActionTypes.LOGIN_USER_FAILED:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload,

            }
        case ActionTypes.LOGOUT_USER:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                user: null,
                isLoading: false,
                isAuthenticated: false
            }
        default:
            return state
    }
}