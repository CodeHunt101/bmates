class Listing < ApplicationRecord
  has_one_attached :image
  
  belongs_to :user_provider, class_name: "User"
  has_many :reservations
  has_many :listing_topics
  has_many :topics, through: :listing_topics
  has_many :available_dates
  has_many :messages
  has_many :reviews, through: :reservations

  validates :title, length: { minimum: 10, maximum: 30 }
  validates :description, length: { minimum: 100, maximum: 2000 }
  # validates :available_dates, length: { minimum: 1}

  def self.listings_with_user_provider_details_topics_available_dates_and_reservations
    self.all.map{|l| {
      listing: l,
      listing_image: l.image.url,
      listing_average_rating: l.average_rating,
      listing_reviews: l.reviews,
      user_info:l.user_provider,
      topics: l.topics.select(:id,:name),
      available_dates: l.available_dates_not_reserved.select(:id, :available_date),
      reservations: l.reservations
    }}
  end

  def available_dates_not_reserved
    self.available_dates.where(is_reserved: false)
  end

  def available_dates_reserved
    self.available_dates.where(is_reserved: true)
  end

  def listing_with_user_provider_details_topics_available_dates_and_reservations
    {
      listing: self,
      listing_image: self.image.url,
      listing_average_rating: self.average_rating,
      listing_reviews: self.reviews.map{|r| r.review_with_user_info},
      user_info:self.user_provider,
      user_average_rating: self.user_provider.average_rating,
      user_profile_picture: self.user_provider.image.url,
      topics: self.topics.select(:id,:name),
      available_dates: self.available_dates_not_reserved.select(:id, :available_date),
      reservations: self.reservations
    }
  end

  def average_rating
    if self.reviews.count > 0
      ratings = self.reviews.map{|r| r.rating}
      ((ratings.sum.to_f/ratings.size)*2).round/2.0
    end
  end
end