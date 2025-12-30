# frozen_string_literal: true

FactoryBot.define do |n|
  factory :user do
    sequence(:username) { "username#{n}" }
    weeks_preference { 4 }
    budget_preference { 200 }
    sequence(:password) { 'password${n}' }
  end
end
