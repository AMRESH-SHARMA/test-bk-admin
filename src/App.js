import React, { Suspense, useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from './layout/Layout'
import ModalScr from './screens/ModalScr';
import Spinner from './assets/Spinner/Spinner';

import Users from './screens/Users/Users';
import AddUser from './screens/Users/AddUser';
import ViewUser from './screens/Users/ViewUser';
import EditUser from './screens/Users/EditUser';
import ViewUserBook from './screens/Users/ViewUserBook';

import Books from './screens/Books/Books';
import ViewBook from './screens/Books/ViewBook';
import AddBook from './screens/Books/AddBook';
import EditBook from './screens/Books/EditBook';

import BookGenres from './screens/Books/BookGenres/BookGenres'
import AddBookGenre from './screens/Books/BookGenres/AddBookGenre'
import EditBookGenre from './screens/Books/BookGenres/EditBookGenre'

import BookLanguages from './screens/Books/BookLanguage/BookLanguages'
import AddBookLanguage from './screens/Books/BookLanguage/AddBookLanguage'
import EditBookLanguage from './screens/Books/BookLanguage/EditBookLanguage'

//CONFIGURATION
import Cities from './screens/Configuration/Cities/Cities'
import States from './screens/Configuration/States/States'
import Address from './screens/Configuration/Address';
import SocialMedia from './screens/Configuration/SocialMedia';
import Logos from './screens/Configuration/Logos';

// import { logout } from "./actions/auth";
import AuthVerify from "./AuthVerify";
import Logout from './screens/Pages/Logout';
import AddCity from './screens/Configuration/Cities/AddCity';
import AddState from './screens/Configuration/States/AddState';
import EditState from './screens/Configuration/States/EditState';
import EditCity from './screens/Configuration/Cities/EditCity';
import InternetHandlingFees from './screens/Configuration/InternetHandlingFees';
import AddDeliveryFees from './screens/Configuration/DeliveryFees/AddDeliveryFees';
import DeliveryFees from './screens/Configuration/DeliveryFees/DeliveryFees';
import EditDeliveryFees from './screens/Configuration/DeliveryFees/EditDeliveryFees';

// Pages
const Login = React.lazy(() => import('./screens/Pages/Login'))
const Register = React.lazy(() => import('./screens/Pages/Register'))
const Page404 = React.lazy(() => import('./screens/Pages/Page404'))
const ChangePassword = React.lazy(() => import('./screens/Profile/ChangePassword'))
const EditProfile = React.lazy(() => import('./screens/Profile/EditProfile'))
const ForgotPassword = React.lazy(() => import('./screens/Pages/ForgotPassword'))


const App = () => {

  // const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  // const [showAdminBoard, setShowAdminBoard] = useState(false);

  // const { user: currentUser } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  // const logOut = useCallback(() => {
  //   dispatch(logout());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (currentUser) {
  //     setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
  //     setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
  //   } else {
  //     setShowModeratorBoard(false);
  //     setShowAdminBoard(false);
  //   }
  // }, [currentUser]);

  return (<>
    <Suspense fallback={
      <div style={{ marginTop: "3rem" }} className='gspinnerflex'>
        <Spinner />
      </div>}>

      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="*" element={<Page404 />} />

        <Route path="/" name="Layout" element={<Layout />} >

          <Route path='/users' element={<Users />} />
          <Route path='/users/add' element={<AddUser />} />
          <Route path='/users/edit/:id' element={<EditUser />} />
          <Route path='/users/view/:id' element={<ViewUser />} />
          <Route path='/users/view/book/:id' element={<ViewUserBook />} />

          <Route path='/books' element={<Books />} />
          <Route path='/books/add' element={<AddBook />} />
          <Route path='/books/edit/:id' element={<EditBook />} />
          <Route path='/books/view/:id' element={<ViewBook />} />

          <Route path='/books/genre' element={<BookGenres />} />
          <Route path='/books/genre/add' element={<AddBookGenre />} />
          <Route path='/books/genre/edit/:id' element={<EditBookGenre />} />

          <Route path='/books/language' element={<BookLanguages />} />
          <Route path='/books/language/add' element={<AddBookLanguage />} />
          <Route path='/books/language/edit/:id' element={<EditBookLanguage />} />

          <Route path='/profile/changePassword' element={<ChangePassword />} />
          <Route path='/profile/editProfile' element={<EditProfile />} />

          <Route path='/configuration/internet-handling-fees' element={<InternetHandlingFees />} />

          <Route path='/configuration/delivery-fees' element={<DeliveryFees />} />
          <Route path='/configuration/delivery-fees/add' element={<AddDeliveryFees/>} />
          <Route path='/configuration/delivery-fees/edit/:id' element={<EditDeliveryFees />} />

          <Route path='/configuration/cities' element={<Cities />} />
          <Route path='/configuration/city/add' element={<AddCity />} />
          <Route path='/configuration/city/edit/:id' element={<EditCity />} />
          <Route path='/configuration/states' element={<States />} />
          <Route path='/configuration/state/add' element={<AddState />} />
          <Route path='/configuration/state/edit/:id' element={<EditState />} />
          <Route path='/configuration/socialMedia' element={<SocialMedia />} />
          <Route path='/configuration/address' element={<Address />} />
          <Route path='/configuration/logos' element={<Logos />} />

          <Route path="/modal" element={<ModalScr />} />
        </Route>

      </Routes>

      <AuthVerify />
    </Suspense>

  </>
  )
}
export default App
