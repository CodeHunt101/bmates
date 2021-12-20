class Api::V1::UsersController < ApplicationController
  
  def index
    users = User.all
    render json: {
      current_user: current_user, 
      users: users}, except: [:created_at, :updated_at, :password_digest]
  end

  def create
    user = User.create(user_params)
    if user.valid?
      message = "#{user.username} has been successfully created with and email #{user.email}."
      render json: {message: message, user: user}, except: [:created_at, :updated_at, :password_digest]
    end
  end

  def update
    user = User.find(params[:id])
    user.update(user_params)
    if user.valid?
      message = "#{user.username} has been successfully updated."
      render json: {message: message, user: user}, except: [:created_at, :updated_at, :password_digest]
    end
  end

  def show
    user = User.find(params[:id])
    render json: {
      current_user: user,
      listings: user.listings,
      reservations: {
        received_reservations: user.received_reservations,
        made_reservations: user.made_reservations
      }
    }, except: [:created_at, :updated_at, :password_digest, :user_provider_id]
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
      :is_admin,
      :password,
      :password_confirmation
    )
  end
end