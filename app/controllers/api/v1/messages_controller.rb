class Api::V1::MessagesController < ApplicationController
  
  def create
    message = Message.create(message_params)
    message.update(sender:current_user)
    
    if message.valid?
      render json: {
        resp: "Message has been sucessfully created",
        message: message
      }
    end
  end

  def show_messages_between_two_users
    messages = Message.messages_between_two_users(current_user.id, params[:sender_id].to_i, params[:listing_id].to_i)
    
      render json: {
        messages: messages
      }
    
  end

  private
  
  def message_params
    params.require(:message).permit(
      :sender_id,
      :receiver_id,
      :listing_id,
      :content
    )
  end
end