class Topic < ApplicationRecord
  has_many :listing_topics
  has_many :listings, through: :listing_topics
end
