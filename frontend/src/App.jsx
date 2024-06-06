import React, { useContext, useEffect } from 'react'
import './App.css'
import {BrowserRouter as Router , Routes , Route} from "react-router-dom";
import AboutUs from './pages/AboutUs.jsx';
import Appointment from './pages/Appointment.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar.jsx';
import { Context } from './main.jsx';
import Footer from './components/Footer.jsx';


const app = ()=>{
  const {isAuthenticated , setIsAuthenticated , setUser} = useContext(Context);
  useEffect(()=>{
    const fetedUser = async()=>{
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/patient/me" , {
          withCredentials : true}
        )
        setIsAuthenticated(true);
        setUser(response.data.message);
      } catch (error) {
          setIsAuthenticated(false)
          setUser({})
      }
    }
  },[isAuthenticated])
}

export default function App() {
  return (
    <>
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/appointment" element={<Appointment/>}/>
      </Routes>
      <Footer></Footer>
      <ToastContainer position='top-center'/>
    </Router>
    </>
  )
}
