import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FsfLogo from '../images/FsfLogo.jpg';
import { useNavigate } from 'react-router-dom';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EmployeePage = () => {
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState([]);
  const [emp_name, setEmpName] = useState('')
  const [emp_id, setEmpId] = useState('')
  const [emp_phonenumber, setEmpPhoneNumber] = useState('')
  const [emp_department, setEmpDepartment] = useState('')
  const [getEmpData, setGetEmpData] = useState([])

  useEffect(() => {
    const getTaskData = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:8000/api/get/task`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }

        const data = await response.json();
        console.log('Received data:', data);

        if (data.data && data.data.length > 0) {
          setTaskData(data.data);
        } else {
          setTaskData([]);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    getTaskData();
  }, []);



  const PostEmpData = async () => {
    try {
      const token = localStorage.getItem('token')
      const PostEmpResponse = await fetch('http://localhost:8000/api/emp/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          emp_name,
          emp_id,
          emp_phonenumber,
          emp_department
        })
      });
      if (!PostEmpResponse.ok) {
        throw new Error('form data not created')
      }
      const data = await PostEmpResponse.json()
      console.log(data)
    } catch (err) {
      console.log(err.message)
    }
    GetEmpData()
  }



  const GetEmpData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const getEmpResponse = await fetch('http://localhost:8000/api/emp/get', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!getEmpResponse.ok) {
        throw new Error(`Error fetching data: ${getEmpResponse.statusText}`);
      }

      const data = await getEmpResponse.json();
      console.log('Fetched data:', data);

      setGetEmpData(data.data || []); // Ensure data is an array

    } catch (err) {
      console.error('Error:', err.message);
    }
  };

  useEffect(() => {
    GetEmpData();
  }, []);
  
  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className='container-fluid'>
      <div className='row m-1'>
        <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
          <div className='mt-1 d-flex justify-content-start'>
            <img src={FsfLogo} alt='logo' width="20%" height="10%" />
          </div>
        </div>

        <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
          <div className='mt-1 d-flex justify-content-end'>
            <button
              type='button'
              className='mt-5 border border-primary bg-danger text-white'
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
          <div className='mt-4 d-flex justify-content-center'>
            <img src={FsfLogo} alt='empimage'
              className='rounded-circle border border-1 mx-5 shadow'
              width="30%" height="30%"
            />
          </div>
        </div>

        <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
          <div className='mt-2 mx-3 d-flex justify-content-end'>
            <FontAwesomeIcon icon={faPenToSquare} className='m-3 ' type='button' data-bs-toggle="modal" data-bs-target="#myModal" size="1x" />
          </div>

          {getEmpData && getEmpData.length > 0 ? (
            getEmpData.map((item, index) => (
              <div key={index}>
                <h5>emp_name: {item.emp_name}</h5>
                <p>emp_department: {item.emp_department}</p>
                <p>emp_id: {item.emp_id}</p>
                <p>emp_phonenumber: {item.emp_phonenumber}</p>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>

      <div className='row mt-2'>
        <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
          <div className=''>
            <h3 className='px-2'>Task</h3>
            <div className='pt-3 mx-3  shadow'>
              <table className='table  table-hover'>
                <thead>
                  <tr>
                    <th>Task ID</th>
                    <th>Task Title </th>
                    <th>Task Description</th>
                  </tr>
                </thead>
                <tbody>
                  {taskData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.task_id}</td>
                      <td>{item.task_title}</td>
                      <td>{item.task_description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>


      <div className='row'>
        <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12' >
          <div className='mt-3'>
            <div className='modal fade mt-5 py-5 ' id='myModal' tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true"  >
              <div className='modal-dialog' >
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h4 className='modal-title' id="modalLabel">Form</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>



                  <form className='mt-1 mx-3'>
                    <div className="row mt-3">

                      <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                        <div className='nt-3 mb-3'>
                          <input type='number'
                            className='form-control border border-1 shadow '
                            id='number'
                            placeholder='enter a ID Number'
                            name="number"
                            value={emp_id}
                            onChange={(e) => {
                              setEmpId(e.target.value)
                            }}

                          />
                        </div>
                      </div>

                      <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                        <input type='text'
                          className='form-control border border-1 shadow '
                          id='name'
                          placeholder='enter a name'
                          name="name"
                          value={emp_name}
                          onChange={(e) => {
                            setEmpName(e.target.value)
                          }}

                        />
                      </div>

                    </div>
                    <div className="row mt-3">

                      <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                        <div className='nt-3 mb-3'>
                          <input type='text'
                            className='form-control border border-1 shadow '
                            id='department'
                            placeholder='enter a department'
                            name="department"
                            value={emp_department}
                            onChange={(e) => {
                              setEmpDepartment(e.target.value)
                            }}
                          />
                        </div>
                      </div>

                      <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                        <input type='Number'
                          className='form-control border border-1 shadow '
                          id='phonenumber'
                          placeholder='enter a phonenumber'
                          name="phonenumber"
                          value={emp_phonenumber}
                          onChange={(e) => {
                            setEmpPhoneNumber(e.target.value)
                          }}
                        />
                      </div>

                    </div>

                  </form>



                  <div className="modal-footer">
                    <button type="button" className="btn btn-success" onClick={PostEmpData} data-bs-dismiss="modal">Save</button>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default EmployeePage;
