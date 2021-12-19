class Listing < ApplicationRecord
  belongs_to :user_provider, class_name: "User"
  has_many :reservations
  has_many :listing_topics
  has_many :topics, through: :listing_topics
  has_many :available_dates

  def self.listings_with_user_provider_details_topics_and_available_dates
    all.map{|l| {
      listing: l, 
      user_provider_info:l.user_provider,
      topics: l.topics.select(:id,:name),
      available_dates: l.available_dates.select(:id, :available_date)
    }}
  end

  def available_dates_not_reserved
    self.available_dates.where(is_reserved: false)
  end
end
