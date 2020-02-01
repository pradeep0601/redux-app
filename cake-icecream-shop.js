const {createStore, combineReducers, applyMiddleware} = require('redux');
const reduxLogger = require('redux-logger');

const logger = reduxLogger.createLogger();

const BUY_CKAE = 'BUY_CKAE';
const BUY_ICE_CREAM = 'BUY_ICE_CREAM';

//state
const initialCakeState = {
    numOfCake: 10,
};

const initialIceState = {
    numOfIceCream: 15,
};

//action creaters

const buyCake = () => {
    return {
        type: BUY_CKAE,
        info: 'buy cake action'
    }
};

const buyIce = () => {
    return {
        type: BUY_ICE_CREAM,
        info: 'buy ice action'
    }
}

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CKAE:
            return {
                ...state,
                numOfCake: state.numOfCake - 1
            }
            
        default:
            return state;
    }
}

const iceReducer = (state = initialIceState, action) => {
    switch (action.type) {
        case BUY_ICE_CREAM:
            return {
                ...state,
                numOfIceCream: state.numOfIceCream - 1
            }
            
        default:
            return state;
    }
}
/**
 * As your app grows more complex, you'll want to split your reducing function into separate functions, 
 * each managing independent parts of the state.
 * The combineReducers helper function turns an object whose values are different reducing functions into a single 
 * reducing function you can pass to createStore.
 */
const rootReducer = combineReducers({cake: cakeReducer, ice: iceReducer});

// const store = createStore(rootReducer);
 //console.log('Initial state: ', store.getState());
// store.subscribe(()=>console.log('Updated state: ', store.getState()));
// above three line can be updated by applying middleware
const store = createStore(rootReducer, applyMiddleware(logger));
console.log('Initial state: ', store.getState());
store.subscribe(()=> {});

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIce());
store.dispatch(buyIce());
store.dispatch(buyIce());