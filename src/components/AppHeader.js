import React from 'react'
import './AppComponent.css'
import { useJwt } from "react-jwt";
import { useSidebar } from "../Redux/actions/useSidebar";

const AppHeader = () => {

  const token = localStorage.getItem("token")
  const { decodedToken } = useJwt(token);

  const { toggleSidebar } = useSidebar();

  function toggleSwitchHandler() {
    toggleSidebar();
  }
  return (<>
    <div className='app-header'>
      <span onClick={toggleSwitchHandler}><i className="fa fa-bars fa-lg" /></span>
      <h3>{decodedToken?.name ? decodedToken?.name : 'Bookmark'}</h3>
    </div>
  </>
  )
}

export default AppHeader