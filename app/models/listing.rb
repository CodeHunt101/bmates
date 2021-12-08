class Listing < ApplicationRecord
  belongs_to :mate, class_name: "User"
  has_many :reservations
end
