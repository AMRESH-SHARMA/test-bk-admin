import React from 'react'
import Spinner from '../../assets/Spinner/Spinner';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from 'sweetalert'
import { API } from "../../API"
import { useAlert } from "../../Redux/actions/useAlert";
import Pagination from '../../components/Pagination';

const DeliveryCarrier = () => {

  const navigate = useNavigate()
  const { displayAlert } = useAlert()
  const [apiloading, setApiLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [ApiData, setApiData] = useState([])

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
    async function getUsers() {
      await axios.get(`${API}/deliveryCarrier?skip=${skip}&limit=${limit}`)
        .then((resApi) => {
          console.log(resApi);
          setTOTAL_DOCS(resApi.data.msg.totalDocs)
          var data = resApi.data.msg.result
          data.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          })
          setApiData(data);
        })
        .catch((e) => {
          console.log(e);
          handleAlert(e.response.data.msg, 'red')
        });
      setApiLoading(false)
    } getUsers()
  }, [loading, CURRENT_PAGE]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSuspend = async (param) => {
    setLoading(true)
    await axios.put(`${API}/deliveryCarrier`, { carrierId: param })
      .then((resApi) => {
        console.log(resApi);
      })
      .catch((e) => {
        console.log(e);
        handleAlert(e.response.data.msg, 'red')
      });
    setLoading(false)
  }

  const handleDelete = (carrierId) => {
    swal({
      title: 'Are you sure?',
      icon: 'error',
      buttons: { Yes: { text: 'Yes', value: true }, Cancel: { text: 'Cancel', value: 'cancel' } },
    }).then((value) => {
      if (value === true) {
        axios.delete(`${API}/deliveryCarrier/${carrierId}`)
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
        <p>Delivery Carrier</p>
        <div><button className="gbtn2 gbtn-add" onClick={() => navigate('/deliveryCarrier/add')}>Add Carrier</button></div>
      </div>

      <div className="gcont-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Pagination setCURRENT_PAGE={setCURRENT_PAGE} CURRENT_PAGE={CURRENT_PAGE} TOTAL_DOCS={TOTAL_DOCS} />
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
                  <th>Carrier Name</th>
                  <th>Unique ID</th>
                  <th>Books Added</th>
                  <th>Books Rented</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {ApiData && ApiData.length ? ApiData.map((i) => {
                  return (<tr key={i._id}>
                    <td>{i.carrierName}</td>
                    <td>{i._id}</td>
                    <td>
                      <span className=' gflex-c'><button className="gbtn2 gbtn-view" onClick={() => navigate(`/deliveryCarrier/view/${i._id}`)}>{i.booksAdded?.length}</button></span>
                    </td>
                    <td>{i.booksRented?.length}</td>
                    <td>{i.approved ?
                      <button className="gbtn-status gbtn-active">Active</button> :
                      <button className="gbtn-status gbtn-inactive">inactive</button>}
                    </td>
                    <td><span className='gtable-btn-panel'>
                      <button className="gbtn2 gbtn-view" onClick={() => navigate(`/deliveryCarrier/view/${i._id}`)}>View</button>
                      <button className="gbtn2 gbtn-edit" onClick={() => navigate(`/deliveryCarrier/edit/${i._id}`)}>Edit</button>
                      {i.approved ?
                        <button className="gbtn-status gbtn-suspend" onClick={() => handleSuspend(i._id)}>Suspend</button> :
                        <button className="gbtn-status gbtn-activate" onClick={() => handleSuspend(i._id)}>Activate</button>}
                      <button className="gbtn-status gbtn-red" onClick={() => handleDelete(i._id)}>Delete</button>
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

export default DeliveryCarrier