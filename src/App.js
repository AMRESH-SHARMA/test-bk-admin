import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './screens/Home';
import Topics from './screens/Topics';
// import DefaultLayout from './layout/DefaultLayout'
import Layout from './layout/Layout'
import ModalScr from './screens/ModalScr';
import Spinner from './assets/Spinner/Spinner';
import ChangePassword from './screens/Pages/ChangePassword';
import Copyright from './screens/Copyright';
import Address from './screens/Address';
import SocialMedia from './screens/SocialMedia';
import Logos from './screens/Logos';
import Users from './screens/Users/Users';
import AddUsers from './screens/Users/AddUsers';
import EditUsers from './screens/Users/EditUsers';

// Pages
const Login = React.lazy(() => import('./screens/Pages/Login'))
const Register = React.lazy(() => import('./screens/Pages/Register'))
const Page404 = React.lazy(() => import('./screens/Pages/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))


const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div style={{ marginTop: "3rem" }} className='gspinnerflex'>
          <Spinner />
        </div>}>

        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/forgot-password" element={<ChangePassword />} />
          <Route exact path="*" element={<Page404 />} />

          <Route path="/" name="defaultLayout" element={<Layout />} >

            <Route path='/users' element={<Users />} />
            <Route path='/users/add' element={<AddUsers/>} />
            <Route path='/users/edit' element={<EditUsers />} />
          
            <Route path='/home' element={<Home />} />
            <Route path='/copyright' element={<Copyright />} />
            <Route path='/address' element={<Address />} />
            <Route path='/social-media' element={<SocialMedia />} />
            <Route path='/logos' element={<Logos />} />
            <Route path='/topics' element={<Topics />} />
            <Route path="/modal" element={<ModalScr />} />
          </Route>

        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
export default App
