const { createStore } = require("redux");

console.log('Hello from Cake Shop application');

const BUY_CAKE = 'BUY_CAKE';

const buyCake = ()=> {
    return {
        type: 'BUY_CAKE',
        info: 'first redux action'
    }
}

const initialState = {
    numOfCakes: 10
}

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 * (prevState, action) => newState
 * @param {object} state 
 * @param {object} action 
 */
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ... state,
                numOfCakes: state.numOfCakes - 1
            }
    
        default:
            return state;
    }
}

// Create a Redux store holding the state of your app.
const store = createStore(reducer);

console.log('Initial state: ', store.getState());

// You can use subscribe() to update the UI in response to state changes, 
// it returns a method which can be used for unsubscribe
const unsubscribe = store.subscribe(() => console.log('updated state: ', store.getState()));

// dispatch accepts action as a parameter
// The only way to mutate the internal state is to dispatch an action.
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
console.log('unsubscribing............');
unsubscribe();
store.dispatch(buyCake());
store.dispatch(buyCake());
