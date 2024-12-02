import React from "react"
import { useUserContext } from "../context/useContext"
import { Navigate, Outlet } from "react-router-dom"
const ProtectRoute = () => {
  // const currentUser = localStorage.getItem("currentUser")
  const { currentUser } = useUserContext()

  console.log("app==>", currentUser)
  return currentUser ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectRoute
