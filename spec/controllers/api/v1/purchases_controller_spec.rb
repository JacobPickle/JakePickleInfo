# frozen_string_literal: true

require 'rails_helper'

describe Api::V1::PurchasesController do
  describe 'POST create' do
    before(:each) do
      store = create :store
      post :create,
           params: { purchase_date: Date.current, total: 5.99, store_id: store.id, user_token: store.user.token }
    end

    it 'returns a success response' do
      expect(response).to have_http_status(:success)
    end

    it 'assigns the correct total' do
      purchase = response.parsed_body
      expect(purchase['total']).to eq 5.99
    end

    it 'assigns the correct date' do
      purchase = response.parsed_body
      expect(Date.parse(purchase['purchase_date'])).to eq Date.current
    end
  end

  describe 'GET purchase' do
    subject(:purchase) do
      user = create :user, username: 'testuser', weeks_preference: 4, budget_preference: 200, password: 'pass'
      store = create :store, name: 'Hyvee', user_id: user.id
      create :purchase, purchase_date: Date.current, total: 5.99, store_id: store.id
    end

    before(:each) do
      get :show, params: { id: purchase.id }
    end

    it 'returns a success response' do
      expect(response).to have_http_status(:success)
    end

    it 'returns the correct total' do
      response_purchase = response.parsed_body
      expect(response_purchase['total']).to eq purchase.total
    end

    it 'returns the correct date' do
      response_purchase = response.parsed_body
      expect(Date.parse(response_purchase['purchase_date'])).to eq Date.current
    end
  end

  describe 'GET purchase by store id' do
    subject(:purchase) do
      user = create :user, username: 'testuser', weeks_preference: 4, budget_preference: 200, password: 'pass'
      store = create :store, name: 'Hyvee', user_id: user.id
      create :purchase, purchase_date: Date.current, total: 5.99, store_id: store.id
    end

    before(:each) do
      get :show_by_store_id, params: { store_id: purchase.store_id }
    end

    it 'returns a success response' do
      expect(response).to have_http_status(:success)
    end

    it 'returns the correct total' do
      response_purchase = response.parsed_body
      expect(response_purchase[0]['total']).to eq purchase.total
    end

    it 'returns the correct date' do
      response_purchase = response.parsed_body
      expect(Date.parse(response_purchase[0]['purchase_date'])).to eq Date.current
    end
  end

  describe 'GET index' do
    subject(:user) do
      user = create :user
      create(:purchase, user:)
      create(:purchase, user:)
      user
    end

    before(:each) do
      get :index, params: { user_token: user.token }
    end

    it 'returns a success response' do
      expect(response).to have_http_status(:success)
    end

    it 'returns the correct number of purchases' do
      response_purchases = response.parsed_body
      expect(response_purchases.size).to eq 2
    end
  end

  describe 'DELETE destroy' do
    subject(:purchase) do
      user = create :user, username: 'testuser', weeks_preference: 4, budget_preference: 200, password: 'pass'
      store = create :store, name: 'Hyvee', user_id: user.id
      create :purchase, purchase_date: Date.current, total: 5.99, store_id: store.id
    end

    before(:each) do
      delete :destroy, params: { id: purchase.id }
    end

    it 'returns a success response' do
      expect(response).to have_http_status(:success)
    end

    it 'deletes store' do
      expect(Purchase.exists?(purchase.id)).to be false
    end
  end
end
