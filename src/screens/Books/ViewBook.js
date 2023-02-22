import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../API"
import { IMG } from '../../assets/constants/theme';
import { useAlert } from "../../Redux/actions/useAlert";

const ViewBook = () => {
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
      await axios.get(`${API}/book/${id}`)
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
        <p>View Book</p>
        <div className='gcard-btn-panel'>
          <button type="button" className='gbtn2 gbtn-pink' onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>

      <div className="gcard gcont-body">
        <div className='gtable' style={{ overflowX: 'auto' }}>
          <table>
            <thead className='gviewthpre'>
              <tr>
                <th>Unique ID</th>
                <td>{book?._id}</td></tr>

              <tr>
                <th>Book Name</th>
                <td>{book?.bookName}</td></tr>

              <tr>
                <th>Genre</th>
                <td>{book?.genre?.genre}</td></tr>

              <tr>
                <th>Language</th>
                <td>{book?.language?.language}</td></tr>

              <tr>
                <th>Author</th>
                <td>{book?.author}</td></tr>

              <tr>
                <th>Description</th>
                <td>{book?.description}</td></tr>

              <tr>
                <th>Rent Per Day</th>
                <td>{book?.rentPerDay}</td></tr>

              {book.image1?.url
                &&
                <tr>
                  <th>Image 1</th>
                  <td><img alt='' src={book.image1.url} style={IMG.style1} /></td></tr>
              }

              {book.image2?.url
                &&
                <tr>
                  <th>Image 2</th>
                  <td><img alt='' src={book.image2.url} style={IMG.style1} /></td></tr>
              }

              {book.image3?.url
                &&
                <tr>
                  <th>Image 3</th>
                  <td><img alt='' src={book.image3.url} style={IMG.style1} /></td></tr>
              }

              {book.image4?.url
                &&
                <tr>
                  <th>Image 4</th>
                  <td><img alt='' src={book.image4.url} style={IMG.style1} /></td></tr>
              }

              <tr>
                <th style={{display:'flex'}}>Uploaded By</th>
                <td>
                  <p><strong>Id :&nbsp;</strong>{book?.uploadedBy?._id}</p>
                  <p><strong>Name :&nbsp;</strong>{book?.uploadedBy?.userName}</p>
                </td></tr>

              <tr>
                <th>Uploaded At</th>
                <td>
                  {new Date(`${book?.createdAt}`).toDateString()}<span> , {`${formatAMPM(book?.createdAt)}`}</span>
                </td></tr>

              <tr><th>Updated At</th>
                <td>
                  {new Date(`${book?.updatedAt}`).toDateString()}<span> , {`${formatAMPM(book?.updatedAt)}`}</span>
                </td></tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  </>
  )
}

export default ViewBook