class User < ApplicationRecord
    validates :username, presence: true, uniqueness: true
    validates :weeks_preference, presence: true
    validates :budget_preference, presence: true

    has_many :store_types

    has_secure_password
    has_secure_token
end
