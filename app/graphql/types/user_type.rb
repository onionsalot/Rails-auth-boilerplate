# frozen_string_literal: true

module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :encrypted_password, String, null: false
    field :full_name, String, null: false
    field :email, String, null: false
    field :address, String, null: false
    field :admin, Boolean, null: false
    field :reset_password_token, String
    field :reset_password_sent_at, GraphQL::Types::ISO8601DateTime
    field :remember_created_at, GraphQL::Types::ISO8601DateTime
    field :sign_in_count, Integer, null: false
    field :current_sign_in_at, GraphQL::Types::ISO8601DateTime
    field :last_sign_in_at, GraphQL::Types::ISO8601DateTime
    field :current_sign_in_ip, String
    field :last_sign_in_ip, String
    field :confirmation_token, String
    field :confirmed_at, GraphQL::Types::ISO8601DateTime
    field :confirmation_sent_at, GraphQL::Types::ISO8601DateTime
    field :unconfirmed_email, String
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
