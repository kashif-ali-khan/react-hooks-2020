import React, { useState, useEffect, useCallback, useReducer } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {

  const ingredientReducer = (currState, action) => {
    switch (action.type) {
      case 'SET':
        return action.ingredients
      case 'ADD':
        return [...currState, { ...action.ingredient }]
      case 'DELETE':
        return currState.filter(ing => ing.id !== action.id)
      default:
        throw new Error('Should not be there')

    }
  }
  const [userIngredient, dispatch] = useReducer(ingredientReducer, []);
  //const [userIngredient, userIngredientState] = useState([])

  const ingredientHandler = (ingredient) => {

    fetch('https://react-hook-2021-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      return response.json()
    }).then(responseData => {

      // userIngredientState(prevState => {
      //   return [...prevState, { id: responseData.name, ...ingredient }]
      // })
      dispatch({
        type: 'ADD',
        ingredient: { id: responseData.name, ...ingredient }
      })
    })


  }

  const searchHandler = useCallback((ingredients) => {
    //userIngredientState(ingredients);
    dispatch({
      type: 'SET',
      ingredients: ingredients
    })
  }, [])

  const removeIngredient = (id) => {

    fetch(`https://react-hook-2021-default-rtdb.firebaseio.com/ingredients/${id}.json`, {
      method: 'DELETE'
    }).then(response => {
      dispatch({
        type: 'DELETE',
        id: id
      })
      // userIngredientState(prevState => {
      //   return prevState.filter((ing) => ing.id !== id)
      // })
    })


  }
  return (
    <div className="App">
      <IngredientForm onIngredientAdd={ingredientHandler} />

      <section>
        <Search onSearch={searchHandler} />
        {/* Need to add list here! */}
        <IngredientList ingredients={userIngredient} onRemoveItem={removeIngredient} />
      </section>
    </div>
  );
}

export default Ingredients;
