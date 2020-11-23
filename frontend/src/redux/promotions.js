import * as ActionTypes from './ActionTypes';


const initialState = {
    isLoading: false,
    errMess: null,
    promotions: []

}

export const Promotions = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.PROMOS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case ActionTypes.PROMOS_SUCCESS:
            return {
                ...state,
                promotions: action.payload,
                isLoading: false
            }
        case ActionTypes.PROMOS_FAILED:
            return {
                ...state,

                errMess: action.payload

            }
        default:
            return state;
    }
}