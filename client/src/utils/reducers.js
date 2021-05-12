import {
   UPDATE_PRODUCTS,
   UPDATE_CATEGORIES,
   UPDATE_CURRENT_CATEGORY,
   ADD_TO_CART,
   ADD_MULTIPLE_TO_CART,
   REMOVE_FROM_CART,
   UPDATE_CART_QUANTITY,
   CLEAR_CART,
   TOGGLE_CART
 } from './actions';

import { useReducer } from 'react';



/* First parameter: The current state object, so we can make our copy of it for
                    the new state. In this case, the current state held in initialState
   Second parameter: The action we're performing to update state, which is broken
      into the following two parts as an object:
      1.) type: This is the type of action we're performing, and should be one of
                the predefined actions we created in actions.js.
      2.) value: This won't always have the name value, but it is a name
                 representative of the new data we want to use with the action.*/
export const reducer = ( state, action ) => {
   switch ( action.type ) {
      // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
      case UPDATE_PRODUCTS:
         return {
            ...state,
            products: [ ...action.products ]
         };
      // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
      case UPDATE_CATEGORIES:
         return {
            ...state,
            categories: [ ...action.categories ]
         };
      case UPDATE_CURRENT_CATEGORY:
         return {
            ...state,
            currentCategory: action.currentCategory
         };
      case ADD_TO_CART:
         return {
            ...state,
            cartOpen: true,
            cart: [ ...state.cart, action.product ]
         };
      case ADD_MULTIPLE_TO_CART:
         return {
            ...state,
            cart: [ ...state.cart, ...action.products ],
         };
      case REMOVE_FROM_CART:
         let newState = state.cart.filter( product => {
            return product._id !== action._id;
         });
         
         return {
            ...state,
            cartOpen: newState.length > 0,
            cart: newState
         };
      case UPDATE_CART_QUANTITY:
         return {
            ...state,
            cartOpen: true,
            cart: state.cart.map(product => {
               if ( action._id === product._id ) {
                  product.purchaseQuantity = action.purchaseQuantity;
               }
               return product;
            })
         };
      case CLEAR_CART:
         return {
            ...state,
            cartOpen: false,
            cart: []
         };
      case TOGGLE_CART:
         return {
            ...state,
            cartOpen: !state.cartOpen
         };
      default:
         return state;
   };
};


/* useProductReducer() will be used to help initialize our global state object
and then provide us with the functionality for updating that state by automatically
running it through our custom reducer() function. */
export function useProductReducer( initialState ) {
   return useReducer( reducer, initialState );
};