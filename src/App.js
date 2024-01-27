import { useReducer } from 'react';
import './App.css';

import FetchData from './FetchData';
import FetchData_useReducer from './FetchData_useReducer';
import AxiosFetch from './AxiosFetch';

//useReducer służy do zarządzania bardziej złożonym stanem, np. obiektem niż useState - poj. wartość
//useReducer zawiera stan początkowy - tu obiekt {names: [], name: ''} oraz funkcję zmieniającą stan początkowy zależnie od action (switch (action.type))
//edu: https://www.youtube.com/watch?v=-bEzt5ISACA 


function WarMovies() {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "SET_MOVIE":
        return { ...state, movie: action.payload }    //podobnie zachowuje się reducer(currentValue, n) => currentValue + n;
      case "ADD_MOVIE":
        return {
          ...state,
          movies: [...state.movies, action.payload],  //można to zapisać names: [...state.names, state.name], wtedy poniżej nie trzeba definiować payload w onClick w button
          movie: ""
        }
      default: return ""
    }
  }, {
    movies: [],
    movie: ''
  })


  return (
    <div className="App">
      <p>useReducer() explained</p>
      <input
        type='text'
        value={state.movie}
        onChange={e => dispatch({ type: "SET_MOVIE", payload: e.target.value })}
      />
      <div>{state.movie}</div>
      <button
        onClick={() => dispatch({ type: "ADD_MOVIE", payload: state.movie })}
      >Add Name</button>
      {state.movies.map((movie, index) => <div key={index}>{movie}</div>)}
    </div>
  );
}


//useReducer można używać w prostszy sposób: {...state, ...action}
function MovieForm() {
  const [state, dispatch] = useReducer((state, action) => {
    return {
      ...state,
      ...action
    }
  }, {
    title: '',
    year: ''
  })

  return (
    <div>
      <input
        type='text'
        value={state.title}
        onChange={(e) => dispatch({ title: e.target.value })}
      />
      <input
        type='text'
        value={state.year}
        onChange={(e) => dispatch({ year: e.target.value })}
      />
      <div>`Movie: "{state.title}" from {state.year}`</div>
    </div>
  )
}


function App() {

  return (
    <div>
      <AxiosFetch />
      {/* <FetchData_useReducer /> */}
      {/* <FetchData /> */}
      {/* <WarMovies />
      <MovieForm /> */}
    </div>
  )
}

export default App;
