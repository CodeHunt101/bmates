class ReservationsController < ApplicationController
  
  def index
    reservations = Reservation.reservations_with_listing_mate_and_member_details
    render json: {
      reservations: reservations
      }, except: [:created_at, :updated_at, :password_digest, :mate]
  end

  def create
    reservation = Reservation.create(user_params)
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
      :member_id,
      :status,
      :checkin,
      :checkout
    )
  end
end