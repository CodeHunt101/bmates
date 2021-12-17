class Api::V1::ReservationsController < ApplicationController
  
  def index
    reservations = Reservation.reservations_with_listing_provider_and_receiver_details
    render json: {
      reservations: reservations
      }, except: [:created_at, :updated_at, :password_digest, :user_receiver]
  end

  def create
    reservation = Reservation.create(reservation_params)
    if reservation.valid?
      message = "reservation has been successfully created"
      render json: {
        message: message, 
        reservation: reservation}, 
        except: [:created_at, :updated_at]
    end
  end

  private

  def reservation_params
    params.require(:reservation).permit(
      :listing_id,
      :user_receiver_id,
      :status,
      :checkin,
      :checkout
    )
  end
end