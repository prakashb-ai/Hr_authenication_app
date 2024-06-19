import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import RegisterImage from '../images/Register.jpg'

function Register() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/home');
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
                                style={{ width: '500px', height: '500px' }}>

                            </img>
                        </div>

                    </div>
                    <div className='col-sm-6 col-md-6 col-xl-6 col-lg-6'>
                        <div className='container mt-3'>
                            <h1 className='d-flex justify-content-center'>
                                Register Page
                            </h1>
                        </div>

                        <div className='m-2'>
                            <div className='row d-flex justify-content-center'>
                                <input name='username' type='text' placeholder='enter a username' className='p-4 m-3 border border-success'
                                    style={{
                                        height: '50px',
                                        width: '60%',
                                        borderRadius: '50px'
                                    }} />

                                <input name='email' type='text' placeholder='enter a email' className='p-4 m-2 border border-success'
                                    style={{
                                        height: '45px',
                                        width: '60%',
                                        borderRadius: '50px'
                                    }} />

                                <input name='phonenumber' type='number' placeholder='enter a phonenumber' className='p-4 m-2 border border-success'
                                    style={{
                                        height: '45px',
                                        width: '60%',
                                        borderRadius: '50px'
                                    }} />

                                <input name='password' type='password' placeholder='enter a password' className='p-4 m-2 border border-success'
                                    style={{
                                        height: '45px',
                                        width: '60%',
                                        borderRadius: '50px'
                                    }} />

                                <input name='retypepassword' type='password' placeholder='enter a re-type password' className='p-4 m-2 border border-success'
                                    style={{
                                        height: '45px',
                                        width: '60%',
                                        borderRadius: '50px'
                                    }} />

                            </div>
                            <div className='m-3 d-flex justify-content-center'>
                           <button className='border border-danger bg-white' 
                            style={{width:'35%', height:'10%', borderRadius:'10px'}}
                            onClick={handleLogin}
                            >
                                SignIn
                           </button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register