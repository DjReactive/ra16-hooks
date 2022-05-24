import { createContext, useState } from 'react'

export const ProfileContext = createContext({
  users: null,
  current: null,
});

export default function ProfileProvider(props) {
  const [users, setUsers] = useState([]);
  const [current, setCurrent] = useState({ current: null, loading: true });

  return (
    <ProfileContext.Provider value={{users, current, setCurrent, setUsers}}>
      {props.children}
    </ProfileContext.Provider>
  )
}
