import logo from '../logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import UserLoggedProvider from './Provider'
import UserPanel from './Panel';

function App() {
  return (
    <UserLoggedProvider>
      <div className="body">
        <UserPanel />
        <Content />
      </div>
    </UserLoggedProvider>
  );
}

const Content = () => {
  return null;
}

export default App;
