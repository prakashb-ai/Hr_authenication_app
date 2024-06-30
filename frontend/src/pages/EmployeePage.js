import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FsfLogo from '../images/FsfLogo.jpg';
import { useNavigate } from 'react-router-dom';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EmployeePage = () => {
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState([]);
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

          <div>
            <h5>Emp name: prakash</h5>
            <p> emp id : 4556678</p>
            <p> emp department : full stack developer</p>
            <p> emp phone number : 6309778954</p>
          </div>
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
    </div>
  );
};

export default EmployeePage;
