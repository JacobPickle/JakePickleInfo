# frozen_string_literal: true

module Api
  module V1
    class ItemsController < ApplicationController
      before_action :set_item, only: %i[show destroy]
      def index
        items = Item.all.order(created_at: :desc)
        render json: items
      end

      def create
        item = Item.create!({name: params[:name], price: params[:price], purchase_id: params[:purchase_id], user_id: User.find_by(token: params[:user_token]).id})
        if item
          render json: item
        else
          render json: item.errors
        end
      end

      def show
        render json: @item
      end

      def show_by_purchase_id
        items = Item.where(purchase_id: params[:purchase_id])
        render json: items
      end

      def destroy
        @item&.destroy
      end

      private

      def set_item
        @item = Item.find(params[:id])
      end
    end
  end
end
