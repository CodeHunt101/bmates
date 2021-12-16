class User < ApplicationRecord
  has_secure_password

  # validates :first_name, :last_name, length: { minimum: 2 }
  validates :username, length: { minimum: 5 }
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, presence: true, uniqueness: true
  validates :password, :password_confirmation, length: { in: 6..20 }

  has_many :listings, foreign_key: :user_provider_id
  
  #As a user, it has many received reservations through listings
  has_many :received_reservations, through: :listings, source: :reservations
  has_many :made_reservations, foreign_key: :user_receiver_id, class_name: "Reservation"
end
