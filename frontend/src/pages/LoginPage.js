// src/LoginPage.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Login from '../images/Login.png';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();

    const validateEmail = (email) => /^[^\s@]+@(hr\.com|emp\.com)$/.test(email);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);


        // Reset error state
        setError('');

        if (!email.trim() || !password.trim()) {
            setError('Please fill in both fields.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Email must end with @hr.com or @emp.com');
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem('token')
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed. Please check your credentials.');
            }

            const data = await response.json();
            login(data.token);


            if (data.token) {
                login(data.token);
            } else {
                throw new Error('Login failed. Please check your credentials.');
            }
            localStorage.setItem('token', data.token); 
            console.log('Login successful, token saved.');


            if (email.endsWith('@emp.com')) {
                navigate('/employee');
            } 
            else if (email.endsWith('@hr.com')) {
                navigate('/hr');
            }
        } catch (error) {
            setError(error.message || 'Error logging in.');
        } finally {
            setLoading(false);

        }

        
    };

    const goToRegister = () => {
        navigate('/register');
    };

    return (
        <div className='container'>
            <div className='row border border-2 mt-5 shadow-lg d-flex justify-content-center rounded-5'>
                <div className='col-sm-6'>
                    <div className='mt-5 d-flex justify-content-center'>
                        <img src={Login} alt='LoginImage' className='rounded' width='90%' height='90%' />
                    </div>
                </div>
                <div className='col-sm-6'>
                    <div className='mt-5'>
                        <h1 className='text-center'>Login</h1>
                    </div>
                    <div className='pt-4'>
                        <form className='mx-auto' style={{ width: '70%' }} onSubmit={handleLogin} noValidate>
                            <div className='mb-3 mt-5 shadow-sm input-group'>
                                <span className='input-group-text rounded-3 bg-white border border-1'>
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                                <input
                                    type='email'
                                    className='form-control rounded-3 border border-1'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Enter your email'
                                    required
                                />
                            </div>
                            <div className='mb-3 input-group shadow-sm rounded-3'>
                                <span className='input-group-text rounded-3 bg-white border border-1'>
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                                <input
                                    type='password'
                                    className='form-control border border-1'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='Enter your password'
                                    required
                                />
                            </div>
                            <div className='m-3'>
                                <p className='d-flex justify-content-end' onClick={goToRegister} style={{ fontSize: '88%', cursor: 'pointer' }}>
                                    Not registered? <span className='text-primary'>Sign Up</span>
                                </p>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <button type='submit' className='btn btn-primary' disabled={loading} style={{ width: '80%', height: '7%', borderRadius: '10px' }}>
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
                            </div>
                        </form>
                        {error && (
                            <div className='alert alert-danger m-3 d-flex justify-content-center shadow' style={{ width: '50%', borderRadius: '50px' }}>
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
