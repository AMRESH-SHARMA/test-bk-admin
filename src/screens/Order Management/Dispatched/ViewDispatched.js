import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../API"
import { IMG } from '../../../assets/constants/theme';
import { useAlert } from "../../../Redux/actions/useAlert";
import QRCode from 'react-qr-code'
import Spinner from '../../../assets/Spinner/Spinner';

const ViewDispatchedOrder = () => {
  let { id } = useParams();
  const { displayAlert } = useAlert()
  const navigate = useNavigate()
  const [order, setOrder] = useState('')
  const [apiloading, setApiLoading] = useState(true)

  const handleAlert = (param1, param2) => {
    displayAlert({
      message: param1,
      color: param2,
      timeout: 5000
    })
  }

  useEffect(() => {
    async function getOrderById() {
      await axios.get(`${API}/order/${id}`)
        .then((resApi) => {
          console.log(resApi);
          setOrder(resApi.data.msg);
        })
        .catch((e) => {
          console.log(e);
          handleAlert(e.response.data.msg, 'red')
        })
        setApiLoading(false)
    } getOrderById()
  }, [id])// eslint-disable-line react-hooks/exhaustive-deps

  return (<>
    <div className='gcont-container'>
      <div className="gcont-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>View Dispatched Order Details</p>
        <div className='gcard-btn-panel'>
          <button type="button" className='gbtn2 gbtn-print' onClick={() => navigate(-1)}>Print</button>
          <button type="button" className='gbtn2 gbtn-update' onClick={() => navigate(`/order/new/updateNewOrder/${id}`)}>Update</button>
          <button type="button" className='gbtn2 gbtn-back' onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>

      {apiloading ?
        <div style={{ marginTop: "3rem" }} className='gspinnerflex'>
          <Spinner />
        </div>
        :
        <div style={{ display: 'flex' }}>
          <div>
            <div className="gcard gcont-body">
              <div className='gtable' style={{ overflowX: 'auto' }}>
                <table style={{ border: 'none' }}>
                  <thead>
                    <tr>
                      <th><pre>Order ID : </pre></th>
                      <td>{order?._id}</td></tr>

                    <tr>
                      <th><pre>Order By : </pre></th>
                      <td>37987365</td></tr>

                  </thead>
                </table>

                <div style={{ padding: '10px' }}>

                  <pre style={{ fontWeight: '600', color: '#2C3848F2' }}>Items : </pre>
                  <br />

                  {order?.items?.map((i) => {
                    return (<div key={i._id}>
                      <div style={{ display: 'flex', justifyContent: 'centre' }}>
                        <img alt='' src={i.itemId?.image1?.url} style={{ ...IMG.style2, marginRight: '12px' }} />
                        <div>
                          <pre>{i.itemId?.bookName}</pre>
                          <p>Price : Rs.{i.itemId?.rentPerDay} /day</p>
                          <p>Days : {i.noOfDays}</p>
                          <p>Total : Rs.{i.amount}</p>
                        </div>
                      </div>
                      <br />
                    </div>
                    );
                  })
                  }

                  <hr />

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
                      <th><pre>Order ID QR Code : </pre></th>
                      <td><QRCode
                        value={JSON.stringify({ order_id: order?._id })}
                        size={256}
                        style={IMG.style2}
                      /></td></tr>

                    <tr>
                      <th><pre>Delivery Fees : </pre></th>
                      <td>Rs.{order?.deliveryFees}</td></tr>

                    <tr>
                      <th><pre>Internet Handling Fees : </pre></th>
                      <td>Rs.{order?.internetHandlingFees}</td></tr>

                    <tr>
                      <th><pre>Service Fees : </pre></th>
                      <td>Rs.{order?.serviceFees}</td></tr>

                    <tr>
                      <th><pre>Address : </pre></th>
                      <td>{order?.address?.addressLine1}, {order?.address?.addressLine2}, {order?.address?.city}, {order?.address?.state}, {order?.address?.zipCode}</td></tr>

                    <tr>
                      <th><pre>Contact Number : </pre></th>
                      <td>0000000000</td></tr>

                    <tr>
                      <th><pre>Razorpay Order ID : </pre></th>
                      <td>{order?.razorpayOrderId}</td></tr>

                    <tr>
                      <th><pre>Razorpay Payment ID : </pre></th>
                      <td>{order?.razorpayPaymentId}</td></tr>

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
                      <td>{new Date(order?.createdAt).toDateString()}</td></tr>

                    <tr>
                      <th>Processing Started	: </th>
                      <td>-</td></tr>

                    <tr>
                      <th>Dispatched On	:	</th>
                      <td>{new Date(order?.statusTimeline?.dispatched).toDateString()}</td></tr>

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
      }
    </div>
  </>
  )
}

export default ViewDispatchedOrder