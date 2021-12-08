class User < ApplicationRecord
  has_secure_password

  validates :first_name, :last_name, presence: true, length: { minimum: 2 }
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, presence: true, uniqueness: true
  validates :password, :password_confirmation, length: { in: 6..20 }

  has_many :listings, foreign_key: :mate_id
  
  #As a mate, it has many reservation through listings
  has_many :reservations, through: :listings
  has_many :reservations, foreign_key: :member_id
end
