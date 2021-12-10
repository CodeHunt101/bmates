import React from "react";

export const WelcomeUser = ({currentUser}) => {
  return (
    <>
    {!!currentUser && (<h1>Welcome {currentUser.first_name}</h1>)}
    </>
  )
}