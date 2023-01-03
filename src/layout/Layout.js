import { Outlet } from 'react-router-dom'
import AppSidebar from '../components/AppSidebar'
import AppHeader from '../components/AppHeader'
import './Layout.css'

function Layout() {
  return (
    <div className="main">

      <AppSidebar />
      <div className="container">
        <AppHeader />
        <>
        <Outlet />
        </> 
      </div>
    </div>
  )
}

export default Layout