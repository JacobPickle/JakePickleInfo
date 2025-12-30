# frozen_string_literal: true

FactoryBot.define do
  factory :purchase do |_n|
    purchase_date { '2023-10-03' }
    total { 1.5 }
    user
    store { association(:store, user:) }
  end
end
