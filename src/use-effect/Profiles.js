import React, { useState, useEffect, useContext } from 'react'
import { ProfileContext } from './Context'
const url = 'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data';
const usersUrl = url + '/users.json';

function useUpdate(url, callback, useDeps = [], validator = true) {
  useEffect(() => {
    if (!validator) return;
    fetch(url)
      .then(response => response.json())
      .then(json => callback(json));
  }, useDeps);
}

export default function Profiles() {
  const {users, current, setCurrent, setUsers} = useContext(ProfileContext);
  useUpdate(`${url}/users.json`, (json) => {
    setUsers(json);
    setCurrent(prev => ({...prev, loading: false}));
  });
  useUpdate(`${url}/${current.get}.json`, (json) => {
    if (!json) return;
    setCurrent(prev => ({...prev, data: json}));
  }, [current.get], !current.get ? false : true);

  return (
    <div className="profiles">
      <List />
      <Details />
    </div>
  );
}

function List() {
  const {users, current, setCurrent} = useContext(ProfileContext);
  const handleClick = evt => {
    const userId = Number(evt.target.dataset.id);
    if (userId === current.get) return;
    setCurrent(prev => (
      {...prev, get: userId, data: null }
    ));
  }
  return (
    <ul className="list-group">
      {
        current.loading ? <progress /> :
        users.map(o => (
          <li
            className={"list-group-item " + (o.id === current.get ? 'active' : '')}
            key={o.id}
            data-id={o.id}
            onClick={handleClick}
          >{o.name}</li>
        ))
      }
    </ul>
  )
}

function Details() {
  const {users, current} = useContext(ProfileContext);
  const user = users.find(o => o.id === current.get);
  if (!user) return;
  if (!current.data) return <progress />;

  const {avatar, name, details} = current.data;
  return (
    <div className="card">
      <div className="card-image">
        <img className="card-img-top" src={avatar} alt="Card image cap" />
      </div>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
      </div>
      <ul className="list-group">
        <li className="list-group-item">City: {details.city}</li>
        <li className="list-group-item">Company {details.company}</li>
        <li className="list-group-item">Position: {details.position}</li>
      </ul>
    </div>
  );
}
