import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate } from 'react-router-dom';
import FsfLogo from '../images/FsfLogo.jpg'
import Login from '../images/Login.png'
import { faPenToSquare, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function HrPage() {
  const navigate = useNavigate();

  const [HrData, setHrData] = useState([])
  const [hr_id, setHrId] = useState('')
  const [hr_name, setHrName] = useState('')
  const [hr_department, setHrDepartment] = useState('')
  const [hr_phonenumber, setHrPhoneNumber] = useState('')
  const [task_id,setTaskId] = useState('')
  const [task_title,setTaskTitle] = useState('')
  const [task_description,setTaskDescription] = useState('') 

  const [EmpData, setEmpData] = useState([])



  const HrGetData = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:8000/api/hr/get',{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
        }

      })
      if (!response.ok) {
        throw new Error('Failed to fetch the data')
      }
      const data = await response.json()
      console.log('Received data:', data)
      setHrData(data.data)
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    HrGetData();
    GetEmpData();

  }, [])



  const PostHrData = async () => {
    try {
      const token = localStorage.getItem('token')
      const postResponse = await fetch('http://localhost:8000/api/hr/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          hr_id,
          hr_name,
          hr_department,
          hr_phonenumber
        })
      });
      if (!postResponse.ok) {
        throw new Error('form data not created')
      }

      const data = await postResponse.json()
      console.log(data)
      HrGetData();


    } catch (err) {
      console.log(err.message)
    }
  }

  /*
  const UpdateHrData = async (id, hr_id, hr_name, hr_department, hr_phonenumber) => {
    try {
      const updateResponse = await fetch('http://localhost:8000/api/update/hr/'+id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          hr_id,
          hr_name,
          hr_department,
          hr_phonenumber
        })
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to update HR data');
      }

      const data = await updateResponse.json();
      console.log(data);
      HrGetData();
    } catch (err) {
      console.log(err.message);
    }
  };
*/

  const DeleteHrData = async () => {
    try {

      const deleteResponse = await fetch('http://localhost:8000/api/delete/hr', {
        method: 'DELETE'
      })
      if (!deleteResponse.ok) {
        throw new Error('delete Data')
      }
      const data = await deleteResponse.json()
      console.log(data)
      HrGetData();



    } catch (err) {
      console.log(err.message)
    }
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
        throw new Error(`Error fetching data: `);
      }

      const data = await getEmpResponse.json();
      console.log('Fetched data:', data);

      setEmpData(data.data || []); 

    } catch (err) {
      console.error('Error:', err.message);
    }
  };


  useEffect(()=>{
    GetEmpData();
  },[])



const PostTask = async()=>{
  try{
    const token = localStorage.getItem('token')
    const PostTaskResponse = await fetch('http://localhost:8000/api/post/task',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      },
      body:JSON.stringify({
        task_id,
        task_title,
        task_description
      })
    });
    if(!PostTaskResponse.ok){
      throw new Error('task not created')
    }
    const postTaskResponse = await PostTaskResponse.json()
    console.log(postTaskResponse)
  }catch(err){
    console.log(err.message)
  }
}




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
            <FontAwesomeIcon icon={faPenToSquare} className='m-3 ' type='button' data-bs-toggle="modal" data-bs-target="#myModal" size="1x" />
          </div>

          {HrData.map((item, index) => (
            <div className='' key={index}>
              <h5>Hr_name: {item.hr_name}</h5>
              <p>Hr_department: {item.hr_department} </p>
              <p>Hr_id: {item.hr_id}</p>
              <p>Hr_phonenumber: {item.hr_phonenumber}</p>

            </div>
          ))}
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
        {EmpData.map((item, index) => (

          <div className='col-sm-3 col-md-3 col-lg-3 col-xl-3' key={index}>

            <div className='m-5' >
              <div className='card shadow' width="50%" height="10%" >
                <img src={Login} alt='first card' className='card-img-top' width="30%" height="30%" />
                <div className='card-body' >
                  <h4 className='card-title'>{item.emp_name}</h4>
                  <p>{item.emp_id}</p>
                  <p>{item.emp_department}</p>
                  <p>{item.emp_phonenumber}</p>
                  <button type='button' className='btn btn-primary'
                  data-bs-toggle="modal" data-bs-target="#myTaskModal"
                  >Task</button>

                </div>
              </div>


            </div>

          </div>
        ))}
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
                            value={hr_id}
                            onChange={(e) => {
                              setHrId(e.target.value)
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
                          value={hr_name}
                          onChange={(e) => {
                            setHrName(e.target.value)
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
                            value={hr_department}
                            onChange={(e) => {
                              setHrDepartment(e.target.value)
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
                          value={hr_phonenumber}
                          onChange={(e) => {
                            setHrPhoneNumber(e.target.value)
                          }}
                        />
                      </div>

                    </div>

                  </form>



                  <div className="modal-footer">
                    <button type="button" className="btn btn-success" onClick={PostHrData} data-bs-dismiss="modal">Save</button>
                    <button type="button" className="btn btn-danger" onClick={DeleteHrData} data-bs-dismiss="modal">Delete</button>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


      <div className='row'>
        <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12' >
          <div className='mt-3'>
            <div className='modal fade mt-5 py-5 ' id='myTaskModal' tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true"  >
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
                            placeholder='enter a task id Number'
                            name="number"
                            value={task_id}
                            onChange={(e) => {
                              setTaskId(e.target.value)
                            }}

                          />
                        </div>
                      </div>

                      <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                        <input type='text'
                          className='form-control border border-1 shadow '
                          id='name'
                          placeholder='enter a task title'
                          name="title"
                          value={task_title}
                          onChange={(e) => {
                            setTaskTitle(e.target.value)
                          }}

                        />
                      </div>

                    </div>
                    <div className="row mt-3">

                      <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                        <div className='nt-3 mb-3'>
                          <input type='text'
                            className='form-control border border-1 shadow '
                            id='description'
                            placeholder='enter a description'
                            name="department"
                            value={task_description}
                            onChange={(e) => {
                              setTaskDescription(e.target.value)
                            }}
                          />
                        </div>
                      </div>

                     

                    </div>

                  </form>



                  <div className="modal-footer">
                    <button type="button" className="btn btn-success" onClick={PostTask} data-bs-dismiss="modal">Save</button>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>




    </div>
  )
}


export default HrPage