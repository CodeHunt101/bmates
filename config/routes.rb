Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  namespace :api do
    namespace :v1 do
      #Users & Sessions
      post "/login", to: "sessions#create"
      get "/login", to: "sessions#create"
      get "/logout", to: "sessions#destroy"
      post "/signup", to: "users#create"
      resources :users, only: [:index]

      #Listings
      resources :listings, only: [:index]

      #Reservations
      resources :reservations, only: [:index]
    end
  end

end
