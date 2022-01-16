class User < ApplicationRecord
  has_secure_password

  validates :first_name, length: { minimum: 2 }, if: -> { first_name.present? }
  validates :last_name, length: { minimum: 2 }, if: -> { last_name.present? }
  validates :username, presence: true, length: { minimum: 5, maximum: 20 }, format: { with: /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, multiline: true }
  validates_uniqueness_of :username, case_sensitive: false
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates_uniqueness_of :email, case_sensitive: false
  validates :password, :password_confirmation, length: { in: 6..20 }, if: -> { password.present? }

  has_one_attached :image

  has_many :listings, foreign_key: :user_provider_id
  has_many :user_topics
  has_many :topics, through: :user_topics

  #As a user, it has many received reservations through listings
  has_many :received_reservations, through: :listings, source: :reservations
  has_many :made_reservations, foreign_key: :user_receiver_id, class_name: "Reservation"

  #As a sender or receiver, it has many sent or received messages
  has_many :sent_messages, foreign_key: :sender_id, class_name: "Message"
  has_many :received_messages, foreign_key: :receiver_id, class_name: "Message"

  has_many :given_reviews, foreign_key: :user_id, class_name: "Review"

  belongs_to :country, required: false

  def self.users_with_pp_and_rating
    all.map { |user|
      {
        user_info: user,
        user_average_rating: user.average_rating,
        user_profile_picture: user.image.url,
      }
    }
  end

  def average_rating
    ratings = self.listings.map do |l|
      l.reviews.map do |l|
        l.rating
      end
    end.flatten

    if ratings.size > 0
      # ((ratings.sum.to_f/ratings.size) * 2).round/2.0
      ratings.sum.to_f / ratings.size
    else
      nil
    end
  end

  # def last_received_messages

  #   self.received_messages
  #   .joins(:sender)
  #   .left_outer_joins(:listing)
  #   .select(
  #     'users.username as sender_username,
  #     messages.id,
  #     messages.sender_id,
  #     messages.listing_id,
  #     messages.content,
  #     max(messages.created_at) AS last_received_on,
  #     listings.title AS listing_title')
  #   .group(
  #     'messages.listing_id,
  #     users.username,
  #     messages.id,
  #     listings.title')
  #   .order('messages.sender_id,
  #     messages.listing_id')

  # end

  def last_received_messages
    senders = []
    self.senders_usernames.each do |sender_username|
      self.senders_listing_ids.each do |listing_id|
        senders << last_message_from_listing(sender_username, listing_id)
      end
    end
    senders.compact
  end

  def senders_usernames
    self.received_messages.map { |m| m.sender.username }.uniq
  end

  def senders_listing_ids
    self.received_messages.map { |m| m.listing_id }.uniq
  end

  def last_message_from_listing(sender_username, listing_id)
    self.messages_from_sender(sender_username).filter { |m| m.listing_id === listing_id }.map do |m|
      {
        listing_id: m.listing_id,
        listing_title: m.listing ? m.listing.title : nil,
        message_id: m.id,
        sender_id: m.sender_id,
        sender_username: m.sender.username,
        sender_profile_picture: m.sender.image.url,
        content: m.content,
        last_received_on: m.created_at,
      }
    end.max_by { |m| m[:last_received_on] }
  end

  def messages_from_sender(sender_username)
    self.received_messages.filter { |m| m.sender.username === sender_username }
  end
end
