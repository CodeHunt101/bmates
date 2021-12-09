Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get "/hello", to: "application#hello_world"
  post "/login", to: "sessions#create"
  get "/logout", to: "sessions#destroy"
  get "/users", to: "users#index"
  post "/signup", to: "users#create"
end
