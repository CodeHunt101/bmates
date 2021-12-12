import React, { useEffect } from "react";
// import { Navigate } from "react-router";
import { useNavigate } from "react-router";

export const RedirectToMain = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    navigate("/")
  },[navigate])
  
  return (
    <>  
    </>
  );
}