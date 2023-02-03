import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../API"
import { IMG } from '../../assets/constants/theme';
import { useAlert } from "../../Redux/actions/useAlert";

const ViewUserBook = () => {
  let { id } = useParams();
  const { displayAlert } = useAlert()
  const navigate = useNavigate()
  const [user, setUser] = useState('')

  const handleAlert = (param1, param2) => {
    displayAlert({
      message: param1,
      color: param2,
      timeout: 5000
    })
  }

  useEffect(() => {
    async function getUser() {
      await axios.get(`${API}/user/get-single-user/${id}`)
        .then((resApi) => {
          console.log(resApi);
          setUser(resApi.data.msg);
        })
        .catch((e) => {
          console.log(e);
          handleAlert(e.response.data.msg, 'red')
        });
    } getUser()
  }, [id])  // eslint-disable-line react-hooks/exhaustive-deps

  return (<>
    <div className='gcont-container'>
      <div className="gcont-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>View User Book</p>
        <div className='gcard-btn-panel'>
          <button type="button" className='gbtn2 gbtn-pink' onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>

      <div className="gcard gcont-body">
        <div className='gtable' style={{ overflowX: 'auto' }}>
          <p>Total Books Added : {user.booksAdded?.length}</p><br />

          {user.booksAdded?.length ?
            user.booksAdded.map((i) => {
              return (<>
                <table>
                  <thead className='gviewthpre'>
                    <tr>
                      <th>Book Id</th>
                      <td>{i?._id}</td>
                    </tr>

                    <tr>
                      <th>Book Name</th>
                      <td>{i?.bookName}</td>
                    </tr>

                    <tr>
                      <th>Description</th>
                      <td>{i?.description}</td>
                    </tr>

                    <tr>
                      <th>Genre</th>
                      <td>{i?.genre}</td>
                    </tr>

                    <tr>
                      <th>Language</th>
                      <td>{i?.language}</td>
                    </tr>

                    <tr>
                      <th>Rent Per Day</th>
                      <td>{i?.rentPerDay}</td>
                    </tr>

                    {i?.image1?.url
                      &&
                      <tr>
                        <th>Image 1</th>
                        <td><img alt='' src={i.image1.url} style={IMG.style1} /></td>
                      </tr>}

                    {i?.image2?.url
                      &&
                      <tr>
                        <th>Image 2</th>
                        <td><img alt='' src={i.image2.url} style={IMG.style1} /></td>
                      </tr>}

                    {i?.image3?.url
                      &&
                      <tr>
                        <th>Image 3</th>
                        <td><img alt='' src={i.image3.url} style={IMG.style1} /></td>
                      </tr>}

                    {i?.image4?.url
                      &&
                      <tr>
                        <th>Image 4</th>
                        <td><img alt='' src={i.image4.url} style={IMG.style1} /></td>
                      </tr>}
                  </thead>
                </table>
                <br />
              </>)
            })
            : null}
        </div>
      </div>
    </div>
  </>
  )
}

export default ViewUserBook