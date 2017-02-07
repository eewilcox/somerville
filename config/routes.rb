Rails.application.routes.draw do
  devise_for :users
  # root "home#index"

  root "zones#index"

  resources :trips, only: [:index, :destroy]
  resources :activities, only: [:show, :destroy, :create, :new]
  resources :zones, only: [:index, :show]

  namespace :api do
    namespace :v1 do
      resources :trips
    end
  end

end
