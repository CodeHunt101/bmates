class Api::V1::SessionsController < ApplicationController
  # skip_before_action :verified_user

  def create
    if current_user
      render json: { message: "loggen in" }
    else
      user = User.find_by(username: params[:username])
      if user && user.authenticate(params[:password])
        session[:user_id] = user.id
        render json: { message: "logged in" }
      else
        render json: { error_message: "The information provided is incorrect, please try again." }
      end
    end
  end

  def destroy
    session.delete(:user_id)
    render json: { message: "User logged out successfully." }
  end

end