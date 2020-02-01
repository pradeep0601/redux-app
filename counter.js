/**
 * Three core concepts - 
 * 1. Store
 * 2. Action
 * 3. Reducer
 */

 const {createStore} = require('redux');

 // (prevState, action) => newSatte
 const reducer = (prevState = {count: 0}, action) => {
     const {type} = action;
     switch (type) {
         case "INCREMENT":
             return {
                 ...prevState,
                 count: prevState.count + 1
             }
             break;
             case "DECREMENT":
             return {
                 ...prevState,
                 count: prevState.count - 1
             }
             break;
         default:
             return prevState;
             break;
     }
 }

 const store = createStore(reducer);
 console.log('Initial count: ', store.getState());

 store.subscribe(() => console.log('Updated count: ', store.getState()));
 store.dispatch({type: 'INCREMENT'});
 store.dispatch({type: 'DECREMENT'});
 store.dispatch({type: 'INCREMENT'});
 store.dispatch({type: 'INCREMENT'});
 store.dispatch({type: 'INCREMENT'});