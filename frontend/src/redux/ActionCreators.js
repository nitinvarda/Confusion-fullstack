
import * as ActionTypes from './ActionTypes';


import axios from 'axios'




export const fetchDishes = () => async (dispatch) => {
    dispatch({ type: ActionTypes.DISHES_LOADING })
    try {

        const response = await axios.get('/dishes')
        dispatch({ type: ActionTypes.DISHES_SUCCESS, payload: response.data })
    }
    catch (err) {
        dispatch({ type: ActionTypes.DISHES_FAILED, payload: err })
    }
}


export const fetchLeaders = () => async (dispatch) => {
    dispatch({ type: ActionTypes.LEADERS_LOADING })

    try {
        const response = await axios.get('/leaders')
        dispatch({ type: ActionTypes.LEADERS_SUCCESS, payload: response.data })
    }
    catch (err) {
        dispatch({ type: ActionTypes.LEADERS_FAILED, payload: err })
    }
}

export const fetchPromos = () => async (dispatch) => {
    dispatch({ type: ActionTypes.PROMOS_LOADING })

    try {
        const response = await axios.get('/promotions')
        dispatch({ type: ActionTypes.PROMOS_SUCCESS, payload: response.data })
    }
    catch (err) {
        dispatch({ type: ActionTypes.PROMOS_FAILED, payload: err })
    }
}




export const dishWithId = (dishId) => async (dispatch, getState) => {
    dispatch({ type: ActionTypes.DISH_WITH_ID_LOADING })


    try {

        const response = await axios.get("/dishes/" + dishId)

        dispatch({ type: ActionTypes.DISH_WITH_ID_SUCCESS, payload: response.data })
        // dispatch(commentsWithId(dishId))

    }
    catch (err) {
        dispatch({ type: ActionTypes.DISH_WITH_ID_FAILED, payload: err })
    }
}



export const loginUser = (email, password) => async (dispatch) => {
    dispatch({ type: ActionTypes.LOGIN_USER_LOADING })

    try {
        const response = await axios.post("/users/signin", { email, password })
        dispatch({ type: ActionTypes.LOGIN_USER_SUCCESS, payload: response.data })
        dispatch(getFavorites())
        dispatch(getReservations())
    }
    catch (err) {
        dispatch({ type: ActionTypes.LOGIN_USER_FAILED, payload: err })
    }
}

export const logoutUser = () => async (dispatch) => {
    dispatch({ type: ActionTypes.LOGOUT_USER })


}


export const addFavorite = (id) => async (dispatch, getState) => {
    dispatch({ type: ActionTypes.ADD_FAVORITE_LOADING })

    try {
        const { login: { token } } = getState()



        const response = await axios({ method: 'post', url: '/favorites/' + id, headers: { 'Authorization': 'Bearer ' + token } })

        dispatch({ type: ActionTypes.ADD_FAVORITE_SUCCESS, payload: response.data })
        dispatch(getFavorites())
    }
    catch (err) {
        dispatch({ type: ActionTypes.ADD_FAVORITE_FAILED, payload: err })
    }
}


export const delFavorite = (id) => async (dispatch, getState) => {
    dispatch({ type: ActionTypes.DELETE_FAVORITE_LOADING })

    try {
        const { login: { token } } = getState()

        const config = {
            headers: {

                Authorization: `Bearer ${token}`
            }
        }

        const response = await axios.delete('/favorites/' + id, config)

        dispatch({ type: ActionTypes.DELETE_FAVORITE_SUCCESS, payload: response.data })

        dispatch(getFavorites())



    }
    catch (err) {
        dispatch({ type: ActionTypes.DELETE_FAVORITE_FAILED, payload: err })
    }
}




export const getFavorites = () => async (dispatch, getState) => {
    dispatch({ type: ActionTypes.GET_FAVORITES_LOADING })

    try {
        const { login: { token } } = getState()
        const config = {
            headers: {

                Authorization: `Bearer ${token}`
            }
        }

        const response = await axios.get("/favorites", config)
        dispatch({ type: ActionTypes.GET_FAVORITES_SUCCESS, payload: response.data })


    }
    catch (err) {
        dispatch({ type: ActionTypes.GET_FAVORITES_FAILED, payload: err })
    }

}




// Reservations

