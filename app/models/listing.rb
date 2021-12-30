class Listing < ApplicationRecord
  belongs_to :user_provider, class_name: "User"
  has_many :reservations
  has_many :listing_topics
  has_many :topics, through: :listing_topics
  has_many :available_dates
  has_many :messages
  has_many :reviews, through: :reservations

  def self.listings_with_user_provider_details_topics_and_available_dates
    self.all.map{|l| {
      listing: l, 
      user_provider_info:l.user_provider,
      topics: l.topics.select(:id,:name),
      available_dates: l.available_dates_not_reserved.select(:id, :available_date)
    }}
  end

  def available_dates_not_reserved
    self.available_dates.where(is_reserved: false)
  end

  def available_dates_reserved
    self.available_dates.where(is_reserved: true)
  end

  def listing_with_user_provider_details_topics_and_available_dates
    {
      listing: self, 
      user_provider_info:self.user_provider,
      topics: self.topics.select(:id,:name),
      available_dates: self.available_dates_not_reserved.select(:id, :available_date)
    }
  end
end