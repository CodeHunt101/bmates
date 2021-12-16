class Api::V1::SessionsController < ApplicationController
  # skip_before_action :verified_user

  def create
    user = current_user || User.find_by(username: params[:username])
    # binding.pry
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
    else
      if current_user
        render json: { message: " loggen in" }
      elsif !current_user && params[:password]
        render json: { message: "The information provided is incorrect, please try again." }
      else
        render json: { message: "No logged user" }
      end
      
      
       
      
    end
    
  end

  def destroy
    session.delete(:user_id)
    render json: { message: "User logged out successfully." }
  end

end