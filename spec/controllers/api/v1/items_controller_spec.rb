# frozen_string_literal: true

require 'rails_helper'

describe Api::V1::ItemsController do
  describe 'POST create' do
    before(:each) do
      purchase = create :purchase
      post :create, params: { name: 'hotdogs', price: 1.99, purchase_id: purchase.id, user_token: purchase.user.token }
    end

    it 'returns a success response' do
      expect(response).to have_http_status(:success)
    end

    it 'assigns the correct price' do
      item = response.parsed_body
      expect(item['price']).to eq 1.99
    end

    it 'assigns the correct name' do
      item = response.parsed_body
      expect(item['name']).to eq 'hotdogs'
    end
  end

  describe 'GET item' do
    subject(:item) do
      create :item, name: 'hotdogs', price: 1.99
    end

    before(:each) do
      get :show, params: { id: item.id }
    end

    it 'returns a success response' do
      expect(response).to have_http_status(:success)
    end

    it 'returns the correct price' do
      response_item = response.parsed_body
      expect(response_item['price']).to eq item.price
    end

    it 'returns the correct name' do
      response_item = response.parsed_body
      expect(response_item['name']).to eq 'hotdogs'
    end
  end

  describe 'GET item by purchase id' do
    subject(:item) do
      create :item, name: 'hotdogs', price: 1.99
    end

    before(:each) do
      get :show_by_purchase_id, params: { purchase_id: item.purchase_id }
    end

    it 'returns a success response' do
      expect(response).to have_http_status(:success)
    end

    it 'returns the correct price' do
      response_item = response.parsed_body
      expect(response_item[0]['price']).to eq item.price
    end

    it 'returns the correct name' do
      response_item = response.parsed_body
      expect(response_item[0]['name']).to eq 'hotdogs'
    end
  end

  describe 'GET index' do
    subject(:user) do
      create :user
    end

    before(:each) do
      store1 = create(:store,  name: 'Hyvee', user:)
      store2 = create(:store,  name: 'Aldi', user:)
      purchase1 = create(:purchase, purchase_date: Date.current, total: 5.99, store_id: store1.id, user:)
      purchase2 = create(:purchase, purchase_date: Date.current, total: 3.29, store_id: store2.id, user:)
      create(:item, name: 'hotdogs', price: 1.99, purchase_id: purchase1.id, user:)
      create(:item, name: 'buns', price: 2.57, purchase_id: purchase2.id, user:)
    end

    it 'returns a success response' do
      get :index
      expect(response).to have_http_status(:success)
    end

    it 'returns the correct number of items' do
      get :index
      response_purchases = response.parsed_body
      expect(response_purchases.size).to eq 2
    end
  end

  describe 'DELETE destroy' do
    subject(:item) do
      create :item, name: 'hotdogs', price: 1.99
    end

    before(:each) do
      delete :destroy, params: { id: item.id }
    end

    it 'returns a success response' do
      expect(response).to have_http_status(:success)
    end

    it 'deletes store' do
      expect(Item.exists?(item.id)).to be false
    end
  end
end
