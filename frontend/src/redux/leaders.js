
import * as ActionTypes from '../redux/ActionTypes';

const initialState = {
    isLoading: false,
    errMess: false,
    leaders: []
}

export const Leaders = (state = initialState, action) => {

    switch (action.type) {
        case ActionTypes.LEADERS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case ActionTypes.LEADERS_SUCCESS:
            return {
                ...state,
                leaders: action.payload,
                isLoading: false


            }
        case ActionTypes.LEADERS_FAILED:
            return {
                ...state,
                errMess: action.payload
            }
        default:
            return state;
    }
}