import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
