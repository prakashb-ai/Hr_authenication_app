import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import FsfLogo from '../images/FsfLogo.jpg'


function HrPage() {
  const navigate = useNavigate();

  const HandleLogin = () => {
    navigate('/')
  }
  return (
    <div className='container-fluid'>
      <div className='row shadow mt-1 px-2 bg-white rounded'>
        <div className='col-sm-2 col-md-2 col-lg-2 col-xl-2 '>
          <img src={FsfLogo}
            style={{ width: '100px', marginTop: '-6px' }}
            alt='logo' />

        </div>
        <div className='col-sm-10 col-md-10 col-lg-10 col-xl-10 '>
          <div className='mx-3 d-flex justify-content-end'>
            <button className='border border-primary mt-4 bg-danger text-white'
              style={{ borderRadius: '5px' }}
              onClick={HandleLogin}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className='row '>
        <div className='col-sm-3 col-md-3 col-lg-3 col-xl-3 mt-3 shadow-lg' style={{ height: '100vh', width: '250px' }}>
          <h3>Employee List</h3>
        </div>

        <div className='col-sm-9 col-md-9 col-lg-9 col-xl-9 d-flex justify-content-center mt-4'>
          <div>
            <h1>Table</h1>
          </div>
        </div>

      </div>

    </div>
  )
}


export default HrPage