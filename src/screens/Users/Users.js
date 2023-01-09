import React from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../API"

const Users = () => {

  const navigate = useNavigate()
  const [ApiData, setApiData] = useState('')

  useEffect(() => {
    async function getUsers() {
      await axios.get(`${API}/user/get-users`)
        .then((resApi) => {
          console.log(resApi);
          setApiData(resApi.data.msg);
        })
        .catch((e) => {
          console.log(e);
          // handleAlert(e.response.data.msg, 'red')
        });
    } getUsers()
  }, [])

  const handleSuspend = (param) => { console.log('s', param); }
  return (<>
    <div className='gcont-container'>
      <div className="gcont-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>Users</p>
        <div><button className="gbtn2 gbtn-lgreen" onClick={() => navigate('/users/add')}>Add user</button> </div>
      </div>

      <div className="gcard gcont-body">
        <div className='gtable' style={{ overflowX: 'auto' }}>
          <table >
            <thead className='gthead-light'>
              <tr>
                <th>Name</th>
                <th>Unique ID</th>
                <th>City</th>
                <th>Books Added</th>
                <th>Books Rented</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <td>Jill</td>
                <td>Smith</td>
                <td>50</td>
                <td>50</td>
                <td>50</td>
                <td >
                  <span className='gtable-btn-panel'>
                    <button className="gbtn2 gbtn-dblue">View</button>
                    <button className="gbtn2 gbtn-yellow">Edit</button>
                    <button className="gbtn2 gbtn-red">Suspend</button>
                  </span>
                </td>
              </tr> */}
              {ApiData && ApiData.map((i) => {
                return (<tr key={i._id}>
                  <td>{i.name}</td>
                  <td>{i.uuid}</td>
                  <td>{i.city}</td>
                  <td>{i.booksAdded}</td>
                  <td>{i.BookRented}</td>
                  <td>{i.approved ?
                    <button className="gbtn2 gbtn-lgreen">Active</button> :
                    <button className="gbtn2 gbtn-red">inactive</button>}
                  </td>
                  <td><span className='gtable-btn-panel'>
                    <button className="gbtn2 gbtn-dblue" onClick={() => navigate(`/users/view/${i._id}`)}>View</button>
                    <button className="gbtn2 gbtn-yellow" onClick={() => navigate(`/users/edit/${i._id}`)}>Edit</button>
                    {i.approved ?
                      <button className="gbtn2 gbtn-red" onClick={() => handleSuspend(i._id)}>Suspend</button> :
                      <button className="gbtn2 gbtn-lgreen" onClick={() => handleSuspend(i._id)}>Activate</button>}
                  </span>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>
  )
}

export default Users