import React, { Suspense, useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from './screens/Home';
import Topics from './screens/Topics';
import Layout from './layout/Layout'
import ModalScr from './screens/ModalScr';
import Spinner from './assets/Spinner/Spinner';
import ChangePassword from './screens/Pages/ChangePassword';
import Copyright from './screens/Copyright';
import Address from './screens/Address';
import SocialMedia from './screens/SocialMedia';
import Logos from './screens/Logos';

import Users from './screens/Users/Users';
import AddUser from './screens/Users/AddUser';
import ViewUser from './screens/Users/ViewUser';
import EditUser from './screens/Users/EditUser';

import Books from './screens/Books/Books';
import ViewBook from './screens/Books/ViewBook';
import AddBook from './screens/Books/AddBook';
import EditBook from './screens/Books/EditBook';

import BookGenres from './screens/Books/BookGenres/BookGenres'
import AddBookGenres from './screens/Books/BookGenres/AddBookGenres'
import BookLanguage from './screens/Books/BookLanguage/BookLanguage'
import AddBookLanguage from './screens/Books/BookLanguage/AddBookLanguage'

// import { logout } from "./actions/auth";
import AuthVerify from "./AuthVerify";
import Logout from './screens/Pages/Logout';


// Pages
const Login = React.lazy(() => import('./screens/Pages/Login'))
const Register = React.lazy(() => import('./screens/Pages/Register'))
const Page404 = React.lazy(() => import('./screens/Pages/Page404'))


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

      <AuthVerify logOut={'logOut'} />

      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/forgot-password" element={<ChangePassword />} />
        <Route exact path="*" element={<Page404 />} />

        <Route path="/" name="Layout" element={<Layout />} >

          <Route path='/users' element={<Users />} />
          <Route path='/users/add' element={<AddUser />} />
          <Route path='/users/edit/:id' element={<EditUser />} />
          <Route path='/users/view/:id' element={<ViewUser />} />

          <Route path='/books' element={<Books />} />
          <Route path='/books/add' element={<AddBook />} />
          <Route path='/books/edit/:id' element={<EditBook />} />
          <Route path='/books/view/:id' element={<ViewBook />} />

          <Route path='/books/genre' element={<BookGenres />} />
          <Route path='/books/genre/add' element={<AddBookGenres />} />
          <Route path='/books/language' element={<BookLanguage />} />
          <Route path='/books/language/add' element={<AddBookLanguage />} />

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

  </>
  )
}
export default App
