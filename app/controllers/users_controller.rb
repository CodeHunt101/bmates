class UsersController < ApplicationController
  # wrap_parameters :user, include: [:password]
  
  def index
    users = User.all
    render json: {users: users}, except: [:created_at, :updated_at, :password_digest]
  end

  def create
    
    user = User.create(user_params)
    if user.valid?
      message = "#{user.username} has been successfully created with and email #{user.email}."
      render json: {message: message}
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :first_name,
      :last_name,
      :gender,
      :bio,
      :username,
      :email,
      :mate,
      :password,
      :password_confirmation
    )
  end
end