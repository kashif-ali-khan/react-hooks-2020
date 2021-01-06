import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  const [state, setState] = useState({ title: '', amount: '' })
  const submitHandler = event => {
    event.preventDefault();
    props.onIngredientAdd({
      title: state.title,
      amount: state.amount
    })
    // ...
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={state.title}
              onChange={(event) => {
                const newTitle = event.target.value;
                setState((prevState) => {
                  return {
                    title: newTitle,
                    amount: prevState.amount
                  }
                })
              }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={state.amount}
              onChange={(event) => {
                const newAmount = event.target.value;
                setState((prevState) => {
                  return {
                    title: prevState.title,
                    amount: newAmount
                  }
                })
              }}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
