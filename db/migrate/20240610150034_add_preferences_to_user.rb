class AddPreferencesToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :weeks_preference, :integer
    add_column :users, :budget_preference, :integer
  end
end
