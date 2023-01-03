import React from 'react'
import './AppComponent.css'
import { useSidebar } from "../Redux/actions/useSidebar";

const AppHeader = () => {
  const { toggleSidebar } = useSidebar();

  function toggleSwitchHandler() {
    toggleSidebar();
  }
  return (<>
    <div className='app-header'>
    <span onClick={toggleSwitchHandler}><i className="fa fa-bars fa-lg" /></span>  
      <h3>Bookmark</h3>
    </div>
  </>
  )
}

export default AppHeader