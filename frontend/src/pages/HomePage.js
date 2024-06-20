import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import FsfLogo from '../images/FsfLogo.jpg'

function HomePage() {
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
        <div className='col-sm-3 col-md-3 col-lg-3 col-xl-3 mt-3 bg-success' style={{ height: '100vh',width:'250px' }}>
            <h2>Vertical Nav</h2>
            <p>Use the .flex-column class to create a vertical nav:</p>

            <ul class="nav flex-column">
              <li class="nav-item text">
                <a class="nav-link " href="#">Link</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#">Disabled</a>
              </li>
            </ul>
          </div>
        
      </div>


    </div>
  )
}

export default HomePage