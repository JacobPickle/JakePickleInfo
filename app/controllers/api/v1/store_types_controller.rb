# frozen_string_literal: true

module Api
    module V1
      class StoreTypesController < ApplicationController
        before_action :set_store, only: %i[show destroy]
  
        def index
          storeTypes = StoreType.all.where(:user_id => (User.where(token: params[:user_token]))).order(created_at: :desc)
          render json: storeTypes
        end
  
        def create
          storeType = StoreType.create!({name: params[:name], user_id: User.find_by(token: params[:user_token]).id})
          if storeType
            render json: storeType
          else
            render json: storeType.errors
          end
        end
  
        def show
          render json: @StoreType
        end
  
        def destroy
          @StoreType&.destroy
        end
  
        private
  
        def set_store
          @StoreType = StoreType.find(params[:id])
        end
      end
    end
  end
  