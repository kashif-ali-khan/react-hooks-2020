import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onSearch } = props;
  const [enteredData, setEnteredState] = useState('')
  const inputRef = useRef();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredData === inputRef.current.value) {
        const query = enteredData.length !== 0 ? `?orderBy="title"&equalTo="${enteredData}"` : ""
        fetch('https://react-hook-2021-default-rtdb.firebaseio.com/ingredients.json' + query)
          .then(response => {
            return response.json()
          }).then(responseData => {
            const tempIngredients = [];
            for (const key in responseData) {
              tempIngredients.push({
                id: key,
                ...responseData[key]
              })
            }
            onSearch(tempIngredients);
            //userIngredientState(tempIngredients);
          })
      }

    }, 1000)
    return () => {
      clearTimeout(timer);
    }

  }, [onSearch, enteredData, inputRef])

  const onChangeHandler = (event) => {
    setEnteredState(event.target.value)
  }

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input ref={inputRef} type="text" value={enteredData} onChange={onChangeHandler} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
