Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  #Users & Sessions
  post "/login", to: "sessions#create"
  get "/logout", to: "sessions#destroy"
  get "/users", to: "users#index"
  post "/signup", to: "users#create"

  #Listings
  get "/listings", to: "listings#index"

end
