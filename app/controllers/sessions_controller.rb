class SessionsController < ApplicationController
  # skip_before_action :verified_user

  def create
    user = User.find_by(email: params[:email])
    
    if user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: { message: "#{user.first_name} loggen in" }
    else
      render json: { message: "The information provided is incorrect, please try again." }
    end
    
  end

  def destroy
    session.delete(:user_id)
    render json: { message: "User logged out successfully." }
  end

end