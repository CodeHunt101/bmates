class Api::V1::UsersController < ApplicationController
  
  def index
    users = User.users_with_pp_and_rating
    render json: {
      current_user: current_user, 
      users: users}, except: [:password_digest]
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
    user.made_reservations.each {|r| r.update_status}
    user.received_reservations.each {|r| r.update_status}
    render json: {
      user_info: user,
      user_average_rating: user.average_rating,
      user_profile_picture: user.image.url,
      user_country_name: user.country.name,
      user_topics: user.topics.select(:id,:name),
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
        user_topics: current_user.topics.select(:id,:name),
        listings: current_user.listings.listings_with_user_provider_details_topics_available_dates_and_reservations,
        reservations: {
          received_reservations: current_user.received_reservations.reservations_with_listing_receiver_details,
          made_reservations: current_user.made_reservations.reservations_with_listing_provider_details
        },
        message_senders: current_user.last_received_messages
      }, except: [:updated_at, :password_digest, :user_provider_id]
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
      :dob,
      :country_id,
      :username,
      :email,
      :image,
      :is_admin,
      :password,
      :password_confirmation,
      topic_ids: []
    )
  end
end