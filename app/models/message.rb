class Message < ApplicationRecord
  belongs_to :sender, class_name: "User", required: false
  belongs_to :receiver, class_name: "User"
  belongs_to :listing, required: false

  validates :content, length: { maximum: 1000 }

  def self.messages_between_two_users(user_1_id, user_2_id, listing_id)
    
    Message.all.select do |m| 
      predicate = ((m.sender_id == user_1_id && m.receiver_id ==user_2_id) || (m.sender_id == user_2_id && m.receiver_id ==user_1_id))
      if listing_id != 0
        m.listing_id == listing_id && predicate
      else
        !m.listing_id && predicate
      end
    end
  end
end
