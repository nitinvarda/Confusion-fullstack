import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createForms } from 'react-redux-form'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { Dishes, dishWithId } from './dishes'
import { Promotions } from './promotions'
import { Leaders } from './leaders'
import { comments } from './comments'
import { InitialFeedback } from './forms'
import { composeWithDevTools } from 'redux-devtools-extension';
import { login } from './login'
import { favorites } from './favorites'
import { reservations } from './reservations'






export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            promotions: Promotions,
            leaders: Leaders,
            comments: comments,
            dishWithId: dishWithId,
            login: login,
            favorites: favorites,
            reservations: reservations,
            ...createForms({
                feedback: InitialFeedback
            })

        }),
        composeWithDevTools(applyMiddleware(thunk, logger))
    )
    return store
}
