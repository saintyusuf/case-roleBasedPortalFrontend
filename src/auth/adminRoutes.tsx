import { jwtDecode } from 'jwt-decode'
import React, { useEffect } from 'react'
import { Outlet, Navigate, useNavigate } from 'react-router-dom'

const AdminRoutes = () => {
  
  const navigate = useNavigate()
  
  const token = localStorage.getItem("token") ?? ""

  function verifyToken(){

    if(token){
    
      const decodedToken:any = jwtDecode(token)

      const expiresTime = decodedToken.exp
      const currentTime = Number(String(Date.now()).slice(0,10))
      
      if(token && decodedToken.user.role === "admin" && currentTime < expiresTime){
        return true
      } else {
        navigate("/logout")
        return false
      }

    } else {
      navigate("/logout")
      return false
    }

  }

  useEffect(()=>{
    verifyToken()
  },[])
  
  return (
    <>
      {verifyToken() ? <Outlet /> : <Navigate to="/logout"/>}
    </>
  )
}

export default AdminRoutes