export const getReservations = () => async (dispatch, getState) => {
    dispatch({ type: ActionTypes.RESERVATIONS_LOADING })
    try {
        const { login: { token } } = getState()
        const config = {
            headers: {

                Authorization: `Bearer ${token}`
            }
        }
        const reservation = await axios.get('/reserve', config)
        dispatch({ type: ActionTypes.RESERVATIONS_SUCCESS, payload: reservation.data })

    }
    catch (err) {
        dispatch({ type: ActionTypes.RESERVATIONS_FAILED, payload: err })

    }
}


export const addReservation = (guests, smoking, date) => async (dispatch, getState) => {
    dispatch({ type: ActionTypes.ADD_RESERVATION_LOADING })
    try {
        const { login: { token } } = getState()

        const config = {
            headers: {

                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.post('/reserve', { guests, smoking, date }, config)

        dispatch({ type: ActionTypes.ADD_RESERVATION_SUCCESS, payload: response.data })
        dispatch(getReservations())

    }
    catch (err) {
        dispatch({ type: ActionTypes.ADD_RESERVATION_FAILED, payload: err })
    }

}

export const delReservation = (dishId) => async (dispatch, getState) => {
    dispatch({ type: ActionTypes.RESERVATIONS_LOADING })
    try {
        const { login: { token } } = getState()
        const config = {
            headers: {

                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.delete('/reserve/' + dishId, config)
        dispatch({ type: ActionTypes.RESERVATIONS_SUCCESS, payload: response.data })

    }
    catch (err) {
        dispatch({ type: ActionTypes.RESERVATIONS_FAILED, payload: err })

    }
}


// comments



export const addComment = (dishId, rating, comment) => async (dispatch, getState) => {
    dispatch({ type: ActionTypes.ADD_COMMENT_LOADING })

    try {
        const { login: { token } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }



        const response = await axios.post('/dishes/' + dishId + '/comments', { rating, comment }, config)
        dispatch({ type: ActionTypes.ADD_COMMENT_SUCCESS, payload: response.data })
        dispatch(fetchDishes())
    }
    catch (err) {

        dispatch({ type: ActionTypes.ADD_COMMENT_FAILED, payload: err })
    }



}


export const delComment = (dishId, commentId) => async (dispatch, getState) => {
    dispatch({ type: ActionTypes.DELETE_COMMENT_LOADING })

    try {
        const { login: { token } } = getState()
        const config = {
            headers: {

                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.delete("/dishes/" + dishId + "/comments/" + commentId, config)
        dispatch({ type: ActionTypes.DELETE_COMMENT_SUCCESS, payload: response.data })
        dispatch(fetchDishes())


    }
    catch (err) {
        dispatch({ type: ActionTypes.DELETE_COMMENT_FAILED, payload: err })
    }
}





// // post comment
// export const addComment = (comment) => ({

//     type: ActionTypes.ADD_COMMENT,
//     payload: comment
// })
// export const postComment = (dishId, rating, author, comment) => (dispatch) => {
//     const newComment = {
//         dishId: dishId,
//         rating: rating,
//         author: author,
//         comment: comment

//     }
//     newComment.date = new Date().toISOString();

//     return fetch(baseUrl + 'comments', {
//         method: 'POST',
//         body: JSON.stringify(newComment),
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         credentials: 'same-origin'

//     })
//         .then(response => {
//             if (response.ok) {
//                 return response
//             }
//             else {
//                 var error = new Error('Error ' + response.status + ": " + response.statusText)
//                 error.response = response;
//                 throw error
//             }
//         },
//             error => {
//                 var errmess = new Error(error.message)
//                 throw errmess
//             })
//         .then(response => response.json())
//         .then(comment => {
//             console.log(comment)
//             dispatch(addComment(comment))
//         })
//         .catch(error => console.log("post comments" + error))

// }

// // post feedback

// export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message) => (dispatch) => {
//     const values = {
//         firstname: firstname,
//         lastname: lastname,
//         telnum: telnum,
//         email: email,
//         agree: agree,
//         contactType: contactType,
//         message: message

//     }



//     values.date = new Date().toISOString()


//     return fetch(baseUrl + 'feedback', {
//         method: 'POST',
//         body: JSON.stringify(values),
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         credentials: 'same-origin'

//     })
//         .then(response => {
//             if (response.ok) {
//                 return response
//             }
//             else {
//                 var error = new Error('Error ' + response.status + ": " + response.statusText)
//                 error.response = response;
//                 throw error
//             }
//         },
//             error => {
//                 var errmess = new Error(error.message)
//                 throw errmess
//             })
//         .then(response => response.json())
//         .then(feedback => {

//             alert("Thanks for the feedback !" + JSON.stringify(feedback));
//             return feedback
//         })
//         .catch(error => console.log("post comments" + error))

// }





// // dishes

// export const fetchDishes = () => (dispatch) => {
//     dispatch(dishesLoading(true));
//     return fetch(baseUrl + 'dishes')
//         .then(response => {
//             if (response.ok) {
//                 return response
//             }
//             else {
//                 var error = new Error('Error ' + response.status + ": " + response.statusText)
//                 error.response = response;
//                 throw error
//             }
//         },
//             error => {
//                 var errmess = new Error(error.message)
//                 throw errmess
//             })
//         .then(response => response.json())
//         .then(dishes => {
//             dispatch(addDishes(dishes))
//         })
//         .catch(error => dispatch(dishesFailed(error)))

// }


// export const dishesLoading = () => ({
//     type: ActionTypes.DISHES_LOADING

// })

// export const dishesFailed = (errmess) => ({
//     type: ActionTypes.DISHES_FAILED,
//     payload: errmess

// })

// export const addDishes = (dishes) => ({
//     type: ActionTypes.ADD_DISHES,
//     payload: dishes

// })


// // comments

// export const fetchComments = () => (dispatch) => {
//     return fetch(baseUrl + 'comments')
//         .then(response => {
//             if (response.ok) {
//                 return response
//             }
//             else {
//                 var error = new Error('Error ' + response.status + ": " + response.statusText)
//                 error.response = response;
//                 throw error
//             }
//         },
//             error => {
//                 var errmess = new Error(error.message)
//                 throw errmess
//             })
//         .then(response => response.json())
//         .then(comments => {
//             dispatch(addComments(comments))
//         })
//         .catch(error => dispatch(commentsFailed(error)))
// }

// export const commentsFailed = (errmess) => ({
//     type: ActionTypes.COMMENTS_FAILED,
//     payload: errmess

// })

// export const addComments = (comments) => ({
//     type: ActionTypes.ADD_COMMENTS,
//     payload: comments

// })

// // Promotions

// export const fetchPromos = () => (dispatch) => {
//     dispatch(promosLoading(true));
//     return fetch(baseUrl + 'promotions')
//         .then(response => {
//             if (response.ok) {
//                 return response
//             }
//             else {
//                 var error = new Error('Error ' + response.status + ": " + response.statusText)
//                 error.response = response;
//                 throw error
//             }
//         },
//             error => {
//                 var errmess = new Error(error.message)
//                 throw errmess
//             })
//         .then(response => response.json())
//         .then(promos => {
//             dispatch(addPromos(promos))
//         })
//         .catch(error => {
//             dispatch(promosFailed(error))
//         })

// }


// export const promosLoading = () => ({
//     type: ActionTypes.PROMOS_LOADING

// })

// export const promosFailed = (errmess) => ({
//     type: ActionTypes.PROMOS_FAILED,
//     payload: errmess

// })

// export const addPromos = (dishes) => ({
//     type: ActionTypes.ADD_PROMOS,
//     payload: dishes

// })


// // Leaders
// export const fetchLeaders = () => (dispatch) => {
//     dispatch(leadersLoading(true));
//     return fetch(baseUrl + 'leaders')
//         .then(response => {
//             if (response.ok) {
//                 return response
//             }
//             else {
//                 var error = new Error('Error ' + response.status + ": " + response.statusText)
//                 error.response = response;
//                 throw error
//             }
//         },
//             error => {
//                 var errmess = new Error(error.message)
//                 throw errmess
//             })
//         .then(response => response.json())
//         .then(leaders => {
//             dispatch(addLeaders(leaders))
//         })
//         .catch(error => {
//             dispatch(leadersFailed(error))
//         })

// }


// export const leadersLoading = () => ({
//     type: ActionTypes.LEADERS_LOADING

// })

// export const leadersFailed = (errmess) => ({
//     type: ActionTypes.LEADERS_FAILED,
//     payload: errmess

// })

// export const addLeaders = (leaders) => ({
//     type: ActionTypes.LEADERS_SUCCESS,
//     payload: leaders

// })


