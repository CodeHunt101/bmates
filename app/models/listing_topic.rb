class ListingTopic < ApplicationRecord
  belongs_to :listing
  belongs_to :topic

  validates_uniqueness_of :topic_id, scope: :listing_id
end