import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import RegisterImage from '../images/Register.jpg';

function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!username.trim() || !email.trim() || !phonenumber.trim() || !password.trim() || !confirmpassword.trim()) {
            setError('Please fill in all fields.');
            return;
        }

        if (password !== confirmpassword) {
            setError('Passwords do not match.');
            return;
        }

        const validateEmail = (email) => {
            const regex = /^[^\s@]+@(hr\.com|emp\.com)$/;
            return regex.test(email);
          };
          if (validateEmail(email)) {
            setError('');
            
          } else {
            setError('Email must end with @hr.com or @emp.com');
          }

        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ username, email, phonenumber, password,confirmpassword }),
            });

            if (!response.ok) {
                throw new Error('Registration Failed');
            }

            const data = await response.json();
            console.log('Registration successful', data);
            navigate('/home');
        } catch (error) {
            setError('Error registering: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container-fluid'>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-sm-6 col-md-6 col-xl-6 col-lg-6'>
                        <div className='Registerimages'>
                            <img src={RegisterImage}
                                alt='register'
                                className='d-flex justify-content-center'
                                style={{ width: '500px', height: '500px' }} />
                        </div>
                    </div>
                    <div className='col-sm-6 col-md-6 col-xl-6 col-lg-6'>
                        <div className='container mt-3'>
                            <h1 className='d-flex justify-content-center'>Register Page</h1>
                        </div>

                        <div className='m-2'>
                            <div className='row d-flex justify-content-center'>
                                <input
                                    name='username'
                                    type='text'
                                    placeholder='Enter your username'
                                    className='p-4 m-3 border border-success'
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        setError('');
                                    }}
                                    style={{
                                        height: '50px',
                                        width: '60%',
                                        borderRadius: '50px'
                                    }} />

                                <input
                                    name='email'
                                    type='email'
                                    placeholder='Enter your email'
                                    className='p-4 m-2 border border-success'
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setError('');
                                    }}
                                    style={{
                                        height: '45px',
                                        width: '60%',
                                        borderRadius: '50px'
                                    }} />

                                <input
                                    name='phonenumber'
                                    type='tel'
                                    placeholder='Enter your phone number'
                                    className='p-4 m-2 border border-success'
                                    value={phonenumber}
                                    onChange={(e) => {
                                        setPhonenumber(e.target.value);
                                        setError('');
                                    }}
                                    style={{
                                        height: '45px',
                                        width: '60%',
                                        borderRadius: '50px'
                                    }} />

                                <input
                                    name='password'
                                    type='password'
                                    placeholder='Enter your password'
                                    className='p-4 m-2 border border-success'
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError('');
                                    }}
                                    style={{
                                        height: '45px',
                                        width: '60%',
                                        borderRadius: '50px'
                                    }} />

                                <input
                                    name='confirmpassword'
                                    type='password'
                                    placeholder='Confirm your password'
                                    className='p-4 m-2 border border-success'
                                    value={confirmpassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        setError('');
                                    }}
                                    style={{
                                        height: '45px',
                                        width: '60%',
                                        borderRadius: '50px'
                                    }} />
                            </div>
                            <div className='m-3 d-flex justify-content-center'>
                                <button
                                    className='border border-danger bg-white'
                                    style={{ width: '35%', height: '10%', borderRadius: '10px' }}
                                    onClick={handleRegister}
                                    disabled={loading}>
                                    {loading ? 'Signing In...' : 'Sign In'}
                                </button>
                            </div>
                            {error && (
                                <div className='alert alert-danger d-flex justify-content-center' style={{ width: '100%' }}>
                                    {error}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
