import React, { useState, useEffect, useContext } from 'react'
import { UserLoggedContext, notUser } from './Provider'

function UserPanel() {
  const {loginData} = useContext(UserLoggedContext);
    console.log(loginData)
  return (
    <FormAuth isLogged={ loginData.username ? true : false }/>
  )
}

function FormAuth({isLogged}) {
  const [form, setForm] = useState({});
  const {loginData, setLoginData} = useContext(UserLoggedContext);
  return (
      <form className="form__auth" onSubmit={
        evt => {
          evt.preventDefault();
          if (isLogged) {
            setLoginData(notUser);
            console.log('logout')
            return
          }
          // Check Data
          setLoginData(form);
          console.log('login!');
          setForm({});
        }
      }>
      { isLogged &&
        <span>Hello, {loginData.username}!</span> }
      { !isLogged &&
        <input type="text" id="username" onChange={evt => formAuthChange(evt, setForm)} /> }
      { !isLogged &&
        <input type="password" id="token" onChange={evt => formAuthChange(evt, setForm)} /> }
      <button className="button">{isLogged ? 'Выйти' : 'Войти'}</button>
    </form>
  );
}

const formAuthChange = (evt, setForm) => {
  setForm(prev => ({ ...prev, [evt.target.id]: evt.target.value }))
}
const formAuthSubmit = (evt, form, isLogged, setLoginData) => {

}
export default UserPanel;
