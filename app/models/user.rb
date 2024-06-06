class User < ApplicationRecord
    validates :username, presence: true, uniqueness: true

    has_many :store_types

    has_secure_password
    has_secure_token
end
