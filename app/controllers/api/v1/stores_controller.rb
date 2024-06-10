# frozen_string_literal: true

module Api
  module V1
    class StoresController < ApplicationController
      before_action :set_store, only: %i[show destroy]

      def index
        stores = Store.all.where(:user_id => (User.where(token: params[:user_token]))).order(created_at: :desc)
        render json: stores
      end

      def create
        store = Store.create!({name: params[:name], store_type_id: params[:store_type_id], user_id: User.find_by(token: params[:user_token]).id})
        if store
          render json: store
        else
          render json: store.errors
        end
      end

      def show
        render json: @store
      end

      def destroy
        @store&.destroy
      end

      private

      def set_store
        @store = Store.find(params[:id])
      end
    end
  end
end
