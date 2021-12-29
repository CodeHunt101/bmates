class Reservation < ApplicationRecord
  belongs_to :listing
  belongs_to :user_receiver, class_name: "User"

  def self.reservations_with_listing_provider_and_receiver_details
    all.map{|r| {
      reservation: r, 
      listing_info: r.listing, 
      user_provider_info: r.listing.user_provider,
      user_receiver_info: r.user_receiver
      }}
  end

  # def self.with_listing_title
  #   joins(:listing).select("reservations.*, listings.title AS listing_title")
  # end

  def self.reservations_with_listing_provider_details
    all.map{|r| {
      reservation: r, 
      listing_info: r.listing, 
      user_provider_info: r.listing.user_provider,
      }}
  end

  def self.reservations_with_listing_receiver_details
    all.map{|r| {
      reservation: r, 
      listing_info: r.listing, 
      user_receiver_info: r.user_receiver
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
end
