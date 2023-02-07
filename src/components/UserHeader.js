import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API } from "../API"

const UserHeader = (props) => {
  const [apiData, setApiData] = useState([])
  useEffect(() => {
    async function getUsers() {
      await axios.get(`${API}/user/get-single-user/${props.userId}`)
        .then((resApi) => {
          console.log(resApi);
          setApiData(resApi.data.msg);
        })
        .catch((e) => {
          console.log(e);
        });
    } getUsers()
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div>{apiData.userName}</div>
  )
}

export default UserHeader