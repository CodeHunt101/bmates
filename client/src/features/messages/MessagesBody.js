import React from "react"
import { Message } from "./Message"

export const MessagesBody = ({ messages, currentUser }) => {
  const renderMessages = () =>
    messages?.map((message) => (
      <Message key={message.id} message={message} currentUser={currentUser} />
    ))

  return renderMessages()
}
