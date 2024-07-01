import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import RegisterImage from '../images/Register.jpg';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

        if (!validateEmail(email)) {
            setError('Email must end with @hr.com or @emp.com');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ username, email, phonenumber, password, confirmpassword }),
            });

            if (!response.ok) {
                throw new Error('Registration Failed');
            }

            const data = await response.json();
            if (data) {
                localStorage.setItem('token', data);
                console.log('Registration successful', data);
            }

            if (email.endsWith('@emp.com')) {
                navigate('/employee');
            } else if (email.endsWith('@hr.com')) {
                navigate('/hr');
            }
        } catch (error) {
            setError('Error registering: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container'>
            <div className='row border border-1 rounded-5 mt-5 pb-4 shadow-lg d-flex justify-content-center'>
                <div className='col-sm-6'>
                    <div className='mt-5 d-flex justify-content-center'>
                        <img src={RegisterImage} alt='RegisterImage' className='rounded' width="90%" height="90%" />
                    </div>
                </div>

                <div className='col-sm-6'>
                    <div className='mt-5'>
                        <h1 className='text-center'>Register</h1>
                    </div>

                    <div className=''>
                        <form className='mx-auto justify-content-center needs-validation' noValidate style={{ width: "70%", height: "40%" }}>
                            <div className='mb-3 mt-5 shadow-sm input-group'>
                                <span className='input-group-text rounded-3 bg-white border border-1'>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </span>
                                <input
                                    type='text'
                                    className='form-control rounded-3 border border-1'
                                    id='username'
                                    placeholder='Enter a username'
                                    name='username'
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        setError('');
                                    }}
                                />
                                <div className='valid-feedback'>
                                </div>
                            </div>

                            <div className='mb-3 input-group shadow-sm rounded-3'>
                                <span className='input-group-text rounded-3 bg-white border border-1'>
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                                <input
                                    type='email'
                                    className='form-control border border-1'
                                    id='email'
                                    placeholder='Enter an email'
                                    name="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setError('');
                                    }}
                                    style={{
                                        borderRadius: "10px",
                                    }}
                                />
                            </div>

                            <div className='mb-3 input-group shadow-sm rounded-3'>
                                <span className='input-group-text rounded-3 bg-white border border-1'>
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                                <input
                                    type='number'
                                    className='form-control rounded-3 border border-1'
                                    id='phonenumber'
                                    placeholder='Enter a phone number'
                                    value={phonenumber}
                                    onChange={(e) => {
                                        setPhonenumber(e.target.value);
                                        setError('');
                                    }}
                                />
                            </div>

                            <div className='mb-3 input-group shadow-sm rounded-3'>
                                <span className='input-group-text rounded-3 bg-white border border-1'>
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                                <input
                                    type='password'
                                    className='form-control rounded-3 border border-1'
                                    id='password'
                                    name='password'
                                    placeholder='Enter a password'
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError('');
                                    }}
                                />
                            </div>

                            <div className='mb-3 input-group shadow-sm rounded-3'>
                                <span className='input-group-text rounded-3 bg-white border border-1'>
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                                <input
                                    type='password'
                                    className='form-control rounded-3 border border-1'
                                    id='confirmpassword'
                                    name='confirmpassword'
                                    placeholder='Confirm your password'
                                    value={confirmpassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        setError('');
                                    }}
                                />
                            </div>
                        </form>
                        <div className='d-flex justify-content-center mt-4'>
                            <button
                                className='btn btn-primary'
                                style={{ width: '80%', height: '7%', borderRadius: '10px' }}
                                onClick={handleRegister}
                                disabled={loading}>
                                {loading ? 'Signing Up...' : 'Sign Up'}
                            </button>
                        </div>
                    </div>
                    <div className='col-sm-12 col-md-12 col-xl-12 col-lg-12 m-3 d-flex justify-content-end'>
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

export default Register;
