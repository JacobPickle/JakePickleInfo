module Api
  module V1
    class UsersController < ApplicationController
      def index
        users = User.all.order(created_at: :desc)
        render json: users
      end

      def index_by_token
        users = User.where(token: params[:user_token]).order(created_at: :desc)
        render json: users
      end

      def create
        user = User.create!(user_params)
        if user
          render json: User.where(username: user_params[:username]).select(:token).take
        else
          render json: user.errors
        end
      end

      def show
        user = User.find_by(username: params[:username])&.authenticate(params[:password])
        if user
          render json: User.where(username: params[:username]).select(:token).take
        end
      end

      private

      def user_params
        params.permit(:username, :password, :password_confirmation)
      end
    end
  end
end
