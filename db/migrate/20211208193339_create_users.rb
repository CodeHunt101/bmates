class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :first_name
      t.string :last_name
      t.string :gender
      t.datetime :dob
      t.text :bio
      t.boolean :is_admin, default: false
      t.string :password_digest

      t.timestamps
    end
  end
end
