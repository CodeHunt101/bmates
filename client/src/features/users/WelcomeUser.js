import React from "react";

export const WelcomeUser = ({currentUser}) => {
  return (
    <>
    {currentUser && (<h4>Welcome {currentUser.current_user.username}</h4>)}
    </>
  )
}