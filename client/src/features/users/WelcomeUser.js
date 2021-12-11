import React from "react";

export const WelcomeUser = ({currentUser}) => {
  return (
    <>
    {!!currentUser && (<h4>Welcome {currentUser.first_name}</h4>)}
    </>
  )
}