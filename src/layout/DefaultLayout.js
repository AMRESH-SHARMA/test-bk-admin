import React from 'react'
import './layout.css';
import { AppSidebar, AppHeader } from '../components/index'
import { Outlet } from "react-router-dom"

const DefaultLayout = () => {
  return (<>
    {/* <AppHeader />
    <div style={{ display: 'flex' }}>
      <AppSidebar />
      <div className='l-mid-container'>
        <div>
          <Outlet />
        </div>
      </div>
    </div > */}

    <div class="grid-container">
      <div class="item1">1</div>
      <div class="item2">2</div>
      <div class="item3">3</div>
      <div class="item6">6</div>
    </div>

  </>

  )
}

export default DefaultLayout
