class Reservation < ApplicationRecord
  belongs_to :listing
  belongs_to :user_receiver, class_name: "User"
  has_one :review

  validates :reservation_date, presence: true

  def self.reservations_with_listing_provider_and_receiver_details
    
    all.map do |r| 
      {
        reservation: r, 
        listing_info: r.listing, 
        user_provider_info: r.listing.user_provider,
        user_provider_profile_picture: r.listing.user_provider.image.url,
        user_receiver_info: r.user_receiver,
        user_receiver_profile_picture: r.user_receiver.image.url
      }
    end
  end

  def self.reservations_with_listing_provider_details
    all.map{|r| {
      reservation: r, 
      listing_info: r.listing, 
      listing_image: r.listing.image.url,
      user_provider_info: r.listing.user_provider,
      review: r.review,
      }}
  end

  def self.reservations_with_listing_receiver_details
    all.map{|r| {
      reservation: r, 
      listing_info: r.listing, 
      listing_image: r.listing.image.url,
      user_receiver_info: r.user_receiver,
      review: r.review
      }}
  end

  def reservation_with_listing_provider_and_receiver_details
    {
      reservation: self, 
      listing_info: self.listing, 
      user_provider_info: self.listing.user_provider,
      user_receiver_info: self.user_receiver
    }
  end

  def listing_available_date_reserved(date)
    self.listing.available_dates_reserved.where(available_date: self.reservation_date)
  end

  def listing_available_date_not_reserved(date)
    self.listing.available_dates_not_reserved.where(available_date: self.reservation_date)
  end

  def update_status
    if self.reservation_date < Date.today && ['pending', 'accepted'].include?(self.status)
      current_status = self.status
      statusOptions = {
        pending: 'expired',
        accepted: 'closed'
      }
      updated_status = statusOptions[current_status.to_sym]
      self.update(status: updated_status)
    end
  end
end
