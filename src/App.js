import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home/Home';
import About from './Pages/About/About';
import Header from './Shared/Header/Header';
import Footer from './Shared/Footer/Footer';
import ServiceDetail from './Pages/ServiceDetail/ServiceDetail';
import NotFound from './Shared/NotFound/NotFound';
import Login from './Pages/Login/Login/Login';
import SignUp from './Pages/Login/SignUp/SignUp';
import CheckOut from './Pages/CheckOut/CheckOut/CheckOut';
import RequireAuth from './Pages/Login/RequireAuth/RequireAuth';
import AddService from './Pages/AddService/AddService';
import ManageService from './Pages/ManageService/ManageService';
import { ToastContainer } from 'react-toastify';
import Orders from './Pages/Orders/Orders';

const App = () => {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/service/:serviceId' element={<ServiceDetail/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signUp' element={<SignUp/>}/>
        <Route path='/checkout/:serviceId' element={<RequireAuth>
          <CheckOut/>
        </RequireAuth>}/>
        <Route path='/addservice' element={<RequireAuth>
          <AddService/>
        </RequireAuth>}/>
        <Route path='/manageservice' element={<RequireAuth>
          <ManageService/>
        </RequireAuth>}/>
        <Route path='/orders' element={<RequireAuth>
          <Orders/>
        </RequireAuth>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Footer></Footer>
       <ToastContainer />
    </>
  )
}

export default App