import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import Employee from './pages/EmployeePage';
import Hr from './pages/HrPage';
import PrivateRouter from './components/PrivateRouter';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <main>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/hr" element={<PrivateRouter><Hr /></PrivateRouter>} />
              <Route path="/employee" element={<PrivateRouter><Employee /></PrivateRouter>} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
