import React from 'react'
import Spinner from '../../assets/Spinner/Spinner';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../API"
import { useAlert } from "../../Redux/actions/useAlert";
import Pagination from '../../components/Pagination';
import swal from 'sweetalert';
import UserHeader from '../../components/UserHeader';

const UserAddress = () => {

  const { userId } = useParams()
  const navigate = useNavigate()
  const { displayAlert } = useAlert()
  const [apiloading, setApiLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [apiData, setApiData] = useState([])

  //PAGINATION
  const PAGE_SIZE = 5;
  const [TOTAL_DOCS, setTOTAL_DOCS] = useState('')
  const [CURRENT_PAGE, setCURRENT_PAGE] = useState(1)
  const limit = PAGE_SIZE;
  const skip = (CURRENT_PAGE - 1) * PAGE_SIZE

  const handleAlert = (param1, param2) => {
    displayAlert({
      message: param1,
      color: param2,
      timeout: 5000
    })
  }

  useEffect(() => {
    async function getAddress() {
      await axios.get(`${API}/user/get-address/${userId}?limit=${limit}&skip=${skip}`)
        .then((resApi) => {
          console.log(resApi);
          setTOTAL_DOCS(resApi.data.msg.totalDocs)
          let data = resApi.data.msg.result.address;
          setApiData(data);
        })
        .catch((e) => {
          console.log(e);
          handleAlert(e.response.data.msg, 'red')
        });
      setApiLoading(false)
    } getAddress()
  }, [loading, CURRENT_PAGE]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = (addressId, userId) => {
    console.log(addressId, userId);
    swal({
      title: 'Are you sure?',
      icon: 'error',
      buttons: { Yes: { text: 'Yes', value: true }, Cancel: { text: 'Cancel', value: 'cancel' } },
    }).then((value) => {
      if (value === true) {
        axios.delete(`${API}/user/delete-single-address/${addressId}/${userId}`)
          .then((res) => {
            setLoading((prev) => !prev)
            console.log(res)
          })
          .catch((err) => {
            swal({
              title: 'Warning',
              text: 'Something went wrong!',
              icon: 'error',
              button: 'Retry',
              dangerMode: true,
            })
          })
      }
    })
  }

  return (<>
    <div className='gcont-container'>
      <div className="gcont-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>Users / Address</p>
        <div><button className="gbtn2 gbtn-add" onClick={() => navigate(`/users/address/add/${userId}`)}>Add address</button> </div>
      </div>

      <div className="gcont-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Pagination setCURRENT_PAGE={setCURRENT_PAGE} CURRENT_PAGE={CURRENT_PAGE} TOTAL_DOCS={TOTAL_DOCS} />
        <UserHeader userId={userId} />
      </div>


      {apiloading ?
        <div style={{ marginTop: "3rem" }} className='gspinnerflex'>
          <Spinner />
        </div>
        :
        <div className="gcard gcont-body">
          <div className='gtable' style={{ overflowX: 'auto' }}>
            <table >
              <thead className='gthead-light'>
                <tr>
                  <th>Unique ID</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Zip Code</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {apiData && apiData.length ? apiData.map((i) => {
                  return (<tr key={i._id}>
                    <td>{i._id}</td>
                    <td>{i.city}</td>
                    <td>{i.state}</td>
                    <td>{i.zipCode}</td>
                    <td><span className='gtable-btn-panel'>
                      <button className="gbtn2 gbtn-view" onClick={() => navigate(`/users/address/view/${i._id}`)}>View</button>
                      <button className="gbtn2 gbtn-edit" onClick={() => navigate(`/users/address/edit/${i._id}`)}>Edit</button>
                      <button className="gbtn-status gbtn-red" onClick={() => handleDelete(i._id, userId)}>Delete</button>
                    </span>
                    </td>
                  </tr>
                  );
                }) : <>&nbsp;No Data Found</>}
              </tbody>
            </table>
          </div>
        </div>}
    </div>
  </>
  )
}

export default UserAddress