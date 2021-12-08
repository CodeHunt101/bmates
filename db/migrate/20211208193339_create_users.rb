class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :gender
      t.text :bio
      t.string :username
      t.string :email
      t.boolean :mate
      t.string :password_digest

      t.timestamps
    end
  end
end
