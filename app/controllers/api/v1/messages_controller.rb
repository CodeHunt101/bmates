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

  private
  
  def message_params
    params.require(:message).permit(
      :receiver_id,
      :listing_id,
      :content
    )
  end
end