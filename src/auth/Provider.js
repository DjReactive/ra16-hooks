import React, { useState, createContext } from 'react'
export const notUser = {
  username: null,
  token: null,
}

export const UserLoggedContext = createContext(notUser);

export default function UserLoggedProvider(props){
  const [loginData, setLoginData] = useState(notUser);

  return (
    <UserLoggedContext.Provider value={{loginData, setLoginData}}>
      { props.children }
    </UserLoggedContext.Provider>
  )
}
