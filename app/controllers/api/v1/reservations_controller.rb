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
        resp: message, 
        reservation: reservation}, 
        except: [:created_at, :updated_at]
    end
    listing_chosen_date = reservation.listing.available_dates_not_reserved.where(available_date: reservation.reservation_date)
    listing_chosen_date.update(is_reserved: true)
  end

  def update
    reservation = Reservation.find(params[:id])
    reservation.update(reservation_params)
    if reservation.valid?
      message = "reservation has been successfully updated"
      render json: {
        message: message, 
        reservation: reservation}, 
        except: [:created_at, :updated_at]
    end
    listing_chosen_date = reservation.listing.available_dates_reserved.where(available_date: reservation.reservation_date)
    listing_chosen_date.update(is_reserved: false)
  end

  def show
    reservation = Reservation.find(params[:id])
    render json: {
      reservation: reservation.reservation_with_listing_provider_and_receiver_details
    }, except: [:created_at, :updated_at]
  end

  private

  def reservation_params
    params.require(:reservation).permit(
      :listing_id,
      :user_receiver_id,
      :status,
      :reservation_date
    )
  end
end