import React, { useEffect, useState } from 'react'
import './AppComponent.css'
import { useSidebar } from "../Redux/actions/useSidebar";
import { decodedAuthToken } from '../utils/auth';
import axios from "axios";
import { API } from "../API"

const AppHeader = () => {

  const [admin, setAdmin] = useState('')

  useEffect(() => {
    async function getSingleAdmins() {
      const token = decodedAuthToken()
      if (token) {
        await axios.get(`${API}/admin/get-single-admin/${token.id}`)
          .then((resApi) => {
            console.log(resApi);
            setAdmin(resApi.data.msg);
          })
          .catch((e) => {
            console.log(e);
          });
      }

    } getSingleAdmins()
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  const { toggleSidebar } = useSidebar();

  function toggleSwitchHandler() {
    toggleSidebar();
  }
  return (<>
    <div className='app-header'>
      <span onClick={toggleSwitchHandler}><i className="fa fa-bars fa-lg" /></span>
      <h3>{admin?.name || 'Bookmark'}</h3>
    </div>
  </>
  )
}

export default AppHeader