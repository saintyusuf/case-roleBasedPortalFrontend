import React, { useEffect, useState } from 'react'
import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const PublicRoutes = () => {
  
  const navigate = useNavigate()
  
  const token = localStorage.getItem("token") ?? ""

  function verifyToken(){

    if(token){

      const decodedToken:any = jwtDecode(token)

      if(token && decodedToken.user.role === "admin"){
        navigate("/admin")
      } else if(token && decodedToken.user.role === "customer"){
        navigate("/customer")
      }

    }

  }

  useEffect(()=>{
    verifyToken()
  },[])
  
  return (
    <>
      <Outlet />
    </>
  )
}

export default PublicRoutes