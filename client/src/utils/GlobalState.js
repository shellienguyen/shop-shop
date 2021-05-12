/* createContext will be used to instantiate a new Context object. The more
meaningful term we can use here is that we're using it to create the container
to hold the global state data and functionality so we can provide it throughout
the app! */
import React, { createContext, useContext } from "react";

/* useContext is another React Hook that will allow us to use the state created
from the createContext function. */
import { useProductReducer } from './reducers';

// Instantiate the global state object
const StoreContext = createContext();

/* Every Context object comes with two components, a Provider and Consumer.
The Provider is a special type of React component that we wrap our application
in so it can make the state data that's passed into it as a prop available to
all other components. The Consumer is our means of grabbing and using the data
that the Provider holds for us. */
const { Provider } = StoreContext;


/* Will be used to manage and update our state using the reducer we created earlier.
StoreProvider instantiates the initial global state with the useProductReducer()
function. Because that wraps it around the useReducer() Hook from React, every time
useProductReducer() is run, we receive the following two items in return:
1.) state is the most up-to-date version of our global state object.
2.) dispatch is the method used to execute an update the state. It is specifically
going to look for an action object passed in as its argument.
After useProductReducer() completes and provides the new state and function to
update state (e.g., dispatch), we then return the StoreContext's <Provider> component
with the state object and dispatch the function provided as data for the value prop.*/
const StoreProvider = ({ value = [], ...props }) => {
   const [ state, dispatch ] = useProductReducer({
      products: [],
      categories: [],
      currentCategory: '',
   });

   // use this to confirm it works!
   console.log( state);
   return <Provider value={[ state, dispatch ]} { ...props } />;
};


const useStoreContext = () => {
   return useContext( StoreContext );
};


export { StoreProvider, useStoreContext };