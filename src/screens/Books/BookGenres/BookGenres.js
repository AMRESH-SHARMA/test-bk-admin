import React from 'react'
import Spinner from '../../../assets/Spinner/Spinner';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from 'sweetalert'
import { API } from "../../../API"
import { useAlert } from "../../../Redux/actions/useAlert";
import { IMG } from '../../../assets/constants/theme';

const BookGenres = () => {

  const navigate = useNavigate()
  const { displayAlert } = useAlert()
  const [ApiData, setApiData] = useState([])
  const [apiloading, setApiLoading] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleAlert = (param1, param2) => {
    displayAlert({
      message: param1,
      color: param2,
      timeout: 5000
    })
  }

  useEffect(() => {
    async function getGenres() {
      await axios.get(`${API}/genre/get-genres`)
        .then((resApi) => {
          console.log(resApi);
          var data = resApi.data.msg
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
    } getGenres()
  }, [loading]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = (genreId) => {
    swal({
      title: 'Are you sure?',
      icon: 'error',
      buttons: { Yes: { text: 'Yes', value: true }, Cancel: { text: 'Cancel', value: 'cancel' } },
    }).then((value) => {
      if (value === true) {
        axios.delete(`${API}/genre/delete-single-genre/${genreId}`)
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
        <p>Books / Genre</p>
        <div><button className="gbtn2 gbtn-lgreen" onClick={() => navigate('/books/genre/add')}>Add Genre</button> </div>
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
                  <th>Thumbnail</th>
                  <th>Genre</th>
                  <th>Unique ID</th>
                  <th>Created On</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {ApiData && ApiData.length ? ApiData.map((i) => {
                  return (<tr key={i._id}>
                    <td><img alt="" src={i.image?.url} style={IMG.style2} /></td>
                    <td>{i.genre}</td>
                    <td>{i._id}</td>
                    <td>{new Date(`${i?.updatedAt}`).toDateString()}<span> , {`${formatAMPM(i?.updatedAt)}`}</span></td>
                    <td><span className='gtable-btn-panel'>
                      <button className="gbtn2 gbtn-yellow" onClick={() => navigate(`/books/genre/edit/${i._id}`)}>Edit</button>
                      <button className="gbtn-status gbtn-red" onClick={() => handleDelete(i._id)}>Delete</button>
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

export default BookGenres