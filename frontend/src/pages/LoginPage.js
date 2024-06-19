import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Login from '../images/Login.jpg'


function LoginPage() {

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/home');
      };

    const RegisterLogin = ()=>{
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
                                <input name='email'  type='text' placeholder='enter a email' className='p-4 m-3 border border-success' style={{ height: '45px', width: '60%', borderRadius: '50px' }} />
                                <input name='password' type='password' placeholder='enter a password' className='p-4 m-2 border border-success' style={{ height: '45px', width: '60%', borderRadius: '50px' }} />
                            </div>
                        </div>

                    
                        <div className='m-3 d-flex justify-content-center'>
                           <button className='border border-success bg-white' onClick={handleLogin} style={{width:'35%', height:'10%', borderRadius:'10px'}}>
                                Login
                           </button>
                           <button className='border border-success bg-white mx-4' onClick={RegisterLogin} style={{width:'35%', height:'10%', borderRadius:'10px'}}>
                                Register
                           </button>

                        </div>

                        
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LoginPage