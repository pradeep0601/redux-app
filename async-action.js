const {createStore, applyMiddleware} = require('redux');
const reduxThunkMiddleware = require('redux-thunk').default;
const axios = require('axios');
const reduxLogger = require('redux-logger');

const loggerMiddleware = reduxLogger.createLogger();

const typicodeBaseUrl = 'https://jsonplaceholder.typicode.com';

const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';


const initialState = {
    isLoading: true,
    users: [],
    error: ''
};

//action creators
const fetchUserRequest = () => {
    return {
        type: FETCH_USER_REQUEST
    }
}

const fetchUserSuccess = (users) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: users
    }
}

const fetchUserFailure = (error) => {
    return {
        type: FETCH_USER_FAILURE,
        payload: error
    }
}

const reducer = (state = initialState, acttion) => {
    switch(acttion.type)
    {
        case FETCH_USER_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                users: acttion.payload,
            }
        case FETCH_USER_FAILURE:
            return {
                ...state,
                error: acttion.payload
            }
            default:
                return state;
    }
}

/**
 * Redux Thunk middleware allows you to write action creators that return a function 
 * instead of an action. The thunk can be used to delay the dispatch of an action, 
 * or to dispatch only if a certain condition is met. The inner function receives the 
 * store methods dispatch and getState as parameters.
 */
const fetchUsers = () => {
    return (dispatch) => {
        dispatch(fetchUserRequest())
        axios.get(`${typicodeBaseUrl}/users`)
        .then(res => {
            const {data} = res;
            const users = data.map(user => {
                const {id, name} = user;
                return {id, name};
            });
            dispatch(fetchUserSuccess(users))
        })
        .catch(err=> {
            const {message} = err;
            dispatch(fetchUserFailure(message))
        })
    }
}


const store = createStore(reducer, applyMiddleware(reduxThunkMiddleware, loggerMiddleware));

store.subscribe(() => {});

store.dispatch(fetchUsers());
console.log('============================================')
store.dispatch(fetchUsers());
