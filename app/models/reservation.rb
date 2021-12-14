class Reservation < ApplicationRecord
  belongs_to :listing
  belongs_to :member, class_name: "User"

  def self.reservations_with_listing_mate_and_member_details
    all.map{|r| {
      reservation: r, 
      listing_info: r.listing, 
      mate_info: r.listing.mate,
      member_info: r.member
      }}
  end
end
