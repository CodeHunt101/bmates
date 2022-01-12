class Topic < ApplicationRecord
  has_many :listing_topics
  has_many :listings, through: :listing_topics
  has_many :user_topics
  has_many :users, through: :user_topics
end
