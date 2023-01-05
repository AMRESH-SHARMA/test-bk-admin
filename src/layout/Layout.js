import { Outlet } from 'react-router-dom'
import AppSidebar from '../components/AppSidebar'
import AppHeader from '../components/AppHeader'
import './Layout.css'

function Layout() {
  return (
    <div className="main">

      <AppSidebar />
      <div className="l-container">
      <AppHeader />
        <div>
        <Outlet />
        </div> 
      </div>
    </div>
  )
}

export default Layout