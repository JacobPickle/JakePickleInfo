class AddUserToStoreType < ActiveRecord::Migration[7.0]
  def change
    add_reference :store_types, :user, foreign_key: true
  end
end
