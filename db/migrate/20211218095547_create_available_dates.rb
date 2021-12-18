class CreateAvailableDates < ActiveRecord::Migration[6.1]
  def change
    create_table :available_dates do |t|
      t.datetime :available_date
      t.integer :listing_id

      t.timestamps
    end
  end
end
