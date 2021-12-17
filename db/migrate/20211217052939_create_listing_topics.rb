class CreateListingTopics < ActiveRecord::Migration[6.1]
  def change
    create_table :listing_topics do |t|
      t.belongs_to :listing
      t.belongs_to :topic
    end
  end
end
