import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Login from '../images/Login.png'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function LoginPage() {


    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);



    const handleLogin = async () => {
        if (!email.trim() && !password.trim()) {
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

        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });


            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log('Response data:', data);

            if (data) {
                console.log('Login successful', data);

                if (email.endsWith('@emp.com')) {
                    navigate('/employe');
                } else if (email.endsWith('@hr.com')) {
                    navigate('/hr');
                }
            } else {
                throw new Error('Email or password is incorrect');
            }
        } catch (error) {
            setError('Error logging in: ' + error.message);
        } finally {
            setLoading(false);
        }
    };



    const RegisterLogin = () => {
        navigate('/register')
    }

    return (
        <div className='container'>
            <div className='row border border-2 mt-5 shadow-lg d-flex justify-content-center'>
                <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 '>
                    <div className='mt-5 d-flex justify-content-center'>
                        <img src={Login} alt='LoginImage'
                            className='rounded '
                            width="90%" height="90%" />
                    </div>
                </div>

                <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 '>
                    <div className='mt-5 '>
                        <h1 className='text-center'>Login</h1>
                    </div>
                    <div className='pt-4'>
                        <form className='mx-auto justify-content-center ' style={{ width: "70%", height: "40%" }}>


                            <div className='mb-3 mt-5  shadow-sm input-group  '>
                                <span className='input-group-text rounded-3 bg-white border border-1'>
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                                <input
                                    type='email'
                                    className='form-control rounded-3 border border-1  '
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setError('');
                                    }}
                                    id='email'
                                    placeholder='enter a email'
                                    name='email'
                                />


                            </div>
                            <div className='mb-3 input-group shadow-sm rounded-3   ' >
                                <span className='input-group-text rounded-3 bg-white border border-1 ' >
                                    <FontAwesomeIcon icon={faLock} className='' />
                                </span>
                                <input type='password'
                                    className='form-control border border-1  '
                                    id='pwd'
                                    placeholder='enter a password'
                                    name="pswd"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                        setError('')
                                    }}

                                    style={{
                                        borderRadius: "10px",


                                    }}


                                />

                            </div>
                            <div className='m-3 '>
                                <p className='d-flex justify-content-end' onClick={RegisterLogin} style={{ fontSize: '88%', cursor: 'pointer' }}>Not registred?  <span className='text-primary'>SignUp</span></p>
                            </div>

                        </form>
                        <div className='  d-flex justify-content-center'>
                            <button type="submit"
                                className="btn btn-primary"
                                onClick={handleLogin}
                                disabled={loading}


                                style={{
                                    width: "80%", height: "7%", borderRadius: "10px",

                                }} >
                                {loading ? 'Login' : 'Login'}

                            </button>

                        </div>
                    </div>
                    <div className='col-sm-12 col-md-12 col-xl-12 col-lg-12 m-3 d-flex justify-content-end'>
                        {error && (
                            <div className='alert alert-danger m-3 d-flex justify-content-center shadow ' style={{ width: '50%', height: '10%', borderRadius: '50px' }}>
                                {error}
                            </div>
                        )}
                    </div>

                </div>


            </div>

        </div>
    )
}
export default LoginPage