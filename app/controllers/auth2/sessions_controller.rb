# frozen_string_literal: true

class Auth::SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token
  respond_to :json

  def index
    if current_user && unconfirmed_allowed?
      render json: { message: "Logged in.", data: UserSerializer.new(resource).serializable_hash[:data][:attributes] }, status: :ok
    else
      render json: { message: "Couldn't find an active session.", data: nil }, status: :unauthorized
    end
  end

  private

  def unconfirmed_allowed?
    # Boot the user if its been over 2 days since they've signed up but haven't confirmed
    date_of_expired_confirmation = current_user.confirmation_sent_at + 2.days
    if current_user.confirmed_at? || (Time.now.to_date < date_of_expired_confirmation.to_date)
      return true
    end
    return false
  end

  def respond_to_on_destroy
    if current_user
      render json: {
        message: "Logged out successfully"
      }, status: :ok
    else
      render json: {
        message: "Couldn't find an active session."
      }, status: :unauthorized
    end
  end

  def create
    super
  end
  
  # def respond_with(resource, _opts = {})
  #   render json: {
  #     status: { code: 200, message: 'Logged in successfully.'},
  #     data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
  #   }, status: :ok
  # end

  # def respond_to_on_destroy
  #   if current_user
  #     render json: {
  #       status: 200,
  #       message: 'Logged out successfully'
  #     }, status: :ok
  #   else
  #     render json: {
  #       status: 401,
  #       message: "Couldn't find an active session."
  #     }, status: :unauthorized
  #   end
  # end
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  # def create
  #   super
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
