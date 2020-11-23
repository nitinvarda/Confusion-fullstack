import * as ActionTypes from './ActionTypes';

const initialState = {
    isLoading: false,
    errMess: null,
    reservations: []
}

export const reservations = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.RESERVATIONS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case ActionTypes.RESERVATIONS_SUCCESS:
            return {
                ...state,
                reservations: action.payload,
                isLoading: false
            }
        case ActionTypes.RESERVATIONS_FAILED:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload
            }
        default:
            return state
    }
}

const initialAddState = {
    isLoading: false,
    errMess: null,
    status: null
}

export const add_reservation = (state = initialAddState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_RESERVATION_LOADING:
            return {
                ...state,
                isLoading: true
            }

        case ActionTypes.ADD_RESERVATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                status: action.payload
            }
        case ActionTypes.ADD_RESERVATION_FAILED:
            return {
                ...state,
                errMess: action.payload
            }

        default:
            return state;
    }
}