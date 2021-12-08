class Reservation < ApplicationRecord
  belongs_to :listing
  belongs_to :member, class_name: "User"
end
