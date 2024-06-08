// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Sudoku from './components/Sudoku';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<Navigate to="/login" />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Sudoku />} />
          <Route path='*' element={<Navigate to="/" />}/>
        </Routes>
      </div>
    </Router>
  );
}


export default App;
