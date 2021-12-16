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
end
