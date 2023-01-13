import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../API"
import { useAlert } from "../../Redux/actions/useAlert";

const ViewUser = () => {
  let { id } = useParams();
  const { displayAlert } = useAlert()
  const navigate = useNavigate()
  const [user, setUser] = useState('')

  const handleAlert = (param1, param2) => {
    displayAlert({
      message: param1,
      color: param2,
      timeout: 5000
    })
  }

  useEffect(() => {
    async function getUsers() {
      await axios.get(`${API}/user/get-single-user/${id}`)
        .then((resApi) => {
          console.log(resApi);
          setUser(resApi.data.msg);
        })
        .catch((e) => {
          console.log(e);
          handleAlert(e.response.data.msg, 'red')
        });
    } getUsers()
  }, [id])  // eslint-disable-line react-hooks/exhaustive-deps

  //change time formate
  function formatAMPM(date) {
    var hours = new Date(date).getHours();
    var minutes = new Date(date).getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  return (<>
    <div className='gcont-container'>
      <div className="gcont-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>View User</p>
        <div className='gcard-btn-panel'>
          <button type="button" className='gbtn2 gbtn-pink' onClick={() => navigate('/users')}>Back</button>
        </div>
      </div>

      <div className="gcard gcont-body">
        <div className='gtable' style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>User_Id</th>
                <td>{user?._id}</td></tr>

              <tr>
                <th>Unique ID</th>
                <td>{user?._id}</td></tr>

              <tr>
                <th>Name</th>
                <td>{user?.name}</td></tr>

              <tr>
                <th>Email</th>
                <td>{user?.email}</td></tr>

              <tr>
                <th>City</th>
                <td>{user?.city}</td></tr>

              <tr>
                <th>Phone No.</th>
                <td>{user?.phone}</td></tr>

              <tr>
                <th>Role</th>
                <td>{user?.role}</td></tr>

              <tr>
                <th>Register At</th>
                <td>
                  {new Date(`${user?.createdAt}`).toDateString()}<span> , {`${formatAMPM(user?.createdAt)}`}</span>
                </td></tr>

              <tr><th>Profile Updated At</th>
                <td>
                  {new Date(`${user?.updatedAt}`).toDateString()}<span> , {`${formatAMPM(user?.updatedAt)}`}</span>
                </td></tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  </>
  )
}

export default ViewUser