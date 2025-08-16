import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import React, { useEffect, useState} from 'react'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  
  

  return (
   <BrowserRouter>
   <Routes>
   
    <Route path ="/" element={<Home />} />
    <Route path ="/login" element={<Login />} />
    <Route path ="/signup" element={<Signup />} />

   </Routes>
   <ToastContainer position="top-center" />
   </BrowserRouter>
   
  )
}

export default App
