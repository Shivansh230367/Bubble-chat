import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import Requests from './pages/Requests/Requests';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from "./context/AuthContext";

const App = () => {
  const { authUser } = useAuthContext();
  return (
    <div id = "app">
      <ToastContainer theme='dark'/>
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
        <Route path='/search' element={authUser ? <Search /> : <Navigate to={"/login"} />} />
        <Route path='/requests' element={authUser ? <Requests /> : <Navigate to={"/login"} />} />
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
      </Routes>
    </div>
  );
}

export default App;
