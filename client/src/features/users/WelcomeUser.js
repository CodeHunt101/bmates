import React from "react";

export const WelcomeUser = ({currentUser}) => {
  return (
    <>
    {!!currentUser && (<h4>Welcome {currentUser.username}</h4>)}
    </>
  )
}