import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import FsfLogo from '../images/FsfLogo.jpg'
import Login from '../images/Login.png'
import { faPenToSquare, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function HrPage() {
  const navigate = useNavigate();

  const HandleLogin = () => {
    navigate('/')
  }
  return (
    <div className='container-fluid'>
      <div className='row m-1'>
        <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6 '>
          <div className='mt-1 d-flex justify-content-start'>
            <img src={FsfLogo} alt='logo' width="20%" height="10%" />
          </div>
        </div>

        <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
          <div className='mt-1 d-flex justify-content-end'>
            <button type='button'
              className='mt-5 border border-primary bg-danger text-white'
              onClick={HandleLogin}>Logout</button>
          </div>
        </div>

      </div>

      <div className='row'>
        <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
          <div className='mt-4 d-flex justify-content-center'>
            <img src={Login} alt='hrimage'
              className='rounded-circle border border-1 mx-5 shadow  '
              width="30%" height="30%"
            />
          </div>
        </div>
        <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
          <div className='mt-2 mx-3  d-flex justify-content-end'>
            <FontAwesomeIcon icon={faPenToSquare} className='m-3 ' size="1.5x" />
          </div>
          <div className=''>
            <h5>Hr_name: Bsuryaprakash</h5>
            <p>Hr_department: Fullstack </p>
            <p>Hr_id: 2345</p>
            <p>Hr_phonenumber: 123456789</p>

          </div>
        </div>
      </div>

      <div className='row d-flex justify-content-center '>

        <div className='col-sm-5 col-md-5 col-lg-5 col-xl-5 '>
          <div className='input-group mt-5 '>
            <div className='input-group-prepend'>
              <span className='input-group-text search-icon shadow '>
                <FontAwesomeIcon icon={faMagnifyingGlass} className='m-2 ' size='1x' />
              </span>
            </div>
            <input type='text' className='form-control search-input shadow' placeholder='Search...' style={{
              width: "5%",
              height: "45px"
            }} />
          </div>
        </div>

      </div>




      <div className='row'>
        <div className='col-sm-3 col-md-3 col-lg-3 col-xl-3'>
          <div className='m-5'>
            <div className='card shadow' width="50%" height="10%" >
              <img src={Login} alt='first card' className='card-img-top' width="30%" height="30%" />

              <div className='card-body'>
                <h4 className='card-title'>prakash</h4>
                <p>123</p>
                <p>fullstack</p>
                <p>630145874</p>
                <button type='button' className='btn btn-primary'>Task</button>

              </div>
            </div>

          </div>
        </div>

        <div className='col-sm-3 col-md-3 col-lg-3 col-xl-3'>
          <div className='m-5'>

            <div className='card shadow' width="50%" height="10%" >
              <img src={Login} alt='first card' className='card-img-top' width="30%" height="30%" />

              <div className='card-body'>
                <h4 className='card-title'>prakash</h4>
                <p>123</p>
                <p>fullstack</p>
                <p>630145874</p>
                <button type='button' className='btn btn-primary'>Task</button>

              </div>
            </div>
          </div>
        </div>
        <div className='col-sm-3 col-md-3 col-lg-3 col-xl-3'>
          <div className='m-5'>

            <div className='card shadow ' width="50%" height="10%" >
              <img src={Login} alt='first card' className='card-img-top' width="30%" height="30%" />

              <div className='card-body'>
                <h4 className='card-title'>prakash</h4>
                <p>123</p>
                <p>fullstack</p>
                <p>630145874</p>
                <button type='button' className='btn btn-primary'>Task</button>

              </div>
            </div>
          </div>
        </div>

        <div className='col-sm-3 col-md-3 col-lg-3 col-xl-3'>
          <div className='m-5'>

            <div className='card shadow' width="50%" height="10%" >
              <img src={Login} alt='first card' className='card-img-top' width="30%" height="30%" />

              <div className='card-body'>
                <h4 className='card-title'>prakash</h4>
                <p>123</p>
                <p>fullstack</p>
                <p>630145874</p>
                <button type='button' className='btn btn-primary'>Task</button>

              </div>
            </div>
          </div>
        </div>

      </div>



      <div className='row'>
        <div className='col-sm-3 col-md-3 col-lg-3 col-xl-3'>
          <div className='m-5'>
            <div className='card shadow' width="50%" height="10%" >
              <img src={Login} alt='first card' className='card-img-top' width="30%" height="30%" />

              <div className='card-body'>
                <h4 className='card-title'>prakash</h4>
                <p>123</p>
                <p>fullstack</p>
                <p>630145874</p>
                <button type='button' className='btn btn-primary'>Task</button>

              </div>
            </div>

          </div>
        </div>

        <div className='col-sm-3 col-md-3 col-lg-3 col-xl-3'>
          <div className='m-5'>

            <div className='card shadow' width="50%" height="10%" >
              <img src={Login} alt='first card' className='card-img-top' width="30%" height="30%" />

              <div className='card-body'>
                <h4 className='card-title'>prakash</h4>
                <p>123</p>
                <p>fullstack</p>
                <p>630145874</p>
                <button type='button' className='btn btn-primary'>Task</button>

              </div>
            </div>
          </div>
        </div>
        <div className='col-sm-3 col-md-3 col-lg-3 col-xl-3'>
          <div className='m-5'>

            <div className='card shadow' width="50%" height="10%" >
              <img src={Login} alt='first card' className='card-img-top' width="30%" height="30%" />

              <div className='card-body'>
                <h4 className='card-title'>prakash</h4>
                <p>123</p>
                <p>fullstack</p>
                <p>630145874</p>
                <button type='button' className='btn btn-primary'>Task</button>

              </div>
            </div>
          </div>
        </div>

        <div className='col-sm-3 col-md-3 col-lg-3 col-xl-3'>
          <div className='m-5'>

            <div className='card shadow' width="50%" height="10%" >
              <img src={Login} alt='first card' className='card-img-top' width="30%" height="30%" />

              <div className='card-body'>
                <h4 className='card-title'>prakash</h4>
                <p>123</p>
                <p>fullstack</p>
                <p>630145874</p>
                <button type='button' className='btn btn-primary'>Task</button>
              </div>
            </div>
          </div>
        </div>

      </div>




    </div>
  )
}


export default HrPage