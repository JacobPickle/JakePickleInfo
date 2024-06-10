# frozen_string_literal: true

class Purchase < ApplicationRecord
  belongs_to :user
  belongs_to :store
  has_many :item, dependent: :destroy
  validates :purchase_date, presence: true
  validates :total, presence: true
end
