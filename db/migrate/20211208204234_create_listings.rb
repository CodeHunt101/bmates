class CreateListings < ActiveRecord::Migration[6.1]
  def change
    create_table :listings do |t|
      t.string :listing_type
      t.string :title
      t.text :description
      t.integer :user_provider_id
      t.boolean :is_active, default: true

      t.timestamps
    end
  end
end
