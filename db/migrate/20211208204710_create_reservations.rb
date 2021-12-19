class CreateReservations < ActiveRecord::Migration[6.1]
  def change
    create_table :reservations do |t|
      t.integer :listing_id
      t.integer :user_receiver_id
      t.string :status
      t.datetime :reservation_date

      t.timestamps
    end
  end
end
