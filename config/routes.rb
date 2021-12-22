Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      #Users & Sessions
      post "/login", to: "sessions#create"
      get "/login", to: "sessions#create"
      get "/logout", to: "sessions#destroy"
      post "/signup", to: "users#create"
      resources :users, only: [:index, :update, :show]
      # get "/current_user_details", to: "users#current_user_details"

      #Listings
      resources :listings, only: [:index, :create, :show, :update]

      #Topics
      resources :topics, only: [:index]

      #Reservations
      resources :reservations, only: [:index, :create]

      #Available_Dates
      resources :available_dates, only: [:create]
    end
  end

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
