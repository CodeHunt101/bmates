class Api::V1::UsersController < ApplicationController
  
  def index
    users = User.users_with_pp
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
      user_info: user,
      profile_picture: user.image.url,
      listings: user.listings.listings_with_user_provider_details_topics_available_dates_and_reservations,
      reservations: {
        received_reservations: user.received_reservations.reservations_with_listing_receiver_details,
        made_reservations: user.made_reservations.reservations_with_listing_provider_details
      }
    }, except: [:created_at, :updated_at, :password_digest, :user_provider_id]
  end

  def current_user_details
    if current_user
      render json: {
        current_user: current_user,
        profile_picture_url: current_user.image.url,
        listings: current_user.listings.listings_with_user_provider_details_topics_available_dates_and_reservations,
        reservations: {
          received_reservations: current_user.received_reservations.reservations_with_listing_receiver_details,
          made_reservations: current_user.made_reservations.reservations_with_listing_provider_details
        }
      }, except: [:created_at, :updated_at, :password_digest, :user_provider_id]
    else
      render json: {
        current_user: nil
      }
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
      :image,
      :is_admin,
      :password,
      :password_confirmation
    )
  end
end