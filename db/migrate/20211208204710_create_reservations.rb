class CreateReservations < ActiveRecord::Migration[6.1]
  def change
    create_table :reservations do |t|
      t.integer :listing_id
      t.integer :user_receiver_id
      t.string :status
      # t.string :date
      # t.string :checkin_time
      # t.string :checkout_time
      t.datetime :checkin
      t.datetime :checkout

      t.timestamps
    end
  end
end
