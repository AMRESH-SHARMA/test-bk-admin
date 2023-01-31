import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../API"
import { IMG } from '../../../assets/constants/theme';
import { useAlert } from "../../../Redux/actions/useAlert";

const ViewNewOrder = () => {
  let { id } = useParams();
  const { displayAlert } = useAlert()
  const navigate = useNavigate()
  const [book, setBook] = useState('')

  const handleAlert = (param1, param2) => {
    displayAlert({
      message: param1,
      color: param2,
      timeout: 5000
    })
  }

  useEffect(() => {
    async function getbooks() {
      await axios.get(`${API}/book/get-single-book/${id}`)
        .then((resApi) => {
          console.log(resApi);
          setBook(resApi.data.msg);
        })
        .catch((e) => {
          console.log(e);
          handleAlert(e.response.data.msg, 'red')
        });
    } getbooks()
  }, [id])// eslint-disable-line react-hooks/exhaustive-deps

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
        <p>View Order Details</p>
        <div className='gcard-btn-panel'>
          <button type="button" className='gbtn2 gbtn-print' onClick={() => navigate(-1)}>Print</button>
          <button type="button" className='gbtn2 gbtn-update' onClick={() => navigate(-1)}>Update</button>
          <button type="button" className='gbtn2 gbtn-back' onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>

      <div style={{ display: 'flex' }}>

        <div>
          <div className="gcard gcont-body">
            <div className='gtable' style={{ overflowX: 'auto' }}>
              <table style={{ border: 'none' }}>
                <thead>
                  <tr>
                    <th><pre>Order ID : </pre></th>
                    <td>37987365</td></tr>

                  <tr>
                    <th><pre>Order By : </pre></th>
                    <td>37987365</td></tr>

                </thead>
              </table>

              <div style={{ padding: '10px' }}>

                <pre>Items : </pre>
                <br />

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <img alt='' src={''} style={{ ...IMG.style2, marginRight: '12px' }} />

                  <div>
                    <pre>SUV Boys Hunter DPT Shirt - White</pre>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                      <div>
                        <pre>
                          <p>Price : Rs.300</p>
                          <p>IGST : 5%</p>
                          <p>Total : Rs.630</p>
                        </pre>
                      </div>

                      <div>
                        <pre>
                          <p>Price : Rs.300</p>
                          <p>IGST : 5%</p>
                          <p>Total : Rs.630</p>
                        </pre>
                      </div>
                    </div>
                  </div>

                </div>
                <hr/>

              </div>

            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>

          <div className="gcard gcont-body">
            <div className='gtable' style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th><pre>Status : </pre></th>
                    <td>37987365</td></tr>

                  <tr>
                    <th><pre>Order ID QR Code : </pre></th>
                    <td><img alt='' src={''} style={IMG.style2} /></td></tr>
                  <tr>
                    <th><pre>Amount Paid : </pre></th>
                    <td>Rs.1260</td></tr>

                  <tr>
                    <th><pre>Address : </pre></th>
                    <td>pawan, 65g, lucknow, lucknow, Lucknow, Uttar Pradesh, 986587</td></tr>

                  <tr>
                    <th><pre>Contact Number : </pre></th>
                    <td>8695748569</td></tr>

                  <tr>
                    <th><pre>Razorpay Order ID : </pre></th>
                    <td>order_L22nTQJa2aiBS8</td></tr>

                  <tr>
                    <th><pre>Razorpay Payment ID : </pre></th>
                    <td>pay_L22np8TxF8iGil</td></tr>

                </thead>
              </table>
            </div>
          </div>

          <div className="gcard gcont-body">
            <div className='gtable' style={{ overflowX: 'auto' }}>

              <p style={{ fontWeight: '600' }}>Status Timeline : </p>

              <table>
                <thead className='gtable2cell'>

                  <tr >
                    <th>Order Placed On	:	</th>
                    <td>9 Jan 2023, 03:53 pm</td></tr>

                  <tr>
                    <th>Processing Started	: </th>
                    <td>-</td></tr>

                  <tr>
                    <th>Dispatched On	:	</th>
                    <td>-</td></tr>

                  <tr>
                    <th>Cancelled On	:	</th>
                    <td>-</td></tr>

                  <tr>
                    <th>Returned On	:	</th>
                    <td>-</td></tr>

                </thead>
              </table>
            </div>
          </div>

        </div>

      </div>

    </div>
  </>
  )
}

export default ViewNewOrder