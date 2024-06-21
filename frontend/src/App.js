// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Employee from './pages/EmployeePage';
import Hr from './pages/HrPage';

function App() {
  return (
    <Router>
      <div className="App">

        <main>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path='/register' element={<Register />} />
            <Route path='/hr' element={<Hr />} />
            <Route path='/employe' element={<Employee />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
