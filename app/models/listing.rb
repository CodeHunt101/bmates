class Listing < ApplicationRecord
  belongs_to :mate, class_name: "User"
  has_many :reservations

  def self.listings_with_mate_details
    all.map{|l| {listing: l, mate_info:l.mate}}
  end
end
