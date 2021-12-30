class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.integer :user_id
      t.integer :reservation_id
      t.text :message
      t.integer :rating

      t.timestamps
    end
  end
end
