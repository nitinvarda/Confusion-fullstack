import * as ActionTypes from './ActionTypes';


const initialState = {
    isLoading: false,
    errMess: null,
    dishes: [],

}
export const Dishes = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.DISHES_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case ActionTypes.DISHES_SUCCESS:
            return {
                ...state,
                dishes: action.payload,
                isLoading: false
            }
        case ActionTypes.DISHES_FAILED:
            return {
                ...state,

                errMess: action.payload

            }

        default:
            return state;
    }
}

const initialDishState = {
    isLoading: false,
    errMess: null,
    dish: {}
}

export const dishWithId = (state = initialDishState, action) => {
    switch (action.type) {
        case ActionTypes.DISH_WITH_ID_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case ActionTypes.DISH_WITH_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                dish: action.payload,
                errMess: null
            }
        case ActionTypes.DISH_WITH_ID_FAILED:
            return {
                ...state,
                errMess: action.payload

            }
        default:
            return state


    }

}