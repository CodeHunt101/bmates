Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
  # get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  namespace :api do
    namespace :v1 do
      #Users & Sessions
      post "/login", to: "sessions#create"
      get "/login", to: "sessions#create"
      get "/logout", to: "sessions#destroy"
      post "/signup", to: "users#create"
      resources :users, only: [:index, :update]

      #Listings
      resources :listings, only: [:index]
      post "listings/new", to: "listings#create"

      #Topics
      resources :topics, only: [:index]

      #Reservations
      resources :reservations, only: [:index, :create]

      #Available_Dates
      resources :available_dates, only: [:create]
    end
  end

end
