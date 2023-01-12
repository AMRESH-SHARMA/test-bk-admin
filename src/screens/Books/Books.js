import React from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../API"
import { useAlert } from "../../Redux/actions/useAlert";

const Books = () => {

  const navigate = useNavigate()
  const { displayAlert } = useAlert()
  const [ApiData, setApiData] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAlert = (param1, param2) => {
    displayAlert({
      message: param1,
      color: param2,
      timeout: 5000
    })
  }

  useEffect(() => {
    async function getBooks() {
      await axios.get(`${API}/book/get-books`)
        .then((resApi) => {
          console.log(resApi);
          setApiData(resApi.data.msg);
        })
        .catch((e) => {
          console.log(e);
          handleAlert(e.response.data.msg, 'red')
        });
    } getBooks()
  }, [loading]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSuspend = async (param) => {
    setLoading(true)
    await axios.put(`${API}/book/update-book-status`, { id: param })
      .then((resApi) => {
        console.log(resApi);
      })
      .catch((e) => {
        console.log(e);
        handleAlert(e.response.data.msg, 'red')
      });
    setLoading(false)
  }

  const handleDelete = async (bookId,uploadedBy) => {
    setLoading(true)
    const payload = { bookId,uploadedBy }
    console.log(payload)
    await axios.delete(`${API}/book/delete-single-book`, payload)
      .then((resApi) => {
        console.log(resApi);
        handleAlert(resApi.data.msg, 'green');
      })
      .catch((e) => {
        console.log(e);
        handleAlert(e.response.data.msg, 'red')
      });
    setLoading(false)
  }
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
        <p>Books</p>
        <div><button className="gbtn2 gbtn-lgreen" onClick={() => navigate('/books/add')}>Add Book</button> </div>
      </div>

      <div className="gcard gcont-body">
        <div className='gtable' style={{ overflowX: 'auto' }}>
          <table>
            <thead className='gthead-light'>
              <tr>
                <th>Book Name</th>
                <th>Unique ID</th>
                <th>Uploaded By</th>
                <th>Uploaded Date</th>
                <th>Rent per Day</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {ApiData && ApiData.map((i) => {
                return (<tr key={i._id}>
                  <td>{i.bookName}</td>
                  <td>{i._id}</td>
                  <td>{i.uploadedBy}</td>
                  <td>{new Date(`${i?.updatedAt}`).toDateString()}<span> , {`${formatAMPM(i?.updatedAt)}`}</span></td>
                  <td>₹{i.rentPerDay}</td>
                  <td>{i.approved ?
                    <button className="gbtn-status gbtn-lgreen">Active</button> :
                    <button className="gbtn-status gbtn-red">inactive</button>}
                  </td>
                  <td><span className='gtable-btn-panel'>
                    <button className="gbtn2 gbtn-dblue" onClick={() => navigate(`/books/view/${i._id}`)}>View</button>
                    <button className="gbtn2 gbtn-yellow" onClick={() => navigate(`/books/edit/${i._id}`)}>Edit</button>
                    {i.approved ?
                      <button className="gbtn-status gbtn-red" onClick={() => handleSuspend(i._id)}>Suspend</button> :
                      <button className="gbtn-status gbtn-lgreen" onClick={() => handleSuspend(i._id)}>Activate</button>}
                    <button className="gbtn-status gbtn-red" onClick={() => handleDelete(i._id,i.uploadedBy)}>Delete</button>
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

export default Books