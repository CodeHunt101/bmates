class CreateUserTopics < ActiveRecord::Migration[6.1]
  def change
    create_table :user_topics do |t|
      t.belongs_to :user
      t.belongs_to :topic

    end
  end
end
