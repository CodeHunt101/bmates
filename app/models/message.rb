class Message < ApplicationRecord
  belongs_to :sender, class_name: "User", required: false
  belongs_to :receiver, class_name: "User"
  belongs_to :listing, required: false
end
