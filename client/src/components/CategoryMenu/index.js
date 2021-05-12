import React, { useEffect } from 'react';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_CATEGORIES } from "../../utils/queries";
import { useStoreContext } from "../../utils/GlobalState";

function CategoryMenu() {
  // useStoreContext() Hook retrieves the current state from the global state object
  // dispatch method updates state
  const [ state, dispatch ] = useStoreContext();
  const { categories } = state;

  // Because we only need the categories array out of our global state, we
  // simply destructure it out of state so we can use it to provide to our returning JSX.
  const { data: categoryData } = useQuery( QUERY_CATEGORIES );

  /* Now when this component loads and the response from the useQuery() Hook
  returns, the useEffect() Hook notices that categoryData is not undefined anymore
  and runs the dispatch() function, setting our category data to the global state!
  The function runs immediately on load and passes in our function to update the
  global state and then the data that we're dependent on, categoryData and dispatch.
  The beauty of the useEffect() Hook is that it not only runs on component load,
  but also when some form of state changes in that component. So when useQuery()
  finishes, and we have data in categoryData, the useEffect() Hook runs again and
  notices that categoryData exists! Because of that, it does its job and executes
  the dispatch() function.*/
  useEffect(() => {
    // if categoryData exists or has changed from the response of useQuery,
    // then run dispatch()
    if ( categoryData ) {
      // execute our dispatch function with our action object indicating the type
      // of action and the data to set our state for categories to
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories
      });
    }
  }, [ categoryData, dispatch ]);

  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {state.categories.map(item => (
        <button key={item._id} onClick={() => { handleClick(item._id); }} >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
