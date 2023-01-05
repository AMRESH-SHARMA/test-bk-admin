import React from 'react'
import { useNavigate } from "react-router-dom";

const Users = () => {

  const navigate = useNavigate()

  return (<>
    <div className='gcont-container'>
      <div className="gcont-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>Users</p>
        <div><button className="gbtn2 gbtn-lgreen" onClick={() => navigate('/users/add')}>Add user</button> </div>
      </div>

      <div className="gcard gcont-body">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

        <div className='gtable' style={{ overflowX: 'auto' }}>
          <table >
            <thead className='gthead-light'>
              <tr>
                <th>Name</th>
                <th>Unique ID</th>
                <th>City</th>
                <th>Books Added</th>
                <th>Books Rented</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
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
              </tr>
              <tr>
                <td>Eve</td>
                <td>Jackson</td>
                <td>94</td>
                <td>94</td>
                <td>94</td>
                <td>
                  <span className='gtable-btn-panel'>
                    <button className="gbtn2 gbtn-dblue">View</button>
                    <button className="gbtn2 gbtn-yellow">Edit</button>
                    <button className="gbtn2 gbtn-red">Suspend</button>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  </>
  )
}

export default Users