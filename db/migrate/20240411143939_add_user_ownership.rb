class AddUserOwnership < ActiveRecord::Migration[7.0]
  def change
    add_reference :stores, :user, foreign_key: true
    add_reference :purchases, :user, foreign_key: true
    add_reference :items, :user, foreign_key: true
  end
end
