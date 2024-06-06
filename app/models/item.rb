# frozen_string_literal: true

class Item < ApplicationRecord
  belongs_to :user

  belongs_to :purchase
  validates :name, presence: true
  validates :price, presence: true
end
