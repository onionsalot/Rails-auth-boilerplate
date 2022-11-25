Rails.application.routes.draw do
  namespace :auth do
    get 'current_user/index'
  end
  devise_for :users, at: 'auth', path: 'auth',
  controllers: {
    confirmations: 'auth/confirmations',
    # passwords: 'auth/passwords',
    registrations: 'auth/registrations',
    sessions: 'auth/sessions'
  }
  # devise_for :users
  # get 'auth/passwords'
  # mount_devise_token_auth_for 'User', at: 'auth', controllers: {
  #   confirmations: 'auth/confirmations',
  #   passwords: 'auth/passwords',
  #   registrations: 'auth/registrations'
  # }

  # namespace :auth do
  #   resources :sessions, only: %i[index]
  # end
  get '/index', to: 'home#index'
  # get 'current_user/index'
  # devise_for :users, path: '', path_names: {
  #   sign_in: 'login',
  #   sign_out: 'logout',
  #   registration: 'signup'
  # },
  # controllers: {
  #   sessions: 'users/sessions',
  #   registrations: 'users/registrations'
  # }
  # get '/current_user', to: 'current_user#index'
  # if Rails.env.development?
  #   mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  # end
  # post "/graphql", to: "graphql#execute"
  # get 'static/home'
  # # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # # Defines the root path route ("/")
  # # root "articles#index"
  # resources :sessions, only: [:create]
  # resources :registrations, only: [:create]
  # delete :logout, to: "sessions#logout"
  # get :logged_in, to: "sessions#logged_in"
  # root to: "static#home"
end
