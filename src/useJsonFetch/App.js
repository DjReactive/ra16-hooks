import logo from '../logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'

function App() {
  return (
      <div className="content">
        {
          ['data', 'loading', 'error'].map(o => {
            return <ButtonToFetch option={o} name={`Get ${o}`} key={o} />
          })
        }
      </div>
  );
}

function ButtonToFetch({option, name}) {
   const [state, setState] = useState({
     data: null,
     load: false,
     error: null
   })
  const [data, loading, error] = useJsonFetch(
    `http://localhost:7070/${option}`,
    [state.load],
    option,
    state,
    setState
  );
  const handleClick = () => {
    // Если загрузка, то не реагировать на нажатия
    if (state.load) return;
    setState(prev => ({ ...prev, load: true }));
  };
  return (
    <div className="fetching">
      <button onClick={handleClick} data-id={option}>{name}</button>
      <span>{ state.load ? <progress /> : state[option]}</span>
    </div>
  );
}

function useJsonFetch(url, options, get, state, setState) {
  useEffect(() => {
    if (!state.load) return;
    fetch(url)
      .then(response => response.json())
      .then(json => {
        setState(prev => ({
          ...prev,
          load: false,
          [get]: (json.status || null),
        }))
      });
  }, options)
  return [state.data, state.load, state.error];
}

export default App;
