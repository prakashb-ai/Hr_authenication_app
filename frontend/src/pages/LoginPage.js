import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Login from '../images/Login.jpg'


function LoginPage() {


    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);



    const handleLogin = async () => {

        if (!email.trim() || !password.trim()) {
            setError('Please fill in both fields.');
            return;
        }
    
        if (!email.trim()) {
            setError('Please fill in the email field.');
            return;
        }
    
        if (!password.trim()) {
            setError('Please fill in the password field.');
            return;
        }
    
        const validateEmail = (email) => /^[^\s@]+@(hr\.com|emp\.com)$/.test(email);
    
        if (!validateEmail(email)) {
            setError('Email must end with @hr.com or @emp.com');
            return;
        }
    
        setError(''); // Clear any previous error
    
        if (email.endsWith('@emp.com')) {
            navigate('/employe');
        } else if (email.endsWith('@hr.com')) {
            navigate('/hr');
        }


        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            if (!response.ok) {
                throw new Error('Login Failed')
            }
            const data = await response.json()
            console.log('Login successful', data)



        } catch (error) {
            setError('Error logging in: ' + error.message);

        }
        finally {
            setLoading(false);
        }
    };



    const RegisterLogin = () => {
        navigate('/register')
    }


    return (

        <div className='container-fluid'>

            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                        <div className='Loginimages'>
                            <img src={Login} alt='login' style={{ width: '500px', height: '550px' }}></img>
                        </div>
                    </div>
                    <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                        <div className='container mt-5 p-4'>
                            <h1 className='d-flex justify-content-center'>Login Page</h1>
                        </div>


                        <div className='m-2'>
                            <div className='row d-flex justify-content-center'>

                                <input name='email'
                                    type='email'
                                    placeholder='enter a email'
                                    className='p-4 m-3 border border-success'
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

                                <input name='password'
                                    type='password'
                                    placeholder='enter a password'
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
                            </div>
                        </div>


                        <div className='m-3 d-flex justify-content-center'>
                            <button className='border border-success bg-white'
                                onClick={handleLogin}
                                disabled={loading}


                                style={{
                                    width: '35%',
                                    height: '10%',
                                    borderRadius: '10px'
                                }}>
                                {loading ? 'Login' : 'Login'}


                            </button>


                            <button className='border border-success bg-white mx-4'
                                onClick={RegisterLogin}
                                style={{ width: '35%', height: '10%', borderRadius: '10px' }}>
                                Register
                            </button>

                        </div>



                    </div>
                </div>

            </div>
            <div className='col-sm-12 col-md-12 col-xl-12 col-lg-12 d-flex justify-content-end'>
                {error && (
                    <div className='alert alert-danger  d-flex justify-content-center  ' style={{ width: '500px', height: '50px', borderRadius: '20px' }}>
                        {error}
                    </div>
                )}
            </div>
        </div>
    )
}

export default LoginPage