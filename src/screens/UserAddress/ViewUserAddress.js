import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../API"
import { useAlert } from "../../Redux/actions/useAlert";

const ViewUserAddress = () => {
  let { id } = useParams();
  const { displayAlert } = useAlert()
  const navigate = useNavigate()
  const [userAddress, setUserAddress] = useState('')

  const handleAlert = (param1, param2) => {
    displayAlert({
      message: param1,
      color: param2,
      timeout: 5000
    })
  }

  useEffect(() => {
    async function getAddress() {
      await axios.get(`${API}/user/get-single-address/${id}`)
        .then((resApi) => {
          console.log(resApi);
          setUserAddress(resApi.data.msg);
        })
        .catch((e) => {
          console.log(e);
          handleAlert(e.response.data.msg, 'red')
        });
    } getAddress()
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
        <p>View User Address</p>
        <div className='gcard-btn-panel'>
          <button type="button" className='gbtn2 gbtn-back' onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>

      <div className="gcard gcont-body">
        <div className='gtable' style={{ overflowX: 'auto' }}>
          <table>
            <thead className='gviewthpre'>
              <tr>
                <th>Unique ID</th>
                <td>{userAddress?._id}</td></tr>

              <tr>
                <th>Address Line</th>
                <td>{userAddress?.addressLine}</td></tr>

              <tr>
                <th>City</th>
                <td>{userAddress?.city}</td></tr>

              <tr>
                <th>State</th>
                <td>{userAddress?.state}</td></tr>

              <tr>
                <th>Zip Code</th>
                <td>{userAddress?.zipCode}</td></tr>

              <tr>
                <th>Country</th>
                <td>{userAddress?.country}</td></tr>

              <tr>
                <th>Created At</th>
                <td>
                  {new Date(`${userAddress?.createdAt}`).toDateString()}<span> , {`${formatAMPM(userAddress?.createdAt)}`}</span>
                </td></tr>

              <tr><th>Updated At</th>
                <td>
                  {new Date(`${userAddress?.updatedAt}`).toDateString()}<span> , {`${formatAMPM(userAddress?.updatedAt)}`}</span>
                </td></tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  </>
  )
}

export default ViewUserAddress