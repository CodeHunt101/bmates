class MessagesController < ApplicationController
  
  def create
    message = Message.create(message_params)
    if message.valid?
      render json: {
        resp: "Message has been sucessfully created",
        message: message
      }
    end
  end

  private
  
  def messsage_params
    params.require(:message).permit(
      :sender_id,
      :receiver_id,
      :listing_id,
      :content_id
    )
  end
end