class User < ApplicationRecord
  has_secure_password

  # validates :first_name, :last_name, length: { minimum: 2 }
  validates :username, length: { minimum: 5 }
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, presence: true, uniqueness: true
  validates :password, :password_confirmation, length: { in: 6..20 }, if: -> { password.present? }

  has_one_attached :image
  
  has_many :listings, foreign_key: :user_provider_id
  
  #As a user, it has many received reservations through listings
  has_many :received_reservations, through: :listings, source: :reservations
  has_many :made_reservations, foreign_key: :user_receiver_id, class_name: "Reservation"

  has_many :sent_messages, foreign_key: :sender_id, class_name: "Message"
  has_many :received_messages, foreign_key: :receiver_id, class_name: "Message"

  has_many :given_reviews, foreign_key: :user_id, class_name: "Review"


  def self.users_with_pp
    all.map{|user| {
      user_info: user,
      profile_picture: user.image.url
    }}
  end

 
end
