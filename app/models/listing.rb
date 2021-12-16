class Listing < ApplicationRecord
  belongs_to :user_provider, class_name: "User"
  has_many :reservations

  def self.listings_with_user_provider_details
    all.map{|l| {listing: l, user_provider_info:l.user_provider}}
  end
end
