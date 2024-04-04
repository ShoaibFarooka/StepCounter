import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Signup';
import './App.css'
import Leaderboard from './Pages/Leaderboard';
import Profile from './Pages/Profile';
import Admin from './Pages/Admin';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Leaderboard/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/admin' element={<Admin/>} />
      </Routes>
    </Router>
  );
}

export default App;