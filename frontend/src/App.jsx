import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainLogin from './pages/CaptainLogin';
import CaptainSignup from './pages/CaptainSignup';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<UserLogin />}></Route>
        <Route path='/signup' element={<UserSignup />}></Route>
        <Route path='/captain-login' element={<CaptainLogin />}></Route>
        <Route path='/captain-signup' element={<CaptainSignup />}></Route>
      </Routes>
    </>
  )
}

export default App;
