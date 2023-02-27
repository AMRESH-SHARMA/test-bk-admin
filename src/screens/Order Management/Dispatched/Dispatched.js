import React from 'react'
import Spinner from '../../../assets/Spinner/Spinner';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../API"
import { useAlert } from "../../../Redux/actions/useAlert";
import Pagination from '../../../components/Pagination';

const NewOrder = () => {

  const navigate = useNavigate()
  const { displayAlert } = useAlert()
  const [apiData, setApiData] = useState([])
  const [apiloading, setApiLoading] = useState(true)

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
    async function getNewOrders() {
      await axios.get(`${API}/order?status=dispatched&skip=${skip}&limit=${limit}`)
        .then((resApi) => {
          console.log(resApi);
          setTOTAL_DOCS(resApi.data.msg.totalDocs)
          let data = resApi.data.msg.result
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
    } getNewOrders()
  }, [CURRENT_PAGE]) // eslint-disable-line react-hooks/exhaustive-deps

  return (<>
    <div className='gcont-container'>
      <div className="gcont-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>Orders / Dispatched</p>
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
            <table>
              <thead className='gthead-light'>
                <tr>
                  <th>Order ID</th>
                  <th>Amount</th>
                  <th>Placed On</th>
                  {/* <th>Status</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {apiData && apiData.length ? apiData.map((i) => {
                  return (
                    <tr key={i._id}>
                      <td>{i._id}</td>
                      <td>Rs.{i.totalAmountAfterCharges}</td>
                      <td>{new Date(`${i?.createdAt}`).toDateString()}</td>
                      {/* <td>{new Date(`${i?.updatedAt}`).toDateString()}<span> , {`${formatAMPM(i?.updatedAt)}`}</span></td> */}
                      <td><span className='gtable-btn-panel'>
                        <button className="gbtn2 gbtn-view" onClick={() => navigate(`/order/dispatched/view/${i._id}`)}>View</button>
                      </span>
                      </td>
                    </tr>
                  );
                })
                  : <>&nbsp;No Data found</>}
              </tbody>
            </table>
          </div>
        </div>}
    </div>
  </>
  )
}
export default NewOrder