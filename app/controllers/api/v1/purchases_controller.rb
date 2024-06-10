# frozen_string_literal: true

module Api
  module V1
    class PurchasesController < ApplicationController
      before_action :set_purchase, only: %i[show destroy]

      def index
        purchases = Purchase.all.where(:user_id => (User.where(token: params[:user_token]))).order(created_at: :desc)
        render json: purchases
      end

      def recent
        purchases = Purchase.where(:purchase_date => (Setting.weeks).week.ago..DateTime.now).where(:user_id => (User.where(token: params[:user_token]))).order(created_at: :desc)
        render json: purchases
      end

      def recent_total
        purchase_total = Purchase.where(:purchase_date => (Setting.weeks).week.ago..DateTime.now).where(:user_id => (User.where(token: params[:user_token]))).sum(:total)
        render json: purchase_total
      end

      def create
        purchase = Purchase.create!({purchase_date: params[:purchase_date], total: params[:total], store_id: params[:store_id], user_id: User.find_by(token: params[:user_token]).id})
        if purchase
          render json: purchase
        else
          render json: purchase.errors
        end
      end

      def show
        render json: @purchase
      end

      def show_by_store_id
        items = Purchase.where(store_id: params[:store_id])
        render json: items
      end

      def destroy
        @purchase&.destroy
      end

      private

      def set_purchase
        @purchase = Purchase.find(params[:id])
      end
    end
  end
end
