Rails.application.routes.draw do
  devise_for :users
  # root "home#index"

  root "zones#index"

  resources :trips, except: [:show] do
    resources :activities, only: [:index]
  end

  resources :zones, only: [:index, :show] do
    resources :activities, only: []
  end

  namespace :api do
    namespace :v1 do
      resources :trips, only: [:index, :create, :update, :destroy]
    end
  end

end
