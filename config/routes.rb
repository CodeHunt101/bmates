Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      
      #Users & Sessions
      post "/login", to: "sessions#create"
      get "/login", to: "sessions#create"
      get "/logout", to: "sessions#destroy"
      post "/signup", to: "users#create"
      get "/current_user", to: "users#current_user_details"
      resources :users, only: [:index, :update, :show]
      # get "/current_user_details", to: "users#current_user_details"
      # get "/users/:id/senders", to: "users#senders"

      #Listings
      resources :listings, only: [:index, :create, :show, :update]
      patch "/listings/:id/update_image", to: "listings#update_image"

      #Countries
      resources :countries, only: [:index]
      
      #Topics
      resources :topics, only: [:index]

      #Reservations
      resources :reservations, only: [:index, :create, :update, :show]

      #Available_Dates
      resources :available_dates, only: [:create]

      #Messages
      resources :messages, only: [:create]
      get "/inbox/users/:sender_id/listings/:listing_id", to: "messages#show_messages_between_two_users"

      #Reviews
      resources :reviews, only: [:create]
    end
  end

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
